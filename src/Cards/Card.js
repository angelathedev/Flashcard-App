import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Card(){
    return(
        <div>
            <Switch>
                <Route path = "/decks/:deckId/cards/new">
                    <AddCard />
                </Route>
                <Route path = "/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
                </Route>
            </Switch>
        </div>
    )
}


export default Card;