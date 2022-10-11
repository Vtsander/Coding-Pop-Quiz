var myQuestions = [
    {
        question: "Which is not a web browser?",
        answers:{
            a: 'Line',
            b: 'Opera',
            c: 'Mozilla'
        },
        correctAnswer: 'a'
    },
    {
		question: "What does API stand for?",
		answers: {
			a: 'Airway Programming Intern',
			b: 'Application Programming Interface',
			c: 'Application Purpose Incorporated'
		},
		correctAnswer: 'b'
	},
    {
        question: "What is an example of an API?",
        answers:{
            a: 'CSS',
            b: 'HTML',
            c: 'jQuery'
        },
        correctAnswer: 'c'
    },
	{
		question: "What does DOM stand for?",
		answers: {
			a: 'Detail Oriented Model',
			b: 'Design Object Meter',
			c: 'Document Object Model'
		},
		correctAnswer: 'c'
	},
    {
        question: "What is not an example of what we use Web APIs for? ",
        answers:{
            a: 'Opening an application',
            b: 'Creating and adding elements',
            c: 'Adding and removing attributes and styles'
        },
        correctAnswer: 'a'
    },
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

document.getElementById('timer').innerHTML =
  01 + ":" + 11;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
    return
  }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;
		// for each question...
		for(var i=0; i<questions.length; i++){
			// first reset the list of answers
			answers = [];
			// for each available answer...
			for(letter in questions[i].answers){
				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}
			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}
		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}
	function showResults(questions, quizContainer, resultsContainer){
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		// for each question...
		for(var i=0; i<questions.length; i++){
			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'red';
			}
		}
		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
	}
	// show questions right away
	showQuestions(questions, quizContainer);
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}