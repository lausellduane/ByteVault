import React, { useState } from 'react';
import {
  Avatar,
  Brand,
  Button,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  Flex, 
  FlexItem,
  KebabToggle,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Text,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  PageToggleButton,
  Switch
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
import ByteVaultLogoJPEG from'./../assets/bytebault.jpg';

export const DashboardHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);
    const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode);
    }

    const onDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const onDropdownSelect = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const onKebabDropdownToggle = () => {
        setIsKebabDropdownOpen(!isKebabDropdownOpen);
    };

    const onKebabDropdownSelect = () => {
        setIsKebabDropdownOpen(!isKebabDropdownOpen);
    };

    const onFullKebabToggle = () => {
        setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
    };

    const onFullKebabSelect = () => {
        setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
    };

    const themeSwitch = (
        <Flex>
            <FlexItem>
                <Text component="h4">
                    {
                        isDarkMode ? <>Dark</> : <>Light</>
                    }
                </Text>
            </FlexItem>
            <FlexItem>
                <Switch
                    id="simple-switch"
                    label=""
                    labelOff=""
                    isChecked={isDarkMode}
                    onChange={() => handleThemeChange()}
                />
            </FlexItem>
        </Flex>
    );

    const kebabDropdownItems = [
        <DropdownItem key="settings">
            <CogIcon /> Settings
        </DropdownItem>,
        <DropdownItem key="help">
            <HelpIcon /> Help
        </DropdownItem>
    ];
    
    const fullKebabItems = [
        <DropdownGroup key="group 2">
            <DropdownItem key="group 2 profile">My profile</DropdownItem>
            <DropdownItem key="group 2 user" component="button">
            User management
            </DropdownItem>
            <DropdownItem key="group 2 logout">Logout</DropdownItem>
        </DropdownGroup>,
        <Divider key="divider" />,
        <DropdownItem key="settings">
            <CogIcon /> Settings
        </DropdownItem>,
        <DropdownItem key="help">
            <HelpIcon /> Help
        </DropdownItem>
    ];

    const userDropdownItems = [
        <DropdownGroup key="group 2">
            <DropdownItem key="group 2 profile">My profile</DropdownItem>
            <DropdownItem key="group 2 user" component="button">
            User management
            </DropdownItem>
            <DropdownItem key="group 2 logout">Logout</DropdownItem>
        </DropdownGroup>
    ];

    const headerToolbar = (
        <Toolbar id="toolbar" isFullHeight isStatic>
            <ToolbarContent>
            <ToolbarGroup>
                {themeSwitch}
            </ToolbarGroup>
            <ToolbarGroup
                variant="icon-button-group"
                alignment={{ default: 'alignRight' }}
                spacer={{ default: 'spacerNone', md: 'spacerMd' }}
            >
                <ToolbarGroup variant="icon-button-group" visibility={{ default: 'hidden', lg: 'visible' }}>
                <ToolbarItem>
                    <Button aria-label="Settings" variant="secondary" icon={<CogIcon />} />
                </ToolbarItem>
                <ToolbarItem>
                    <Button aria-label="Help" variant="secondary" icon={<QuestionCircleIcon />} />
                </ToolbarItem>
                </ToolbarGroup>
                <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
                <Dropdown
                    isPlain
                    position="right"
                    onSelect={() => onKebabDropdownSelect()}
                    toggle={<KebabToggle onToggle={() => onKebabDropdownToggle()} />}
                    isOpen={isKebabDropdownOpen}
                    dropdownItems={kebabDropdownItems}
                />
                </ToolbarItem>
                <ToolbarItem visibility={{ md: 'hidden' }}>
                <Dropdown
                    isPlain
                    position="right"
                    onSelect={() => onFullKebabSelect()}
                    toggle={<KebabToggle onToggle={() => onFullKebabToggle()} />}
                    isOpen={isFullKebabDropdownOpen}
                    dropdownItems={fullKebabItems}
                />
                </ToolbarItem>
            </ToolbarGroup>
            <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
                <Dropdown
                isFullHeight
                onSelect={() => onDropdownSelect()}
                isOpen={isDropdownOpen}
                toggle={
                    <DropdownToggle icon={<Avatar src={imgAvatar} alt="Avatar" />} onToggle={() => onDropdownToggle()}>
                    Ned Username
                    </DropdownToggle>
                }
                dropdownItems={userDropdownItems}
                />
            </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );

    return (
        <Masthead backgroundColor={isDarkMode ? "dark" : "light"}>
            <MastheadToggle>
            <PageToggleButton variant="plain" aria-label="Global navigation">
                <BarsIcon />
            </PageToggleButton>
            </MastheadToggle>
            <MastheadMain>
            <MastheadBrand>
                <Brand
                    widths={{ default: '40px' }}
                    heights={{ default: '40px' }}
                    src={ByteVaultLogoJPEG}
                    alt="Fallback patternFly default logo"
                />
            </MastheadBrand>
            </MastheadMain>
            <MastheadContent>{headerToolbar}</MastheadContent>
        </Masthead>
    );
}