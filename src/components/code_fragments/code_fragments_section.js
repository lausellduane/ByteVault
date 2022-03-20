import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Divider,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerSection,
  Modal, ModalVariant,
  Gallery,
  Grid, GridItem,
  PageSection,
  PageSectionVariants,
  Pagination,
  TextContent,
  Text,
  TextList, TextListItem,
  Toolbar,
  ToolbarItem
} from '@patternfly/react-core';
import { ToolbarContent, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';
import BasicCodeEditor from '../utils/code_editor';

export default class CodeFragmentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 10,
      isDrawerExpanded: false,
      isFragmentModalOpen: false,
      fragment: {},
      fragmentTitleFilter: "",
      activeCard: null,
      filters: {
        fragments: []
      },
      activeItem: 0,
      fragments: [],
    };

    this.handleFragmentFilterTextInputChange = value => {
      let fragments = [...this.state.fragments];
      fragments = fragments.filter(fragment => fragment.title.toLowerCase().includes(value.toLowerCase()));
      this.setState({ fragmentTitleFilter: value, filters: { fragments }});
    };

    this.handleFragmentModalToggle = () => {
      this.setState(({ isFragmentModalOpen }) => ({
        isFragmentModalOpen: !isFragmentModalOpen
      }));
    };

    this.onToolbarDropdownToggle = isLowerToolbarDropdownOpen => {
      this.setState(prevState => ({
        isLowerToolbarDropdownOpen
      }));
    };

    this.deleteItem = item => event => {
      const filter = getter => val => getter(val) !== item.id;
      this.setState({
        res: this.state.res.filter(filter(({ id }) => id)),
        selectedItems: this.state.selectedItems.filter(filter(id => id))
      });
    };

    this.onDelete = (type = '', id = '') => {
      if (type) {
        this.setState(prevState => {
          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);
          return {
            filters: prevState.filters
          };
        });
      } else {
        this.setState({
          filters: {
            fragments: []
          }
        });
      }
    };

    this.onCloseDrawerClick = () => {
      this.setState({
        activeCard: null,
        isDrawerExpanded: false
      });
    };

    this.onCardClick = (fragment, event) => {
      if (event.currentTarget.id === this.state.activeCard) {
        this.setState({isFragmentModalOpen: true});
        return;
      }

      const newSelected = event.currentTarget.id;
      this.setState({
        activeCard: newSelected,
        // isDrawerExpanded: true,
        isFragmentModalOpen: true,
        fragment
      });
    };

    this.onPerPageSelect = (_evt, perPage) => {
      this.setState({ page: 1, perPage });
    };

    this.onSetPage = (_evt, page) => {
      this.setState({ page });
    };
  }

  getAllItems() {
    const { res } = this.state;
    const collection = [];
    for (const items of res) {
      collection.push(items.id);
    }

    return collection;
  }

  fetch(page, perPage) {
    fetch(`http://localhost:8080/api/v1/fragments`)
      .then(resp => resp.json())
      .then(resp => this.setState({ fragments: resp, perPage, page }))
      .then(() => this.updateSelected())
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.fetch(this.state.page, this.state.perPage);
  }

  render() {
    const {
      isDrawerExpanded,
      activeCard,
      filters,
      fragment,
      isFragmentModalOpen,
      fragmentTitleFilter,
      fragments
    } = this.state;

    const items = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput value={fragmentTitleFilter} name="fragmentTitleFilter" id="fragmentTitleFilter" type="search" aria-label="search input example" onChange={this.handleFragmentFilterTextInputChange} />
            <Button variant={ButtonVariant.control} aria-label="search button for search input">
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarItem>
        <ToolbarItem>
          <Button variant="secondary">Action</Button>
        </ToolbarItem>
        <ToolbarItem variant="separator" />
        <ToolbarItem>
          <Button variant="primary">Action</Button>
        </ToolbarItem>
      </React.Fragment>
    );

    const filtered =
      filters.fragments.length > 0
        ? filters.fragments
        : fragments;    

    const drawerContent = (
      <Gallery hasGutter>
        {filtered.map((fragment, key) => (
          <React.Fragment key={key}>
            <Card
              isHoverable
              key={key}
              id={'card-view-' + (parseInt(key) + 1)}
              // onKeyDown={this.onKeyDown}
              onClick={(e) => this.onCardClick(fragment, e)}
              isSelectable
              isSelected={activeCard === key}
            >
              <CardHeader>
                {/* <img src={icons[fragment.icon]} alt={`${fragment.name} icon`} style={{ height: '50px' }} /> */}
              </CardHeader>
              <CardTitle>{fragment.title}</CardTitle>
              <CardBody>
                {
                  fragment.language === 1 ? "JavaScript" : 
                  fragment.language === 2 ? "Python" :
                  fragment.language === 3 ? "Golang" : null
                }
              </CardBody>
            </Card>
          </React.Fragment>
        ))}
      </Gallery>
    );

    const modalContent = (
      <Modal
        variant={ModalVariant.large}
        title={fragment.title}
        isOpen={isFragmentModalOpen}
        onClose={this.handleFragmentModalToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={this.handleFragmentModalToggle}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={this.handleFragmentModalToggle}>
            Cancel
          </Button>
        ]}
        aria-label="modal-aria-label"
      >
        <Grid>
          <GridItem span={6} rowSpan={12}>
            <TextContent>
              <TextList component="dl">
                <TextListItem component="dt">Language</TextListItem>
                <TextListItem component="dd">
                  {
                    fragment.language === 1 ? "JavaScript" : 
                    fragment.language === 2 ? "Python" :
                    fragment.language === 3 ? "Golang" : null
                  }
                </TextListItem>
                <TextListItem component="dt">Description</TextListItem>
                <TextListItem component="dd">{fragment.description}</TextListItem>
                <TextListItem component="dt">Notes</TextListItem>
                <TextListItem component="dd">{fragment.notes}</TextListItem>
                <TextListItem component="dt">Tags</TextListItem>
                <TextListItem component="dd">{fragment && fragment.tags && fragment.tags.length > 0 && fragment.tags.map(item => <Text key={item.id}>{item.label}</Text>)}</TextListItem>
              </TextList>
            </TextContent>
          </GridItem>
          <GridItem span={6} rowSpan={12}>
            <BasicCodeEditor value={fragment.value} language={fragment.language}/>
          </GridItem>
        </Grid>
      </Modal>
    );

    return (
      <div id="main-content-card-view-default-nav" breadcrumb={null}>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Code Fragments</Text>
            <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
          </TextContent>
        </PageSection>
        <PageSection isFilled padding={{ default: 'noPadding' }}>
          <Drawer isExpanded={isDrawerExpanded} className={'pf-m-inline-on-2xl'}>
            <DrawerSection>
              <Toolbar id="card-view-data-toolbar-group-types" usePageInsets clearAllFilters={this.onDelete}>
                <ToolbarContent>{items}</ToolbarContent>
              </Toolbar>
              <Divider component="div" />
            </DrawerSection>
            <DrawerContent className={'pf-m-no-background'}>
              <DrawerContentBody hasPadding>{drawerContent}</DrawerContentBody>
            </DrawerContent>
          </Drawer>
        </PageSection>
        <PageSection isFilled padding={{ default: 'noPadding' }}>
          {modalContent}
        </PageSection>
        <PageSection isFilled={false} sticky="bottom" padding={{ default: 'noPadding' }} variant="light">
          <Pagination
            itemCount={filtered.length}
            page={this.state.page}
            perPage={this.state.perPage}
            onPerPageSelect={this.onPerPageSelect}
            onSetPage={this.onSetPage}
            variant="bottom"
          />
        </PageSection>
      </div>
    );
  }
}