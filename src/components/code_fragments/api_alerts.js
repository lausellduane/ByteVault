import { useState } from "react";
import {
    Alert,
    AlertGroup,
    AlertActionCloseButton,
    AlertActionLink,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardBody,
    CardTitle,
    DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription,
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

export const ApiAlerts = (props) => {
    const { apiErrors: { fragmentsDataIsError, fragmentsDataError, tagsDataIsError, 
        tagsDataError, programmingLanguagesDataIsError, programmingLanguagesDataError },
        deleteFragmentApi: { useDeleteFragmentIsSuccess } } = props;
    return (
        <div class="pf-l-grid pf-m-gutter">
            <AlertGroup>
                {
                    fragmentsDataIsError && 
                    <div class="pf-l-grid__item pf-m-12-col">
                        <Alert
                            title="Error!"
                            variant="danger"
                            timeout={30000}
                        >
                            <p>Fragments are not available at this time. {fragmentsDataError?.message}.</p>
                        </Alert>
                    </div>
                }
                {
                    tagsDataIsError && 
                        <div class="pf-l-grid__item pf-m-12-col">
                            <Alert
                                title="Error!"
                                variant="danger"
                                timeout={30000}
                            >
                                <p>Tags for creating a new fragment are not available at this time. {tagsDataError?.message}.</p>
                            </Alert>
                        </div> 
                }
                {
                    programmingLanguagesDataIsError && 
                        <div class="pf-l-grid__item pf-m-12-col">
                            <Alert
                                title="Error!"
                                variant="danger"
                                timeout={30000}
                            >
                                <p>Programming languages for creating a new fragment are not available at this time. {programmingLanguagesDataError?.message}.</p>
                            </Alert>
                        </div>
                }
            </AlertGroup>
        </div>
    );
};