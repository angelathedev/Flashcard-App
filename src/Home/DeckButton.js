import React from "react";
import { useHistory } from "react-router";

function DeckButton(){
    const history = useHistory();

    return (
        <button className = "btn btn-secondary"
    type = "button"
    onClick = {() => history.push("/decks/new")}>Create a new deck</button>
    )
}

export default DeckButton;