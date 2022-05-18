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


    return (
        <>
            <NavBar reg={() => {
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

            }} home={() => {
                setCardContent(<Greeting/>)
                setTrickNameContent([])

            }} login={() => {
                setTrickNameContent([])
                setCardContent(<LogIn handleLogin={(email, password) => {
                    postData("/login", {email: email, password:password}).then((response) => {
                        if (response["response"] === "ok") {
                            setMessages(["Successfully log in!"])
                            setCardContent([])
                        } else {
                            setMessages([`${response["response"]}. Please try again!`]);
                        }

                    })
                }
                }/>)

            }} randomTrick={async () => {
                let trick = await getData("/tricks/random");
                setCardContent(<TrickCard trick={trick}/>)
                setTrickNameContent([])
            }} tricks={async (diff) => {
                let trickNames = await getData(`/tricks/name/${diff}`)
                setTrickNameContent(<TrickNames trickNames={trickNames} trick={async (TrickId) => {
                    let trick = await getData(`/tricks/${TrickId}`);
                    setCardContent(<TrickCard trick={trick}/>)
                }
                }/>)
                setCardContent([])
            }

            }/>

            <div className={"page-content"}>
                {trickNameContent}
            </div>
            <div className={"card-content"}>
                {cardContent}
            </div>
            <div className={"message-content"}>
                {messages}
            </div>
        </>
    );
}

export default App;
