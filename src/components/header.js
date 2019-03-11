import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {Component } from "react"

import {
  Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler
} from "reactstrap"

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
            <NavItem>
              <NavLink tag={Link} to="/">{this.props.siteTitle}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/page-2">Goto page 2</NavLink>
            </NavItem>
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
