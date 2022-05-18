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
    const [cardContent, setCardContent] = useState([<Greeting/>])
    const [trickNameContent, setTrickNameContent] = useState([<names/>])
    const [messages, setMessages] = useState([])
    const [buttons, setButtons] = useState(["Registration", "LogIn"])

    return (
        <>
            <NavBar Registration={() => {
                setTrickNameContent([])
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
                setTrickNameContent([])

            }} LogIn={() => {
                setTrickNameContent([])
                setCardContent(<LogIn handleLogin={(email, password) => {
                    postData("/login", {email: email, password: password}).then((response) => {
                        if (response["response"] === "ok") {
                            setCardContent([])
                            setButtons(["My-Tricks", "LogOut"])
                            setMessages([])
                        } else {
                            setMessages([`${response["response"]}. Please try again!`]);
                        }

                    })
                }
                }/>)

            }} LogOut={() => {
                getData("/logout").then(() => {
                    setTrickNameContent([])
                    setMessages([])
                    setCardContent([])
                    setButtons(["Registration", "LogIn"])
                })

            }} randomTrick={async () => {
                setMessages([])
                let trick = await getData("/tricks/random");
                setCardContent(<TrickCard trick={trick}/>)
                setTrickNameContent([])

            }} tricks={async (diff) => {
                setMessages([])
                let trickNames = await getData(`/tricks/name/${diff}`)
                setTrickNameContent(<TrickNames trickNames={trickNames} trick={async (TrickId) => {
                    let trick = await getData(`/tricks/${TrickId}`);
                    setCardContent(<TrickCard trick={trick}/>)
                }
                }/>)
                setCardContent(["Let's start!"])
            }

            }/>

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
