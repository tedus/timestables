// set up time limit
var timeLimit = 3;
var cntr = timeLimit;
var num1 = 0;
var num2 = 0;
var answer = 0;
var timeOutVar;
var checkAnswer;

// the gogo button function
function tt_btn() {

	d3.select("#buildArea").html("");

	d3.select("#buildArea").append("p").text("GO!").attr("id", "timer");
	d3.select("#buildArea").append("p").attr("id", "question");
	d3.select("#buildArea").append("input").attr("id", "answer").attr("size",3);

		// play play play area
	d3.select("#buildArea").append("p").attr("id", "play");
	var bin = 10101101010101010100101010001110011;
	var badboy = base62.encode(bin);
	d3.select("#play").text("Answer = " + badboy);


	// kick it off
	askQuestion();
	
	//add listener to answer input
		d3.select("#answer").on("keydown", function() {
    	if (d3.event.keyCode === 13) {
        	checkAnswer();
    	}
	});


}

// ask a question
function askQuestion() {

	myStopFunction();	//stop the current timer
	cntr = timeLimit;	//reset timer
	countDown(cntr);	// call count down

	num1 = Math.floor(Math.random()*11+2);
	num2 = Math.floor(Math.random()*11+2);
	correctANS =num1 * num2;

	d3.select("#question").text(num1 + " x " + num2);
	d3.select("#answer").node().focus();
}

// check answer
function checkAnswer() {
	myStopFunction();	//stop the current timer
	answer = d3.select("#answer").property("value");

	if (answer == correctANS) {
		d3.select("#timer").text("Go!");
		askQuestion();
	} else {
		d3.select("#timer").text("Answer = " + correctANS);
	}

	// clear input
	document.getElementById("answer").value = "";

}

// count down timer funtion
function countDown(cntr) {
 	timeOutVar = setTimeout(function() {
    	d3.select("#timer").text(cntr);          
    	if (cntr-- > 0) {
    		countDown(cntr);
    	} else {
    		d3.select("#timer").text("Answer = " + correctANS);
    		// askQuestion();
    	}
	}, 1000)
}

// end the timer function

function myStopFunction() {
  clearTimeout(timeOutVar);
}


const base62 = {
  charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split(''),
  encode: integer => {
    if (integer === 0) {
      return 0;
    }
    let s = [];
    while (integer > 0) {
      s = [base62.charset[integer % 62], ...s];
      integer = Math.floor(integer / 62);
    }
    return s.join('');
  },
  decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};