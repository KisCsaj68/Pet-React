import React from "react";
import {useState} from "react";

async function getData(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json()
    }
    return {}
}

export default function TrickNames(props) {
    {console.log(props)}

    return (
        <>
            <div id={"content"}>
                <label htmlFor={"trick-list"}>Please select a trick:</label>
                <select name="trick" id={"trick-list"} className={"select"} onChange={(event) => {
                    props.trick(event.target.value)
                }}>
                    {props.names.map((name) =>
                        <option value={name.id} id={name.id}>{name.name}</option>
                    )}
                </select>
                {/*<div className={"trick-card"}>*/}
                {/*    <div className={"head"}>*/}
                {/*        /!*<span className={"head"}>{props.trick[0].name}</span>*!/*/}
                {/*        <span className={"head"}>fdsasdafs</span>*/}
                {/*        /!*<span className={"paws"}>{"🦴".repeat(parseInt(props.trick[0].difficulty))}</span>*!/*/}
                {/*        <span className={"paws"}>dsfasdfasda</span>*/}
                {/*    </div>*/}
                {/*    <div className={"descr"}>*/}
                {/*        <h4>Description:</h4>*/}
                {/*        /!*<span className={"description"}>{props.trick[0].description}</span>*!/*/}
                {/*        <span className={"description"}>fdsfdsafsdaf</span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        /!*<iframe src={props.trick[0].video} frameBorder="2" width={"100%"} height={"450"}></iframe>*!/*/}
                {/*        <iframe src="" frameBorder="2" width={"100%"} height={"450"}></iframe>*/}
                {/*    </div>*/}
                {/*    <div className={"card-footer"}>*/}
                {/*        <span className={"footer-button"}>Add to favorites</span>*/}
                {/*        <span className={"footer-button"}>Add to my Journey</span>*/}
                {/*        <span className={"footer-button"}>Mark as completed</span>*/}

                {/*    </div>*/}
                {/*</div>*/}


            </div>
        </>
    )
}

