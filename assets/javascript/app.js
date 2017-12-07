$(document).ready(function() {
	// variables
	var right;
	var wrong;
	var timer;
	var countdown;
	var timeLeft;
	var currentQuestion;
	var disabled;

	var questions = [];

	questions.push({
		question: "Which phrase does the Evil Queen in 'Snow White' actually say?",
		answers:["Magic mirror on the wall, who is the fairest one of all?","Magic mirror on the wall, who is the wisest one of all?","Magic mirror on the wall, who is the swiftest one of all?","Magic mirror on the wall, who is the strongest one of all?"],
		correctAnswer: 0,
		img:"question1.jpg"
	});

	questions.push({
		question: "What did Jasmine steal from the marketplace?",
		answers:["A loaf of bread","A rug","A sword","An apple"],
		correctAnswer: 3,
		img:"question2.jpg"
	});

	
	questions.push({
		question: "How many sisters does Ariel have?",
		answers:["8","3","6","12"],
		correctAnswer: 2,
		img:"question3.jpg"
	});

	questions.push({
		question: "What is Boo's real name?",
		answers:["Eva","Mary","Jenny","Olive"],
		correctAnswer: 1,
		img:"question4.jpg"
	});

	questions.push({
		question: "How many eggs does Gaston eat for breakfast?",
		answers:["One Dozen","Two Dozen","Five Dozen","Ten Dozen"],
		correctAnswer: 2,
		img:"question5.jpg"
	});

	questions.push({
		question: "Who’s the voice of Esmeralda in The Hunchback of Notre Dame?",
		answers:["Oprah","Emma Thompson","Ellen Degeneres","Demi Moore"],
		correctAnswer: 3,
		img:"question6.jpg"
	});

	questions.push({
		question: "What color is the rim of the scuba diver's goggles?",
		answers:["Yellow","Green","Blue","Red"],
		correctAnswer: 1,
		img:"question7.jpg"
	});

	questions.push({
		question: "How many bows are on the skirt of Cinderella's pink dress?",
		answers:["Two","Three","Four","Five"],
		correctAnswer: 0,
		img:"question8.jpg"
	});

	questions.push({
		question: "What are the names of the mortal couple that adopts Hercules?",
		answers:["Clio and Calliope","Philocetes and Philodendra","Amphitryon and Alcemene","Alcestis and Admetus"],
		correctAnswer: 2,
		img:"question9.jpg"
	});

	questions.push({
		question: "What is Jane's last name?",
		answers:["Seymore","Porter","Williams","Clayton"],
		correctAnswer: 1,
		img:"question10.jpg"
	});

	// functions
	var startGame = function() {
		right = 0;
		wrong = 0;
		currentQuestion = 0;

		displayQuestion();

		$("#game").show();
		$("#game-over").hide();
	}

	var displayQuestion = function() {
		disabled = false;
		$("#image").html($("<img src='assets/images/" + questions[currentQuestion].img + "' >"));
		$("#question").html("<h3> " + questions[currentQuestion].question + "</h3>");
		var answers = questions[currentQuestion].answers;

		for(var i = 0; i < answers.length; i++) {
			$("#"+i).html(answers[i]);
			$("#"+i).removeClass("list-group-item-success list-group-item-danger");
		}

		timeLeft = 10;
		updateTimer();

		countdown = setInterval(function() {
			timeLeft--;
			updateTimer();
		},1000);

		timer = setTimeout(function() {
			displayAnswer(-1);
		},10000);
	}

	var displayAnswer = function(id) {
		disabled = true;
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
		}, 2000);
	}

	var nextQuestion = function() {
		currentQuestion++;
		if(currentQuestion < questions.length) {
			displayQuestion();
		} else {
			endGame();
		}
	}

	var updateTimer = function() {
		if(timeLeft === 0) {
			$("#timer").html("Time's up!");
		} else {
			$("#timer").html("Time remaining: " + timeLeft + (timeLeft == 1 ? " second" : " seconds"));
		}
	}

	var endGame = function() {
		$("#right").html(right);
		$("#wrong").html(wrong);
		$("#game").hide();
		$("#game-over").show();
	}

	// click event listeners
	$(".list-group-item").on("click", function() {
		if(!disabled)
			displayAnswer($(this).attr("id"));
	});

	$("#start").on("click", function() {
		$("#start-game").hide();
		startGame();
	});

	$("#restart").on("click", function(){
		startGame();
	});


	// hides divs before start of game
	$("#game").hide();
	$("#game-over").hide();
});