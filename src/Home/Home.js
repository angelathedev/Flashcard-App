import React from "react";
import { Route, Switch } from "react-router";
import Deck from "../Decks/Deck";
import DeckList from "../Decks/DeckList"
import DeckButton from "../Home/DeckButton";


function Home({ decks }){
    return (
        <div>
            <DeckButton />
            <Switch>
                <Route exact path = "/">
                    <DeckList decks = {decks} />
                </Route>
                <Route path = "/decks">
                    <Deck decks ={decks} />
                </Route>
            </Switch>
        </div>
    )
}

export default Home;