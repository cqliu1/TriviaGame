$(document).ready(function() {
	// variables
	var right;
	var wrong;
	var timer;
	var countdown;
	var timeLeft;
	var currentQuestion;

	var questions = [];

	questions.push({
		question: "",
		answers:["","","",""],
		correctAnswer: 0
	});

	questions.push({
		question: "",
		answers:["","","",""],
		correctAnswer: 0
	});

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });

	// questions.push({
	// 	question: "",
	// 	answers:["","","",""],
	// 	correctAnswer: 0
	// });


	// functions
	function startGame() {
		right = 0;
		wrong = 0;
		currentQuestion = 0;

		displayQuestion();

		$("#game").show();
		$("#game-over").hide();
	}

	function displayQuestion() {
		$("#question").html(questions[currentQuestion].question);
		var answers = questions[currentQuestion].answers;

		for(var i = 0; i < answers.length; i++) {
			$("#"+i).html(questions[currentQuestion].answer).removeClass("list-group-item-success list-group-item-danger");
		}

		timer = setTimeout(function() {
			displayAnswer(-1);
		},11000);

		timeLeft = 10;
		updateTimer();

		countdown = setInterval(function() {
			timeLeft--;
			updateTimer();
		},1000);
	}

	function displayAnswer(id) {
		clearInterval(timer);
		clearInterval(countdown);
		var correct = questions[currentQuestion].correctAnswer;

		if(parseInt(id) === correct) {
			right++;
			$("#"+id).addClass("list-group-item-success");
		}
		else {
			wrong++;
			$("#"+correct).addClass("list-group-item-success");
			$("#"+id).addClass("list-group-item-danger");
		}
		
		timer = setTimeout(function() {
			nextQuestion();
		}, 5000);
	}

	function nextQuestion() {
		currentQuestion++;
		if(currentQuestion < questions.length) {
			displayQuestion();
		} else {
			endGame();
		}
	}

	function updateTimer() {
		if(timeLeft === 0) {
			$("#timer").html("Time's up!");
		} else {
			$("#timer").html("Time remaining: " + timeLeft + (timeLeft == 1 ? " second" : " seconds"));
		}
	}

	function endGame() {
		$("#right").html(right);
		$("#wrong").html(wrong);
		$("#game").hide();
		$("#game-over").show();
	}

	// click event listeners
	$(".list-group-item").on("click", function() {
		displayAnswer($(this).attr("id"));
	});

	$("#start").on("click", function() {
		$("#start-game").hide();
		startGame();
	});

	$("#restart").on("click", function(){
		startGame();
	});

	$("#game").hide();
	$("#game-over").hide();
});