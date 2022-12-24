import React from "react"
import quizData from "../quizData"
import QuizElement from "../Components/QuizElement"
import {nanoid} from "nanoid"

export default function Main() {
    const[screen, setScreen] = React.useState("m")
    const [quiz, setQuiz] = React.useState([])
    const [result, setResult] = React.useState(true)
    const [toggle, setToggle] = React.useState(0)
    
    React.useEffect(() => {
            setScreen("w")
            // fetch("https://opentdb.com/api.php?amount=2")
            fetch("https://opentdb.com/api.php?amount=5&category=12&difficulty=easy")
            .then(res => res.json())
            .then(data => setQuiz(generate(data.results)))
            setResult(false)
    }, [toggle])
    
    function generate(oldQuiz) {
        const newQuiz = oldQuiz.map(element => addOptionsArray(element))
        return newQuiz
    }
    
    function addOptionsArray(element) {
        const options = element.incorrect_answers.map(answer => answer)
        options.push(element.correct_answer)
        
        let currentIndex = options.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [options[currentIndex], options[randomIndex]] = [
            options[randomIndex], options[currentIndex]];
        }
        
        return {
            ...element,
            options: options
        }
    }
    
    function generateQuizElements() {
        return quiz.map(element => {
            return <QuizElement 
                key={nanoid()} 
                element={
                    {
                        ...element,
                        showAnswer: result
                    }
                }
                updateAnswer={updateAnswer}
            />
        })
    }
    
    function updateAnswer(ques, ans) {
        const newQuiz = quiz.map(element => {
            if (element.question === ques) {
                return {
                    ...element,
                    userAnswer: ans
                }
            }
            return element
        })
        
        setQuiz(newQuiz)
    }
    
    function submit() {
        // setResult(true)
        if (!result) {
            setResult(true)
        }
        else {
            setToggle((toggle) => 1 - toggle)
        }
    }
    
    const quizElements = generateQuizElements();
    let score = 0
    quiz.forEach(x => {
        score = score + (x.correct_answer === x.userAnswer ? 1 : 0)
    })
    
    const mainScreen = (
        <div className="Main">
            {quizElements}
            <div className="result">
                {result ? <span className="score">{`You scored ${score}/${quiz.length} correct answers `}</span> : ""}
                <button onClick={submit}>{result ? "Play Again" : "Check Answers"}</button>
            </div>
        </div>
    )
    
    const waitScreen = (
        <div className="wait-screen">
            <h2>Quizzical</h2>
            <button onClick={() => setScreen("m")}> 
                Start 
            </button>
        </div>
    )
    
    return (
        <div>
            {screen === "m" ? mainScreen : waitScreen}
        </div>
    )
}
