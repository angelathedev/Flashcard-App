import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ deck }){
    if(!deck || deck.length < 3){
        return <p>Loading...</p>
    }

    return (
        <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.Id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
        </nav>

        <h4>Study: {deck.name}</h4>
        <h5>There are not enough cards.</h5>
        <p>At least 3 cards are required to study.  Add more cards.</p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            Add Cards
        </Link>
    </div>
    )
}

export default NotEnoughCards;