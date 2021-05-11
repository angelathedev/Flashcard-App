import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard(){
    const history = useHistory();
    const { deckId, cardId } = useParams();
    const [ card, setCard ] = useState({
        id: cardId,
        front: "",
        back: "",
        deckId: Number(deckId)
    })
    const [ deckName, setDeckName ] = useState("");

    useEffect(() => {
        async function loadCard(){
        const currentCard = await readCard(cardId);

        setCard({
            id: cardId,
            front: currentCard.front,
            back: currentCard.back,
            deckId: Number(deckId) 
        })
    }

    async function loadDeckName(){
        const deck = await readDeck(deckId);
        setDeckName(deck.name);
    }
    loadCard();
    loadDeckName();

    }, [cardId, deckId]);

    function updateQuestion(e){
        setCard({...card, front: e.target.value})
    }

    function updateAnswer(e){
        setCard({...card, back: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        updateCard(card)
        .then((item) => history.push(`/decks/${item.deckId}`));
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to = "/"> Home </Link>
                    </li>

                    <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deckName}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
        </nav>
        <h3>Edit Deck</h3>
        <CardForm 
            handleSubmit = {handleSubmit}
            card = {card}
            updateQuestion = {updateQuestion}
            updateAnswer = {updateAnswer}
            />
        </div>
    )

}

export default EditCard;
