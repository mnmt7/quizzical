import React from "react"

export default function Option(props) {
    let className = "unselected"
    
    if (props.showAnswer === true) {
        if (props.answer === props.correctAnswer) {
            className = "green"
        }
        else if (props.answer === props.userAnswer) {
            className = "red"
        }
        else {
            className = "blur"
        }
    }
    else {
        if (props.answer === props.userAnswer) {
            className = "black"
        }
    }
    return (
        <div 
            className={className}
            onClick={() => props.updateAnswer(props.question, props.answer)}
        >
            {props.answer}
        </div>
    )
}