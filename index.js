/*

	I just threw this together for @Mikarific#4167

	Gimkit hack by Drew Snow

	Fri Aug 23 2019 14:57:53 GMT-0700 (Pacific Daylight Time)

*/

function Exploit () {

	this.getSpans = () => document.getElementsByTagName('span');

	this.questions = window.questions;

	this.clickText = function (text) {
		let spans = this.getSpans();

		for (let i = 0; i < spans.length; i++)
			if (text == spans[i].textContent.trim()) return spans[i].click();
    };

	this.correctAnswer = (questions) => questions.answers.filter(e => e.correct)[0];

	this.answerQuestion = function () {
		let spans = this.getSpans();

        for (let i = 0; i < spans.length; i++) {
            let text = spans[i].textContent.trim();

            for (let j = 0; j < this.questions.length; j++) {
                let correct = this.correctAnswer(this.questions[j]);

                if (this.questions[j].text.trim() == text) return this.clickText(correct.text);
            }
        }
    };

}

let Session = new Exploit();

setInterval(() => {

	// Find the answer and click it every 100msg
	Session.answerQuestion();

}, 100);
