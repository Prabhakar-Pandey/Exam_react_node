import React from 'react';
import './QuestionComponent.css';
import {setLocalStorageItem} from '../utilityMethods';

class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      answers:[]
    };
  }

  handleOptionChange(option, index){
    this.setState({ selectedOption: option });
    let answer = [...this.state.answers];
    answer[index]=option;
    this.setState({answers:answer},()=>{
        setLocalStorageItem('answer',answer)
        console.log(this.state.answers);
    })
  };

  componentDidUpdate(prevProps) {
    // Compare previous props with current props
    if (this.props.question !== prevProps.question) {
      // Perform actions when `someProp` has changed
      this.setState({ selectedOption: null });
      // Perform any additional logic or update state
    }
  }

  render() {
    const { question, options } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="question-component">
        <h2 className="question">{question}</h2>
        <ul className="options">
          {options.map((option, index) => (
            <li key={index}>
              <label className="option-label">
                <input
                  type="radio"
                  value={option.desc}
                  checked={selectedOption === option.id}
                  onChange={() => this.handleOptionChange(option.id,this.props.questionIndex)}
                  className="option-radio"
                />
                {option.desc}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default QuestionComponent;
