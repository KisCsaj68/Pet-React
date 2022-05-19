import React from "react";

export default function TrickCard(props) {
    return (
        <>
            <div className={"trick-card"} id={props.trick[0].id}>
                <div className={"head"}>
                    <span className={"head"}>{props.trick[0].name}</span>
                    <span className={"paws"}>{"🦴".repeat(parseInt(props.trick[0].difficulty))}</span>
                </div>
                <div className={"descr"}>
                    <h4>Description:</h4>
                    <span className={"description"}>{props.trick[0].description}</span>
                </div>
                <div>
                    <iframe src={props.trick[0].video} frameBorder="2" width={"100%"} height={"450"}></iframe>
                </div>
                <div className={"card-footer"}>
                    {props.buttons.map((button, i) =>
                        <button className={"footer-button"} key={i}>{button}</button>
                    )}
                </div>
            </div>
        </>
    )
}

