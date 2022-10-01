import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSidebar,
  SkipToContent,
  Text,
  TextContent
} from '@patternfly/react-core';
import {
    HashRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { DashboardHeader } from './header';
import { CodeFragmentsSection } from './code_fragments/code_fragments_section_function';

export const PageTemplateTitle = () => (
  <PageSection variant="light">
    <TextContent>
      <Text component="h1">Main title</Text>
      <Text component="p">This is a full page demo.</Text>
    </TextContent>
  </PageSection>
);

const routes = [
    {
      path: "/",
      exact: true,
      main: () => <h2>Home</h2>
    },
    {
      path: "/fragments",
      main: () => <CodeFragmentsSection />
    },
  ];

export const DashboardWrapper = (props) => {
    const [activeItem, setActiveItem] = useState(0);
    console.log("activeItem: ", activeItem);
    
    const onNavSelect = result => {
        setActiveItem(result?.itemId);
    };

    const PageNav = (
        <Nav onSelect={onNavSelect} aria-label="Nav" theme="dark">
          <NavList>
            <NavItem id="home" to="/" itemId={0} isActive={activeItem === 0}>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem id="fragments" to="/fragments" itemId={1} isActive={activeItem === 1}>
              <Link to="/fragments">Code Fragments</Link>
            </NavItem>
          </NavList>
        </Nav>
      );
  
      const _sidebar = <PageSidebar nav={PageNav} isNavOpen={false}/>;

    return (
        <HashRouter>
            <Page
                header={<DashboardHeader />}
                sidebar={_sidebar}
                isManagedSidebar
                mainContainerId='main-content-page-layout-default-nav'
            >
                <Switch label="switch">
                    {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                    />
                    ))}
                </Switch>
            </Page>
        </HashRouter>
    );
};