import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckList({ decks }) {
  const history = useHistory();

  function handleDeleteButton(deckId) {
    if (
      //if delete is confirmed, remove it from the db
      window.confirm(
        "Really delete? You will not be able to recover this deck."
      )
    ) {
      deleteDeck(deckId).then(history.go(0));
    }
  }

  const mappedDecks = decks.map((deck, index) => (
    <div className="card w-100" key={index}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <h6>{deck.cards.length} cards</h6>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <button
            onClick={() => handleDeleteButton(deck.id)}
            className="btn btn-danger"
          >
            Delete deck
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="d-flex flex-column">{mappedDecks}</div>;
}

export default DeckList;