import React from "react";
import button from "bootstrap/js/src/button";

export default function LogIn(props) {
    return (
        <>
            <div className={"registration-card"}>
                <table>
                    <thead>
                    <tr>
                        <th>Please fill the following fields:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label>User email: </label></td>
                        <td><input type={"text"} placeholder={"User name"} id={"email"}/></td>
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
                                let email = document.querySelector("#email").value
                                props.handleLogin(email, password)
                            }}>Log Me in!
                            </button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}