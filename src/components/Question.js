import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    //reset timeRemaining if it reaches 0
    if(timeRemaining === 0){
      onAnswered(false)
      setTimeRemaining(10)
      return // exit
    }
    // timer to count down every 1 second
    const timer = setTimeout(() => {
      console.log("this is time remaining in useeffect funcion", timeRemaining)
      setTimeRemaining((timeRemaining) => timeRemaining - 1)
    }, 1000)
    //cleanup 
    return () => clearTimeout(timer)
  }, [timeRemaining, onAnswered])
  // run the effect every time timeRemaining changes
  // onAnswered is also a dependency, even though it doesn't change


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
