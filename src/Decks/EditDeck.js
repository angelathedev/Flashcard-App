import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck(){
const history = useHistory();
const { deckId } = useParams();
const [ deck, setDeck ] = useState({
    id: 0,
    name: "",
    description: ""
});

useEffect(() => {
    async function loadDecks(){
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
    }
    loadDecks();
}, [deckId])

function handleSubmission(e){
    e.preventDefault();
    updateDeck(deck)
.then((index) => history.push(`/decks/${index.id}`));
}

function updateName(e){
    setDeck({...deck, name: e.target.value});
}

function updateDescription(e){
    setDeck({...deck, description: e.target.value});
}

return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h4>Edit Deck</h4>
      <DeckForm
        handleFunction = {handleSubmission}
        deck = {deck}
        updateName = {updateName}
        updateDescription = {updateDescription}
      />
    </div>

)

}

export default EditDeck;