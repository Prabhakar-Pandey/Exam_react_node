import React from 'react';
import {render} from 'react-dom';

import QuestionComponent from './components/QuestionComponent'
import Result from './components/Result';
import GenericComponent from './components/GenericComponent';
import AdminForm from './components/AdminForm'

function App(){
    const [question,setQuestion]=React.useState("")
    const [options,setOptions]=React.useState([]);
    const [questionIndex,setQuestionIndex]=React.useState(null)
    const [status,setStatus]=React.useState(null)
    const fetchData = async () => {
        // Make API call here
        
        const data = await (await fetch('http://localhost:9999/getQuestions')).json();
        if(data.question){
            setQuestion(data.question.question);
            setOptions(data.question.options);
            setQuestionIndex(data.questionIndex);
        }
        setStatus(data.state)
        
        console.log('API call executed', data);
        // Call the fetchData function again after 10 minute
        setTimeout(fetchData, 10000);
    }
    
      
      // Initial API call
      React.useEffect(()=>{
        fetchData();
      },[])
      
      console.log(status)
      return (
        <div>
            {/* <AdminForm /> */}
          {status === "EXAM_COMPLETED" && <Result />}
          {status === "NOT_STARTED" && <GenericComponent status={status} msg="Exam will start in a while" />}
          {status === "STARTED" && <QuestionComponent questionIndex={questionIndex} question={question} options={options} />}
          {status === "LOADING_TIME" && <GenericComponent status={status} msg="Preparing Questions" />}
        </div>
      );
}

render(
    <App />
    , document.getElementById('app'));