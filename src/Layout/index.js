import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import Deck1 from "../Decks/Deck";
import { listDecks } from "../utils/api";

function Layout() {
  const [ decks, setDecks ] = useState([]);

  useEffect(()=> {
    async function loadDecks(){
      const currentDeck = await listDecks();
      setDecks(currentDeck);
    }
    loadDecks();
  }, [])
  
  return (
    <div>
      <Header />
      <div className="container">
      <Switch>
        <Route exact path = "/">
          <Home decks= {decks} />
        </Route>
        <Route path = "/decks">
          <Deck1 decks = {decks} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default Layout;
