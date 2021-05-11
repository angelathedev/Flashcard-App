import React from "react";
import { useHistory } from "react-router";

function DeckForm({
    handleFunction, deck = {}, updateName, updateDescription,
}){
    const history = useHistory();

    function deckName(){
        return deck.name ? deck.name : "";
    }

    function deckDescription(){
        return deck.description ? deck.description : "";
    }

    return (
        <form>
        <div className = "form-group">
        <label for = "exampleFormControlInput1">Deck Name</label>
        <input
          type = "text"
          className = "form-control"
          id = "exampleFormControlInput1"
          value = {deckName()}
          onChange = {updateName}
        ></input>
      </div>
      <div className = "form-group">
        <label for = "exampleFormControlTextarea1">Deck Description</label>
        <textarea
          className = "form-control"
          id = "exampleFormControlTextarea1"
          rows = "4"
          value = {deckDescription()}
          onChange = {updateDescription}
        ></textarea>
      </div>

      <button
        className = "btn btn-secondary"
        type = "button"
        onClick = {() => history.go(-1)}
      >
        Cancel
      </button>
      <button
        className = "btn btn-primary"
        type = "submit"
        onClick = {handleFunction}
      >
        Submit
      </button>
        </form>
    )

}

export default DeckForm;