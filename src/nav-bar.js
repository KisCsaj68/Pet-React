import React from "react";
import {Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import logo from "./logo.svg";


export default function NavBar(props) {
    const difficulty = new Map([["easy", 1], ["medium", 2],["hard", 3], ["pawsome", 4]])

    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed={"top"} expand={"lg"} className={"noselect"}>
                <NavbarBrand onClick={props.home}>
                    <img src={logo} width="40px" height="40px" alt={"reactLogo"}/>
                    Dog Tricks</NavbarBrand>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className={"container-fluid"}>
                        <NavDropdown title={"Tricks"}>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(difficulty.get("easy"))}>Easy</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(difficulty.get("medium"))}>Medium</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(difficulty.get("hard"))}>Hard</NavDropdown.Item>
                            <NavDropdown.Item href={"#"} onClick={() => props.tricks(difficulty.get("pawsome"))}>PAWsome</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={"#"} onClick={props.randomTrick}>Random Trick!</Nav.Link>
                        {props.flexButtons.map((button, i) =>
                            <Nav.Link href={"#"} className={"ms-auto"} onClick={props[button]} key={i}>{button}</Nav.Link>
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