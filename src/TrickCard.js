import React from "react";

export default function TrickCard(props) {
    return (<>
        <div className={"trick-card"} id={props.trick.id}>
            <div className={"head"}>
                <span className={"head"}>{props.trick.name}</span>
                <span className={"paws"}>{"🦴".repeat(parseInt(props.trick.difficulty))}</span>
            </div>
            <div className={"descr"}>
                <h4>Description:</h4>
                <span className={"description"}>{props.trick.description}</span>
            </div>
            <div>
                <iframe src={props.trick.video} frameBorder="2" width={"100%"} height={"450"}></iframe>
            </div>
            <div className={"card-footer"}>
                <button className={"footer-button"} onClick={() => {
                    let trick_id = props.trick.id
                    props.addFavorite(trick_id)
                }}>Add to learn
                </button>
                <button className={"footer-button"} onClick={() => {
                    let trick_id = props.trick.id
                    props.markCompeted(trick_id)
                }}>Mark as competed
                </button>
            </div>
        </div>
    </>)
}

