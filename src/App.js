import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar, {Greeting} from "./nav-bar";
import Registration from "./Registration";
import {useState} from "react";
import LogIn from "./LogIn";
import TrickCard from "./TrickCard";
import TrickNames from "./tricks";

async function getData(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json()
    }
    return {}
}

async function postData(url, payload) {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    return await response.json()
}

function App() {
    const [cardContent, setCardContent] = useState(<Greeting/>)
    const [trickNameContent, setTrickNameContent] = useState(null)
    const [messages, setMessages] = useState([])
    const [buttons, setButtons] = useState(["Registration", "LogIn"])
    const [cardActions, setCardActions] = useState([])
    let trickData = async function (trickId) {
                    let trick = await getData(`/tricks/${trickId}`);
                    setCardContent(<TrickCard trick={trick} buttons={cardActions}/>)
                }
    return (
        <>
            <NavBar Registration={() => {
                setTrickNameContent(null)
                setMessages([])
                setCardContent(<Registration handleRegister={(password, name, email) => {
                    postData("/registration", {name: name, password: password, email: email}).then((response) => {
                        if (response["response"] === "ok") {
                            setMessages(["Successfully registered. Please log in!"])
                        } else {
                            setMessages([`${response["response"]}. Please log in!`]);
                        }
                    })

                }}/>)

            }} flexButtons={
                buttons
            } home={() => {

                setMessages([])
                setCardContent(<Greeting/>)
                setTrickNameContent(null)

            }} LogIn={() => {

                setTrickNameContent(null)
                setCardContent(<LogIn handleLogin={(email, password) => {
                    postData("/login", {email: email, password: password}).then((response) => {
                        if (response["response"] === "ok") {
                            setCardContent(null)
                            setButtons(["My-Tricks", "Completed-tricks", "LogOut"])
                            setCardActions(["Fav", "Completed"])
                            setMessages([])
                        } else {
                            setMessages([`${response["response"]}. Please try again!`]);
                        }
                    })
                }
                }/>)

            }} LogOut={() => {
                getData("/logout").then(() => {
                    setTrickNameContent(null)
                    setMessages([])
                    setCardContent(null)
                    setCardActions([])
                    setButtons(["Registration", "LogIn"])
                })

            }} randomTrick={async () => {
                setMessages([])
                let trick = await getData("/tricks/random");
                setCardContent(<TrickCard trick={trick} buttons={cardActions}/>)
                setTrickNameContent(null)

            }} tricks={async (diff) => {
                // let trickData = async function (trickId) {
                //     let trick = await getData(`/tricks/${trickId}`);
                //     setCardContent(<TrickCard trick={trick} buttons={cardActions}/>)
                // }
                let trickNames = await getData(`/tricks/name/${diff}`)
                setMessages([])
                await trickData(trickNames[0].id)
                setTrickNameContent(<TrickNames trickNames={trickNames}
                                                trick={async (TrickId) => await trickData(TrickId)
                                                }/>)
            }} My-Tricks={async () => {
                let trickNames = await getData("/user/tricks/name")
                setCardContent([]);
                setCardActions(["Completed"])
                setMessages([]);
                await trickData(trickNames[0].id)
                setTrickNameContent(<TrickNames trickNames={trickNames}
                                                trick={async (TrickId) => await trickData(TrickId)
                                                }/>)

            }}/>

            <div className={"page-content"}>
                {trickNameContent}
            </div>
            <div className={"card-content"}>
                {cardContent}
            </div>
            <div className={"message-content" + (messages.length == 0 ? " hidden" : " show")}>
                {messages}
            </div>
        </>
    );
}

export default App;
