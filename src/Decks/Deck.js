import React from "react";
import { Switch, Route } from "react-router-dom";
import Card from "../Cards/Card";
import EditDeck from "./EditDeck";
import AddDeck from "./AddDeck";
import StudyDeck from "./StudyDeck";
import ViewDeck from "./ViewDeck";

function Deck1({ decks }){
  return (
    <div>
      <Switch>
        <Route path="/decks/new">
          <AddDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyDeck decks={decks} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards">
          <Card />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck />
        </Route>
      </Switch>
    </div>
  )
}

export default Deck1;