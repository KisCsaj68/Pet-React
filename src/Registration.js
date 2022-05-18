import React from "react";
import button from "bootstrap/js/src/button";

export default function Registration() {
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
                    <td><input type={"text"} placeholder={"User name"}/></td>
                </tr>
                <tr>
                    <td>Email address:</td>
                    <td><input type={"text"} placeholder={"Email address"}/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type={"password"} placeholder={"Password"}/></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td>
                        <button type={"button"}>Register</button>

                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </>)
}