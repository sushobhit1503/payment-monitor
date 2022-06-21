import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap"


class Toolbar extends React.Component {
    state = {
        isVisible: false
    }
    render() {
        return (
            <div>
                <Navbar color="success" expand="md" dark>
                    <NavbarBrand href="/">
                        PAYMENTS - MONITOR
                    </NavbarBrand>
                    <NavbarToggler onClick={() => { this.setState({ isVisible: !this.state.isVisible }) }} />
                    <Collapse isOpen={this.state.isVisible} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink style={{ color: "white" }} href="/add-record">
                                    ADD RECORD
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "white" }} href="/add-money">
                                    ADD MONEY
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "white" }} href="/reimbursements">
                                    REIMBURSEMENTS
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "white" }} href="/spend-others">
                                    SPENDING ON OTHERS
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "white" }} href="/analysis">
                                    ANALYSIS
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Toolbar