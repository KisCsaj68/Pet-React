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

async function putData(url, payload) {
    const response = await fetch(url, {
        method: "PUT",
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
        setCardContent(<TrickCard trick={trick[0]} addFavorite={async (trick_id) => {
                await postData(`/user/trick/add/${trick_id}`)
            }} markCompeted={async (trick_id) => {
                await putData(`/user/trick/add/${trick_id}`)}
        }/>)
    }
    let user_tricks = async function (completed) {
        let trickNames = await getData(`/user/tricks/name/${completed}`)
        setMessages([]);
        await trickData(trickNames[0].id)
        setTrickNameContent(<TrickNames trickNames={trickNames}
                                        trick={async (TrickId) => await trickData(TrickId)
                                        }/>)
    }
    return (
        <>
            <NavBar Registration={() => {
                setTrickNameContent(null)
                setMessages([])
                setCardContent(<Registration handleRegister={(password, name, email) => {
                    postData("/registration", {name: name, password: password, email: email}).then((response) => {
                        if (response["response"] === "ok") {
                            setCardContent([])
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
                setMessages([])
                setCardContent(<LogIn handleLogin={(email, password) => {
                    postData("/login", {email: email, password: password}).then((response) => {
                        if (response["response"] === "ok") {
                            setCardContent(null)
                            setButtons(["Tricks-to-learn", "Completed-tricks", "LogOut"])
                            setMessages([])
                        } else {
                            setMessages([`${response["response"]}. Please try again!`]);
                        }
                    })
                }}/>)

            }} LogOut={() => {
                getData("/logout").then(() => {
                    setTrickNameContent(null)
                    setMessages([])
                    setCardContent(null)
                    setButtons(["Registration", "LogIn"])
                })

            }} randomTrick={async () => {
                setMessages([])
                let trick = await getData("/tricks/random");
                setCardContent(<TrickCard trick={trick[0]} addFavorite={async (trick_id) => {
                await postData(`/user/trick/add/${trick_id}`)
            }}  markCompeted={async (trick_id) => {
                await putData(`/user/trick/add/${trick_id}`)}}/>)
                setTrickNameContent(null)

            }} tricks={async (diff) => {
                let trickNames = await getData(`/tricks/name/${diff}`)
                setMessages([])
                await trickData(trickNames[0].id)
                setTrickNameContent(<TrickNames trickNames={trickNames}
                                                trick={async (TrickId) => await trickData(TrickId)
                                                }/>)
            }} Tricks-to-learn={async () => {
                await user_tricks("false")

            }} Completed-tricks={async () => {
                await user_tricks("true")

            }} />

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
