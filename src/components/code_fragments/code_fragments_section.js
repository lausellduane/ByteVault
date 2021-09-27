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
      activeCard: null,
      filters: {
        fragments: []
      },
      //res: [],
      res: [
        {
          id: 1,
          title: "Reverse String",
          description: "Given a string , reverse all of its characters and return the resulting string.",
          notes: "",
          value: "let s = \"civic\";\n\nfunction reverseString(s){\n  let s_arr = s.split(\"\");\n  console.log(\"s_arr: \" + s_arr);\n  let new_s_arr = [];\n  for(let i = s_arr.length - 1; i >= 0; i--){\n    new_s_arr.push(s_arr[i]);\n  }\n  console.log(\"new_s_arr: \" + new_s_arr);\n  return new_s_arr.join(\"\");\n}\nlet result = reverseString(s);\nconsole.log(\"result: \" + result);\n\nfunction isPalindrome(s){\nlet reverse = reverseString(s);\n  if (s == reverse){\n  return true;\n  }\n  return false;\n}",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 2,
          title: "Check if Palindrome",
          description: "Given a string, return wheter or not it forms a Palindrome.",
          notes: "A Palindrome is a sequence of characters that reads the same forwards or backwards.",
          value: "function isPalindrome(s){\nlet reverse = reverseString(s);\n  if (s == reverse){\n  return true;\n  }\n  return false;\n}\n\nconsole.log(\"result: \" + isPalindrome(s));",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 3,
          title: "Vaccum Cleaner Route",
          description: "Given a string representing the sequence of moves a robot vaccum makes, return wheter or not it will return to its original position.",
          notes: "The string will only contain L, R, U and D characters, representing left, right, up, down respectively. 'LR' returns 'true', 'URURD' returns 'false'.",
          value: "let steps = \"RUULLDRD\"\n\nfunction vaccumCleanerRoute(s){\nlet s_arr = s.split(\"\");\nlet path = s_arr.map(step => ((step == \"U\" ? 1 : step == \"D\" ? -1 : step == \"R\" ? 2 : step == \"L\" ? -2 : 0)));\n  console.log(\"path: \" + path);\n  let course = 0;\n  for(let i = 0; i < path.length; i++){\n  course += path[i];\n  }\n  console.log(\"course: \" + course);\n  if(course == 0){\n  return true;\n  }\n  return false;\n}\n\nlet isBackToOrigin = vaccumCleanerRoute(steps);\nconsole.log(\"isBackToOrigin: \" + isBackToOrigin); ",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 4,
          title: "Correct Capitalization",
          description: "Given a string return whether or not it uses capitalization correctly.",
          notes: "A string correctly uses capitalization if all letters are capitalized, no letters are capitalized or only the first letter is capitalized.",
          value: "let s1 = \"USA\"; // return true\nlet s2 = \"Calvin\"; // return true\nlet s3 = \"compUter\"; // return false\nlet s4 = \"coding\"; // return true\n\nascii_caps_table = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];\n\nfunction correctCapitalization(s){\n	let str_arr = s.split(\"\");\n  console.log(\"str_arr: \" + str_arr);\n  let ascii_arr = str_arr.map(item => item.charCodeAt());\n  console.log(\"ascii_arr: \" + ascii_arr);\n  let target_arr = ascii_arr.map(item => {\n  	return ascii_caps_table.indexOf(item) != -1 ? true : false;\n  });\n  console.log(\"target_arr: \" + target_arr);\n  let caps_idx = target_arr.indexOf(true);\n  console.log(\"caps_idx: \" + caps_idx);\n  let caps_indices = [];\n  while (caps_idx != -1){\n    caps_indices.push(caps_idx);\n    caps_idx = target_arr.indexOf(true, caps_idx + 1)\n  }\n  \n  console.log(\"caps_indices: \" + caps_indices);\n  \n  if (caps_indices.length == target_arr.length || caps_indices.length == 0 || caps_indices[0] == 0){\n  	return true;\n  }\n  \n  return false;\n}\n\nconsole.log(correctCapitalization(s4));",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 5,
          title: "Add Binary",
          description: "Given two binary strings (strings containing only 1s or 0s) return their sum (also as a binary string).",
          notes: "Neither binary string will contain leading 0s unless the string itself is 0.",
          value: "let s1 = \"100\";\nlet s2 = \"1\";\nlet s3 = \"11\";\nlet s4 = \"1\";\nlet s5 = \"1\";\nlet s6 = \"0\";\n\nfunction addBinary(s1, s2){\n	console.log(\"s1: \" + s1);\n	console.log(\"s2: \" + s2);\n	let d1 = parseInt(s1, 2);\n  console.log(\"d1: \" + d1);\n  let d2 = parseInt(s2, 2);\n  console.log(\"d2: \" + d2);\n  let sum = d1 + d2;\n  console.log(\"sum: \" + sum);\n  \n  return sum.toString(2) \n}\n\nconsole.log(\"addBinary: \" + addBinary(s5, s6));",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 6,
          title: "Longest Common Prefix",
          description: "Given two binary strings (strings containing only 1s or 0s) return their sum (also as a binary string).",
          notes: "Neither binary string will contain leading 0s unless the string itself is 0.",
          value: "",
          tags: [{id: 1, label: "string"}],
          language: 1 // 1: JavaSript
        },
        {
          id: 7,
          title: "Find the Max Number in a List",
          description: "Given a list of integers return the max number.",
          notes: "",
          value: "# find the max number in a list\r\n\r\nitem_list = [1, 34, 50, 2]\r\ndef find_max(item_list):\r\n    if len(item_list) == 2:\r\n        return item_list[0] if item_list[0] > item_list[1] else item_list[1]\r\n    sub_max = find_max(item_list[1:])\r\n    return item_list[0] if item_list[0] > sub_max else sub_max\r\n\r\nprint(find_max(item_list))",
          tags: [{id: 2, label: "array"}],
          language: 2 // 2: Python
        }
      ],
      activeItem: 0
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
    fetch(`https://my-json-server.typicode.com/jenny-s51/cardviewdata/posts?_page=${page}&_limit=${perPage}`)
      .then(resp => resp.json())
      .then(resp => this.setState({ res: resp, perPage, page }))
      .then(() => this.updateSelected())
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    // this.fetch(this.state.page, this.state.perPage);
  }

  render() {
    const {
      isDrawerExpanded,
      activeCard,
      // activeItem,
      filters,
      res,
      fragment,
      isFragmentModalOpen
    } = this.state;
    //console.log("res: " + JSON.stringify(res));
    //console.log("filters: " + JSON.stringify(filters));

    const items = (
      <React.Fragment>
        <ToolbarItem>
          <InputGroup>
            <TextInput name="textInput1" id="textInput1" type="search" aria-label="search input example" />
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
        ? res.filter(card => {
            return filters.fragments.length === 0 || filters.fragments.includes(card.name);
          })
        : res;

    // console.log("filtered: " + JSON.stringify(filtered));

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