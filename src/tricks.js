import React from "react";


export default function TrickNames(props) {

    return (<>
            <div id={"content"}>
                <label htmlFor={"trick-list"}>Please select a trick:</label>
                <select name="trick" id={"trick-list"} className={"select"} value={props.trick[0]} onChange={(event) => {
                    props.trick(event.target.value)
                }}>
                    {props.trickNames.map((name, i) => <option value={name.id}
                                                               key={i}>{name.name}</option>)}
                </select>
            </div>
        </>)
}

