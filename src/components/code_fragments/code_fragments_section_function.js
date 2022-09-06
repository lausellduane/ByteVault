import { useState } from "react";
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
    ToolbarItem,
    ToolbarContent, 
    ButtonVariant, 
    InputGroup, 
    TextInput
  } from '@patternfly/react-core';
import {
useQuery,
useMutation,
useQueryClient,
QueryClient,
QueryClientProvider,
} from '@tanstack/react-query'
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';
import PenIcon from '@patternfly/react-icons/dist/esm/icons/pen-icon';

import { byteVaultApi } from "../../api/http-client";
import { FetchFragments, FetchProgrammingLanguages, FetchTags } from "../../api/GET.api";

export function CodeFragmentsSection() {
    const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
    const [isFragmentModalOpen, setIsFragmentModalOpen] = useState(false);
    const [fragment, setFragment] = useState({});
    const [fragments, setFragments] = useState([]);
    const [tags, setTags] = useState([]);
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [fragmentTitleFilter, setFragmentTitleFilter] = useState('');
    const [activeCard, setActiveCard] = useState(null);
    const [filters, setFilters] = useState({});
    const [isCardKebabDropdownOpen, setIsCardKebabDropdownOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [isCreateFragmentModalOpen, setIsCreateFragmentModalOpen] = useState(false);
    const [dropdownKey, setDropdownKey] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchFragmentsError, setFetchFragmentsError] = useState(null);
    const [fetchProgrammingLanguagesError, setFetchProgrammingLanguagesError] = useState('');
    const [fragmentsIdsObj, setFragmentsIdsObj] = useState({});

    const queryClient = useQueryClient()

    // Queries

    const handleFragmentIDs = (value) => {
        const idsArray = value?.map(item => item._id);
        const idsObj = idsArray.reduce((acc, current) => (acc[current] = false, acc), {});
        setFragmentsIdsObj(idsObj);
    }

    const { 
        isLoading: fragmentsDataIsLoading, 
        isError: fragmentsDataIsError, 
        data: { data: fragmentsData } = [], 
        error: fragmentsDataError 
    } = FetchFragments(setFragments, handleFragmentIDs, setFetchFragmentsError);

    // console.log('fragmentsDataIsLoading: ', fragmentsDataIsLoading);
    // console.log('fragmentsDataIsError: ', fragmentsDataIsError);
    console.log('fragmentsData: ', fragmentsData);
    // console.log('fragmentsDataError: ', fragmentsDataError);

    const {
        isLoading: programmingLanguagesDataIsLoading, 
        isError: programmingLanguagesDataIsError, 
        data: { data: programmingLanguagesData } = [], 
        error: programmingLanguagesDataError 
    } = FetchProgrammingLanguages();

    // console.log('programmingLanguagesDataIsLoading: ', programmingLanguagesDataIsLoading);
    // console.log('programmingLanguagesDataIsError: ', programmingLanguagesDataIsError);
    // console.log('programmingLanguagesData: ', programmingLanguagesData);
    // console.log('programmingLanguagesDataError: ', programmingLanguagesDataError);

    const {
        isLoading: tagsDataIsLoading, 
        isError: tagsDataIsError, 
        data: { data: tagsData } = [], 
        error: tagsDataError 
    } = FetchTags();

    // console.log('tagsDataIsLoading: ', tagsDataIsLoading);
    // console.log('tagsDataIsError: ', tagsDataIsError);
    // console.log('tagsData: ', tagsData);
    // console.log('tagsDataError: ', tagsDataError);
    
    const handleCardKebabDropdown = (flag, event, elementID) => {
        event.preventDefault();
        event.stopPropagation();
        setFragmentsIdsObj({...fragmentsIdsObj, [elementID]: !fragmentsIdsObj[elementID]});
    };

    const handleFragmentFilterTextInputChange = value => {
        const results = fragmentsData.filter(fragment => fragment?.title?.toLowerCase().includes(value.toLowerCase()));
        setFragmentTitleFilter(value);
        setFragments(results);
    };

    const handleFragmentCardOnClick = (e, fragment) => {
        console.log("handleFragmentCardOnClick e: ", e);
        console.log("handleFragmentCardOnClick fragment: ", fragment);
        e.preventDefault();
        if (e.currentTarget.id === activeCard) {
            setIsFragmentModalOpen(true);
            return;
        };
        const newSelected = e.currentTarget.id;
        setActiveCard(newSelected);
        setIsFragmentModalOpen(true);
        setFragment(fragment);
    };

    const toolbarItems = (
            <>
                <ToolbarItem>
                    <InputGroup>
                        <TextInput value={fragmentTitleFilter} name="fragmentTitleFilter" id="fragmentTitleFilter" type="search" aria-label="search input example" onChange={(fragmentTitleFilter) => handleFragmentFilterTextInputChange(fragmentTitleFilter)} />
                        <Button variant={ButtonVariant.control} aria-label="search button for search input">
                        <SearchIcon />
                        </Button>
                    </InputGroup>
                </ToolbarItem>
                <ToolbarItem>
                    <Button variant="primary" onClick={() => setIsCreateFragmentModalOpen(true)}>Add Code Fragment</Button>
                </ToolbarItem>
                <ToolbarItem variant="separator" />
                <ToolbarItem>
                    <Button variant="primary">Action</Button>
                </ToolbarItem>
            </>
        );

    const onDeleteFragment = (e, body, key) => {
        e.stopPropagation();
        const fragmentID = body._id;
        const requestBody = {"id": fragmentID};
        fetch(`http://localhost:8080/api/v1/fragments`, {
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
        setFragment({});
        setIsActionModalOpen(false);
        setDropdownKey(false); // check key
    }

    const ActionModal = (props) => {
        // console.log('props: ', props);
        const {otherKey: key} = props;
        return (
        <Modal
          variant={ModalVariant.small}
          title="Are you sure you want to delete?"
          titleIconVariant="warning"
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          actions={[
            <Button key="confirm" variant="primary" onClick={(e) => onDeleteFragment(e, fragment, key)}>
              Confirm
            </Button>,
            <Button key="cancel" variant="tertiary" onClick={() => setIsActionModalOpen(false)}>
              Cancel
            </Button>
          ]}
        >
          { fragment.title }
          <br/>
          { fragment.description }
        </Modal>
      )}

    const dropdownItems = (fragment) => {
        return [
        <DropdownItem key={`action-edit-${fragment._id}`} component="button">
            <PenIcon />{' '}
            Edit
        </DropdownItem>,
        <DropdownItem key={`action-delete-${fragment._id}`} component="button" onClick={(e) => onDeleteFragment(e, fragment)}>
            <TrashIcon />{' '}
            Delete
        </DropdownItem>,
    ]};

    const drawerContent = (
            <>
                <Gallery hasGutter>
                {fragments?.map((element, key) => (
                    <div key={element._id} id={element._id}>
                        <Card
                            isHoverable
                            key={`card-${element._id}`}
                            id={`card-view-${element._id}`}
                            onClick={(event) => handleFragmentCardOnClick(event, element)}
                        >
                            <CardHeader>
                                <CardActions>
                                    <Dropdown
                                        toggle={<KebabToggle onToggle={(flag, event) => handleCardKebabDropdown(flag, event, element._id)} />}
                                        isOpen={fragmentsIdsObj[element._id]}
                                        isPlain 
                                        dropdownItems={dropdownItems(element)} 
                                        position={'right'} 
                                        />
                                </CardActions>
                            </CardHeader>
                            <CardTitle>{element.title}</CardTitle>
                            <CardBody>
                            {
                                // check [0]?.label for possible rendering bugs
                                programmingLanguagesData?.filter(item => element.language === item.id)[0]?.label
                            }
                            </CardBody>
                        </Card>
                        <ActionModal otherKey={key}/>
                    </div>
                ))}
                </Gallery>
            </>
        );

    const deleteFilters = (type, id) => {
    console.log("deleteFilters type: ", type);
    console.log("deleteFilters id: ", id);
    setFilters({});
    };

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
                        <Toolbar id="card-view-data-toolbar-group-types" usePageInsets clearAllFilters={() => deleteFilters()}>
                            <ToolbarContent>{toolbarItems}</ToolbarContent>
                        </Toolbar>
                        <Divider component="div" />
                    </DrawerSection>
                    <DrawerContent className={'pf-m-no-background'}>
                        <DrawerContentBody hasPadding>{drawerContent}</DrawerContentBody>
                    </DrawerContent>
                </Drawer>
            </PageSection>
        </div>
    );
}