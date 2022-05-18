import React from "react";


export default function TrickNames(props) {

    return (
        <>
            <div id={"content"}>
                <label htmlFor={"trick-list"}>Please select a trick:</label>
                <select name="trick" id={"trick-list"} className={"select"} onChange={(event) => {
                    props.trick(event.target.value)
                }}>
                    {props.trickNames.map((name) =>
                        <option value={name.id} id={name.id}>{name.name}</option>
                    )}
                </select>
            </div>
        </>
    )
}

