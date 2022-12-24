import React from "react"
import Option from "../Components/Option"
import {nanoid} from "nanoid"

export default function QuizElement(props) {
   
   const optionElements = props.element.options.map(option => generateOption(option))
   
    function generateOption(answer) {
        return (
            <Option 
                key={nanoid()} 
                id={nanoid()} 
                question={props.element.question} 
                answer={answer} 
                userAnswer={props.element.userAnswer} 
                updateAnswer={props.updateAnswer}
                showAnswer={props.element.showAnswer}
                correctAnswer={props.element.correct_answer}
            />
        )
    }    
        
    return (
        <div className = "qa-container">
            <p className="question">{props.element.question}</p>
            <div className="answer-container">
                {optionElements}
            </div>
            <hr/>
        </div>
    )
}