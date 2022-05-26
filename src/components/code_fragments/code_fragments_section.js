import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardBody,
  CardTitle,
  Divider,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerSection,
  Dropdown, DropdownItem,
  KebabToggle,
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
      activeCardActionDropdown: null,
      filters: {
        fragments: []
      },
      activeItem: 0,
      fragments: [],
      hasNoOffset: false,
      setHasNoOffset: false,
      isCardActionDropdownOpen: false,
      isCardKebabDropdownOpen: false,
      isActionModalOpen: false,
    };

    this.onCardKebabDropdownToggle = (key, isCardKebabDropdownOpen, event) => {
      event.stopPropagation();
      this.setState({
        [key]: !this.state[key],
      });
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
      console.log("onCardClick")
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

    this.deleteFragment = (e, body, key) => {
      e.stopPropagation();
      const fragmentID = body._id;
      const requestBody = {"id": fragmentID};
      const response = fetch(`http://localhost:8080/api/v1/fragments`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
      });
      this.setState({fragment: {}, isActionModalOpen: false});
    }

    this.handleActionModalToggle = (e = {}, fragment = {}) => {
      e.stopPropagation();
      console.log('handleActionModalToggle e: ', e);
      console.log('handleActionModalToggle fragment: ', fragment);
      this.setState(({ isActionModalOpen }) => ({
        isActionModalOpen: !isActionModalOpen,
        fragment: fragment,
      }));
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

  fetchFragments(page, perPage) {
    fetch(`http://localhost:8080/api/v1/fragments`)
      .then(resp => resp.json())
      .then(resp => this.setState({ fragments: resp, perPage, page }))
      .then(() => this.updateSelected())
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.fetchFragments(this.state.page, this.state.perPage);
  }

  render() {
    const {
      isDrawerExpanded,
      activeCard,
      activeCardActionDropdown,
      filters,
      fragment,
      isFragmentModalOpen,
      fragmentTitleFilter,
      fragments,
      isActionModalOpen,
    } = this.state;

    const ActionModal = (fragment, key) => (
      <Modal
        variant={ModalVariant.small}
        title="Are you sure you want to delete?"
        titleIconVariant="warning"
        isOpen={isActionModalOpen}
        onClose={e => this.handleActionModalToggle(e)}
        actions={[
          <Button key="confirm" variant="primary" onClick={(e) => this.deleteFragment(e, this.state.fragment, key)}>
            Confirm
          </Button>,
          <Button key="cancel" variant="tertiary" onClick={e => this.handleActionModalToggle(e)}>
            Cancel
          </Button>
        ]}
      >
        { this.state.fragment.title}
        <br/>
        { this.state.fragment.description}
      </Modal>
    )

    const dropdownItems = (fragment, key) => {
      return [
      <DropdownItem key="action-edit" component="button">
        Edit
      </DropdownItem>,
      <DropdownItem key="action-delete" component="button" onClick={(e) => this.handleActionModalToggle(e, fragment)}>
        Delete
      </DropdownItem>,
      ]};

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
          <Button variant="primary">Add Code Fragment</Button>
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
              key={'card-' + key}
              id={'card-view-' + (parseInt(key) + 1)}
              onClick={(e) => this.onCardClick(fragment, e)}
            >
              <CardHeader>
                <CardActions>
                  <Dropdown 
                    toggle={<KebabToggle onToggle={(isCardKebabDropdownOpen, e) => this.onCardKebabDropdownToggle(key, isCardKebabDropdownOpen, e)} />}
                    isOpen={this.state[key]}
                    isPlain 
                    dropdownItems={dropdownItems(fragment, key)} 
                    position={'right'} 
                  />
                </CardActions>
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
            <ActionModal fragment={fragment} key={key}/>
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
          <Button key="dismiss" variant="primary" onClick={this.handleFragmentModalToggle}>
            Dismiss
          </Button>,
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