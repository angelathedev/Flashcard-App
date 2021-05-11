import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

function ViewDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [ deck, setDeck ] = useState({
    id: 0,
    name: "",
    cards: [],
  });

  useEffect(() => {
    async function loadDecks() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
    }

    loadDecks();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  function handleDeleteDeck(deckId) {
    if (window.confirm("Delete this deck? You cannot undo this.")) {
      deleteDeck(deckId);
      history.push("/");
    }
  }

  function handleDeleteCard(cardId) {
    if (window.confirm("Delete this card? You cannot undo this.")) {
      deleteCard(cardId).then((item) => history.go(0));
    }
  }


  const cardList = deck.cards.map((card) => (
    <div className="card w-100" key={card.id}>
      <div className="card-body">
        <h5 className="card-title">{card.name}</h5>
        <h6 className="text-muted">Front</h6>
        <p className="card-text w-40">{card.front}</p>
        <hr />
        <h6 className="text-muted">Back</h6>
        <p className="card-text w-40">{card.back}</p>
        <div className="d-flex flex-row-reverse">
          <button
            className="btn btn-danger ml-2"
            onClick={() => handleDeleteCard(card.id)}
          >
            Delete
          </button>
          <Link
            className="btn btn-secondary ml-2"
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div className="row mb-5">
        <div className="d-flex flex-row col-8">
          <Link className="btn btn-secondary m-2" to={`/decks/${deck.id}/edit`}>
            Edit Deck
          </Link>
          <Link className="btn btn-primary m-2" to={`/decks/${deck.id}/study`}>
            Study
          </Link>
          <Link
            className="btn btn-primary m-2"
            to={`/decks/${deck.id}/cards/new`}
          >
            Add Cards
          </Link>
        </div>
        <div className="d-flex flex-row-reverse col-4">
          <button
            className="btn btn-danger m-2"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            Delete Deck
          </button>
        </div>
      </div>
      <div className="card-list">{cardList}</div>
    </div>
  );
}

export default ViewDeck;