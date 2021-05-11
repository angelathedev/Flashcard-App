import React from "react";
import { useHistory } from "react-router";

function CardForm({
    handleSubmit, card = {}, updateQuestion, updateAnswer
}){
    const history = useHistory();

    function cardQuestion(){
        return card.front ? card.front : "";
    }

    function cardAnswer(){
        return card.back ? card.back : "";
    }

    return(
        <form>
            <div class = "mb-3">
                <label for = "exampleFormControlInput1">Question</label>
                <textarea 
                class = "form-control"
                id = "question"
                rows = "4"
                value = {cardQuestion()}
                onChange = {updateQuestion}> 
                </textarea>
            </div>
            <div class = "mb-3">
                <label for = "exampleFormControlTextarea1">Description</label>
                <textarea 
                class = "form-control"
                id = "answer"
                rows = "4"
                value = {cardAnswer()}
                onChange = {updateAnswer}></textarea>
            </div>

            <button 
            className = "btn btn-secondary" 
            type = "button"
            onClick = {() => history.go(-1)}
            >
                Done
            </button>
            <button 
            className = "btn btn-secondary"
            type = "submit"
            onClick = {handleSubmit}
            >
                Submit
            </button>
        </form>
    )


}

export default CardForm;