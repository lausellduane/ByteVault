import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css'
// make sure you've installed @patternfly/patternfly
// import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
// import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';
// import { css } from '@patternfly/react-styles';
// import { BellIcon, CogIcon } from '@patternfly/react-icons';
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CodeFragmentsPage from "../code_fragments/code_fragments_section";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Home</h2>
  },
  {
    path: "/code_fragments",
    main: () => <CodeFragmentsPage />
  },
];

export default class PageLayoutDefaultNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };

    this.onNavSelect = result => {
      console.log("result: " + result);
      this.setState({
        activeItem: result.itemId
      });
    };
  }

  render() {
    const { activeItem } = this.state;

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav" theme="dark">
        <NavList>
          <NavItem id="home" to="/" itemId={0} isActive={activeItem === 0}>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem id="code_fragments" to="/code_fragments" itemId={1} isActive={activeItem === 1}>
            <Link to="/code_fragments">Code Fragments</Link>
          </NavItem>
        </NavList>
      </Nav>
    );

    const Header = (
      <PageHeader
        showNavToggle
      />
    );
    const Sidebar = <PageSidebar nav={PageNav} theme="dark" />;
    const pageId = 'main-content-page-layout-default-nav';
    const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>;

    return (
      <HashRouter>
        <Page
            header={Header}
            sidebar={Sidebar}
            isManagedSidebar
            skipToContent={PageSkipToContent}
            // breadcrumb={PageBreadcrumb}
            mainContainerId={pageId}
          >
            <Switch>
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
  }
}
