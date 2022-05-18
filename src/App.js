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

async function handler(Id) {
    let trick = await getData(`/tricks/${Id}`)
    return trick
    // setContent(<Trick trick={trick} tricks={tricks}/>)

}

function App() {
    const [cardContent, setCardContent] = useState([<Greeting/>])
    const [trickNameContent, setTrickNameContent] = useState([<names/>])


    return (
        <>
            <NavBar reg={() => {
                setCardContent(<Registration/>)
                setTrickNameContent([])

            }} home={() => {
                setCardContent(<Greeting/>)
                setTrickNameContent([])

            }} login={() => {
                setCardContent(<LogIn/>)
                setTrickNameContent([])

            }} randomTrick={async () => {
                let trick = await getData("/tricks/random");
                setCardContent(<TrickCard trick={trick}/>)
                setTrickNameContent([])
            }} tricks={async (diff) => {
                let names = await getData(`/tricks/name/${diff}`)
                setTrickNameContent(<TrickNames names={names} trick={async (TrickId) => {
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
        </>
    );
}

export default App;
