const questionFactory = require('./questionSet');
  
  const examConfiguration = {
    startTime: "2023-05-29T10:47:00",
    loadingTime: "2023-05-29T10:45:00",
    endTime: "2023-05-28T14:59:00",
    eachQuestionTime: 30000
  };
  
  const utilities = {
    isTimeGreaterThanCurrent: function (inputDateTime = "2023-05-28T13:30:00") {
      const inputDate = new Date(inputDateTime);
      inputDate.setHours(inputDate.getHours() - 5);
      inputDate.setMinutes(inputDate.getMinutes() - 30);
      // Get the current date and time
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 5);
      currentDate.setMinutes(currentDate.getMinutes() - 30);
      console.log(inputDateTime, inputDate, currentDate);
      // Compare the input date and time with the current date and time
      if (inputDate > currentDate) {
        return true;
      }
      return false;
    }
  };
  
  const STATES = ["STARTED", "LOADING_TIME", "NOT_STARTED"];
  
  function QuestionController(examConfiguration) {
    this.index = 0;
    this.initailizeFlag = false;
    this.state = "NOT_STARTED";
    this.initializedQuestion = null;
    this.questionIndex = null;
    const displayQuestion = (timer = 50000) => {
      let self = this;
      this.initializedQuestion = setTimeout(() => {
        self.index = self.index + 1;
        displayQuestion(examConfiguration.eachQuestionTime);
      }, timer);
    };
    return {
      getCurrentState: () => {
        if (this.state === "EXAM_COMPLETED") {
          return { state: this.state, questionIndex: this.questionIndex };
        }
        if (this.index + 1 > questionFactory.length) {
          this.state = "EXAM_COMPLETED";
          // reset everything that matters
          this.index = 0;
          this.questionIndex = null;
          this.initailizeFlag = false;
          clearTimeout(this.initializedQuestion);
          //return { state: this.state, questionIndex: this.questionIndex };
        } else if (
          !utilities.isTimeGreaterThanCurrent(examConfiguration.startTime)
        ) {
          this.state = "STARTED";
          this.questionIndex = this.index;
          if (!this.initailizeFlag) {
            // this will initialize only once
            this.initailizeFlag = true;
            displayQuestion(examConfiguration.eachQuestionTime);
          }
        } else if (
          !utilities.isTimeGreaterThanCurrent(examConfiguration.loadingTime)
        ) {
          this.state = "LOADING_TIME";
        }
        console.log(this.state, this.questionIndex, "question controller");
        return { state: this.state, questionIndex: this.questionIndex };
      }
    };
  }
  
  class getQuestions {
    constructor(configurations) {
      console.log("I am loaded.");
      this.intervalValue = null;
      this.configurations = configurations;
      this.initialize();
      this.stateInfo = null;
    }
  
    initialize(configurationForInitialize) {
      let questionController = new QuestionController(configurationForInitialize || this.configurations);
      if(this.intervalValue){
        clearInterval(this.intervalValue);
      }
      this.intervalValue = setInterval(() => {
        const { state, questionIndex } = questionController.getCurrentState();
        this.stateInfo = {
          state,
          questionIndex,
          question: questionFactory[questionIndex]
        };
        console.log({ state, questionIndex });
      }, 1000);
    }
  }
  
  module.exports = new getQuestions(examConfiguration);
  