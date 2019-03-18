import { graphql, Link, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { Component } from "react"

import {
  Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler
} from "reactstrap"

const NavItems = () => (
  <StaticQuery 
    query={graphql`
      query {
        allJavascriptFrontmatter(
          filter: {
            frontmatter: { title: { ne: null } }
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    `}
    render={data => <>
      {data.allJavascriptFrontmatter.edges.map(({ node }) => (
        <NavItem key={node.frontmatter.path}>
          <NavLink tag={Link} to={node.frontmatter.path}>{node.frontmatter.title}</NavLink>
        </NavItem>
      ))}
    </>}
  />
)

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{this.props.siteTitle}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItems />
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
