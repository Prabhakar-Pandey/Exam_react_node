import React from 'react';
import './Result.css'; // Import custom CSS file for styling
import {getLocalStorageItem} from '../utilityMethods';


const Quiz = ({ data }) => {
    return (
      <div className="quiz">
        {data.map((question, index) => (
          <div key={index} className="question">
            <h3>{question.question}</h3>
            <ul className="options">
              {question.options.map((option) => (
                <li
                  key={option.id}
                  className={`option ${
                    option.id === question.selectedAnswer ? "selected" : ""
                  } ${option.id === question.rightAnswer ? "correct" : ""}`}
                >
                  {option.desc}
                </li>
              ))}
            </ul>
            <p className={`result ${question.result.toLowerCase()}`}>
              {question.result}
            </p>
          </div>
        ))}
      </div>
    );
  };
  

const Result = (props) => {
    console.log("Result loaded")
    const [resultPercent,setResultPercent] = React.useState(null)
    const [resultData,setResultData] = React.useState([])
    React.useEffect(async ()=>{
        const answer = getLocalStorageItem('answer');
        if(answer){
            const payload = {
                answer: answer,
              };
            const result = await (await fetch('http://localhost:9999/getResult', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              })).json();
              setResultPercent(result)
              setResultData(result.resultsObj)
              console.log(answer,result,"<<<<<")
        }
        
    },[])

    return (
      <div className="result-container">
        <h2 className="result-title">Result</h2>
        <div className="result-content">
          {/* Display the result value */}
          {
            resultPercent && resultPercent.percent ? <p className="result-value">{typeof resultPercent.percent !== "string" ? parseInt(resultPercent.percent):resultPercent.percent}</p> : <p className="result-value">Unable to fetch result</p>
          }
        </div>
        {
            resultData.length && <Quiz data={resultData}/>
          }
      </div>
    );
  };
  
  export default Result;