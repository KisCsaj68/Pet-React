import React from "react";
import button from "bootstrap/js/src/button";

export default function Registration(props) {
    return (<>
        <div className={"registration-card"}>
            <table>
                <thead>
                <tr>
                    <th>Please fill the following fields:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><label>User Name: </label></td>
                    <td><input type={"text"} placeholder={"User name"} id={"name"}/></td>
                </tr>
                <tr>
                    <td>Email address:</td>
                    <td><input type={"text"} placeholder={"Email address"} id={"email"}/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type={"password"} placeholder={"Password"} id={"pw"}/></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td>
                        <button type={"button"} onClick={() => {
                            let password = document.querySelector("#pw").value
                            let name = document.querySelector("#name").value
                            let email = document.querySelector("#email").value
                            props.handleRegister(password, name, email)
                        }}>Register</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </>)
}