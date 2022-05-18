import React from "react";
import {Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import logo from "./logo.svg";


export default function NavBar(props) {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed={"top"} expand={"lg"} collapseOnSelect>
                <NavbarBrand onClick={props.home}>
                    <img src={logo} width="40px" height="40px" alt={"reactLogo"}/>
                    Dog Tricks</NavbarBrand>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className={"container-fluid"}>
                        <NavDropdown title={"Tricks"}>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(1)}>Easy</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(2)}>Medium</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(3)}>Hard</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(4)}>PAWsome</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={"#"} onClick={props.randomTrick}>Random Trick!</Nav.Link>
                        {props.flexButtons.map((button) =>
                            <Nav.Link href={"#"} className={"ms-auto"} onClick={props[button]}>{button}</Nav.Link>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )

}


export function Greeting() {
    return (
        <div className={"greeting"}>How to train your T-rex</div>

    )
}