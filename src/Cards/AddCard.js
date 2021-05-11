import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard(){
const { deckId } = useParams();
const initialCardState = {
    front: "",
    back: "",
    deckId
}
const [ card, setCard ] = useState({...initialCardState});
const [ deck, setDeck ] = useState({});

useEffect(() => {
    async function loadDeck(){
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
    }
    loadDeck();
}, [deckId])

function updateQuestion(e){
    setCard({...card, front: e.target.value})
}

function updateAnswer(e){
    setCard({...card, back: e.target.value})

}

function handleSubmit(e){
    e.preventDefault();
    async function updateData(){
        await createCard(deckId, card);
        setCard({...initialCardState})
    }
    updateData();
}

return (
    <div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
    <h4>{deck.name}: Add Card</h4>
    <CardForm
      card = {card}
      updateQuestion = {updateQuestion}
      updateAnswer = {updateAnswer}
      handleSubmit={handleSubmit}
    />
  </div>
);

}

export default AddCard;
