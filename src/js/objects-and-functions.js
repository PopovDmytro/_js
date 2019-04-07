//function constructor
/*
const Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person.prototype.calculateAge = function () {
    console.log(2019 - this.yearOfBirth);
};

const john = new Person('John', 1999, 'teach');
const jane = new Person('Jane', 1969, 'designer');
const mark = new Person('Mark', 1948, 'retired');
*/

//Object.create
/*
const personProto = {
    calcAge: function () {
        console.log(2019 - this.yearOfBirth);
    }
};

const john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1190;
john.job = 'teacher';

const jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
});
*/

//Closures
/*
function retirement(retirementAge) {

    let a = ' years left until retirement.';

    return function (yearOfBirth) {
        let age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

const returementUS = retirement(66);

*/

//bind, call, apply

/*
const john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if(style === 'formal') {
            console.log(`Good ${timeOfDay}, Ladies and gentelmans! I'm ${this.name}, I'am ${this.job}, and I'am ${this.age} years old.`);
        } else if(style === 'friendly') {
            console.log(`Hey! What's up? , I'm ${this.name}, I'am ${this.job}, and I'am ${this.age} years old. Have a nice ${timeOfDay}.`);
        }
    }
};

const emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};
*/

// john.presentation('formal', 'morning');

// john.presentation.call(emily, 'friendly', 'afternoon');

/*
const johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('evening');
johnFriendly('night');

const emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');
*/


//Challenge ---
(function () {

    /*Questions data*/
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.log = function () {
        console.log(this.question);

        for(let i = 0; i < this.answers.length; i++) {
            console.log(`${i} : ${this.answers[i]}`);
        }
    };

    Question.prototype.isCorrectAnswer = function (answer, score) {

        if (this.correctAnswer === parseInt(answer)) {
            console.log('Correct answer !');
            console.log(`You current score is: ${score}`);
            console.log('------------------------');
            return 1;
        }

        console.log('Wrong answer !');
        console.log(`You current score is: ${score}`);
        console.log('------------------------');
    };

    const questions = [
        new Question('Question first ?', ['first', 'second', 'third'], 0),
        new Question('Question second ?', ['first', 'second'], 1),
        new Question('Question third ?', ['first', 'second', 'third', 'fourth'], 2)
    ];
    /**/

    /*
    //My solution
    const askQuestion = answerOnQuestion(questions);
    askQuestion();

    function answerOnQuestion(questions) {
        let currentScore = 0;

        return function () {
            const q = questions[getRandomArrN(questions)];
            q.log();

            const answer = prompt('Please select the correct answer (just type the number).');

            if(answer === 'exit' || answer === 'close') {
                console.log(`You current score is: ${currentScore}`);
                console.log('------------------------');
                return console.log('The game is over!');
            } else {
                currentScore = q.correctAnswer === parseInt(answer) ? currentScore + 1 : currentScore;
                q.isCorrectAnswer(answer, currentScore);
                askQuestion();
            }
        };
    }
    //
    */

    const keepScore = score();
    answerOnQuestion(questions);

    function score() {
        let sc = 0;
        return function (correct) {
            if(correct) {
                sc++;
            }
            return sc;
        }
    }

    function answerOnQuestion(questions) {

        const q = questions[getRandomArrN(questions)];
        q.log();

        const answer = prompt('Please select the correct answer (just type the number).');

        if(answer === 'exit' || answer === 'close') {
            console.log(`You current score is: ${keepScore()}`);
            console.log('------------------------');
            return console.log('The game is over!');
        } else {
            q.isCorrectAnswer(answer, keepScore(q.correctAnswer === parseInt(answer)));
            answerOnQuestion(questions);
        }
    }

    //helpers
    function getRandomArrN(arr) {
        return Math.floor(Math.random() * arr.length);
    }
    
})();







