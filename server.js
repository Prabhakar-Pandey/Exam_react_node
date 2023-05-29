var express = require('express');
var bodyParser = require('body-parser');


app = express();
var http = require('http');
app.set('port', (process.env.PORT || 9999));
app.use(express.static('public'));
app.use(bodyParser.json());
const getQuestions = require("./getQuestion");
const questionFactory = require('./questionSet');


//app.use('/js', express.static(__dirname + '/build'));

var engines = require('consolidate');

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var cors = require('cors')

var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

app.use(cors())


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/getQuestions', function(req, res) {
    res.send(getQuestions.stateInfo);
});

app.post('/setNewEaxm', function(req, res) {
    const payload = req.body
    getQuestions.initialize(payload)
    res.send({success:"true",payload});
});

const getCountOfEqualValues = (array1, array2) => {
    let count = 0;
    array1.map((item,index)=>{
        if(array2[index]){
            if(item.rightOptionId==array2[index]){
                count++;
            }
        }
        
    })
  
    // Return the count of values in filteredArray2
    return count;
  };

const getResultObj = (array1, array2) => {
    const resultObj = []
    array1.map((item,index)=>{
        let obj = {}
        obj.selectedAnswer = array2[index]
        obj.options = item.options;
        obj.rightAnswer = item.rightOptionId;
        obj.question = item.question;
        if(array2[index]){
            if(item.rightOptionId==array2[index]){
               
                obj.result = "Correct"
            }else{
                obj.result = "Wrong"
            }
        }else{
                obj.result = "Skipped"
        }
        resultObj.push(obj)
    })
    return resultObj;
}

app.post('/getResult',(req,res)=>{
    const questionLength = questionFactory.length;
    //console.log(questionFactory)
    const answers = req.body.answer;
    const rightAnswer = getCountOfEqualValues(questionFactory,answers);
    const resultsObj = getResultObj(questionFactory,answers);
    let percent = (rightAnswer / questionLength) * 100;
    if(percent===0){
        percent = "Zero"
    }
    res.send({percent, resultsObj})
})

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('I am running on Port' + app.get('port'));
});
