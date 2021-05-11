import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { readDeck } from "../utils/api";
import NotEnoughCards from "../Cards/NotEnoughCards";

function StudyDeck({ decks }){
    const history = useHistory();
    const { deckId } = useParams();
    const [ study, setStudy ] = useState({
        cards: [],
        front: true, 
        flipped: false,
        currentCard: 0, 
        numCards: 0
    });
    const [ deck, setDeck ] = useState({});

    useEffect(() => {
        async function loadDecks(){
            const currentDeck = await readDeck(deckId);
            setDeck(currentDeck);
            setStudy({
                cards: currentDeck.cards,
                front: true, 
                flipped: false,
                currentCard: 0, 
                numCards: currentDeck.cards.length
            })
        }
        loadDecks();
    }, [deckId])

    if (!deck) {
        return <p>Loading...</p>;
      }

    if(study.cards.length < 3){
        return <NotEnoughCards deck = {deck} />;
    }

  function flipCard() {
    setStudy({
      ...study,
      front: !study.front,
      flipped: true
    });
  }

  function cardSide() {
    return study.front
      ? study.cards[study.currentCard].front
      : study.cards[study.currentCard].back;
  }

  function cardsLeft() {
    return `${study.currentCard + 1} of ${study.numCards}`;
  }

  function next() {
    return study.flipped ? (
      <button className="btn-warning btn" onClick = {nextCard}>
        Next
      </button>
    ) : null;
  }

  function finalCard() {
    return study.currentCard >= study.numCards - 1;
  }

  function nextCard() {
    if (finalCard()) {
      if (window.confirm("Would you like to start over?")) {
        setStudy({
          ...study,
          front: true, 
          flipped: false,
          currentCard: 0,
        });
      } else {
        history.push("/");
      }
    } else {
      setStudy({
        ...study,
        front: true, 
        flipped: false,
        currentCard: study.currentCard + 1,
      });
    }
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
            Study
          </li>
        </ol>
      </nav>
      <h4>Study: {deck.name}</h4>
      <div className="card w-100">
        <div className="card-body">
          <h6>Card {cardsLeft()}</h6>
          <p className="card-text">{cardSide()}</p>
          <button className="btn btn-primary" onClick = {flipCard}>
            Flip
          </button>
          {next()}
        </div>
      </div>
    </div>
  );

}

export default StudyDeck;