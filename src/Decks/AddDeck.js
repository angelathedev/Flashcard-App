import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";

function AddDeck(){
    const history = useHistory();
    const [ deck, setDeck ] = useState({
        id: 0,
        name: "",
        description: ""
    })

    function submitHandler(e){
        e.preventDefault();
        createDeck(deck)
        .then((item) => history.push(`/decks/${item.id}`));
    }

    function updateName(e){
        setDeck({...deck, name: e.target.value})
    }

    function updateDescription(e){
        setDeck({...deck, description: e.target.value})
    }

    return (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Deck
              </li>
            </ol>
          </nav>
          <h4>Create Deck</h4>
          <DeckForm
            handleFunction = {submitHandler}
            deck = {deck}
            updateName = {updateName}
            updateDescription = {updateDescription}
          />
        </div>
      );
}

export default AddDeck;