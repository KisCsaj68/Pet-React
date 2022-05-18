import React from "react";
import button from "bootstrap/js/src/button";

export default function LogIn() {
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
                        <td><label>User Name: </label></td>
                        <td><input type={"text"} placeholder={"User name"}/></td>
                    </tr>

                    <tr>
                        <td>Password:</td>
                        <td><input type={"password"} placeholder={"Password"}/></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <button type={"button"}>Log Me in!</button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}