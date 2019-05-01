function Person (name) {
    this.name = name;
}

Person.prototype.myFriendsES5 = function (friends) {

    var arr = friends.map(function (el) {
       return this.name + ' is fr with' + el;
    }.bind(this));
};

Person.prototype.myFriendsES6 = function (friends) {

    const arr = friends.map( el => `${this.name} is fr with ${el}` );
};

/*
* ES6 destructuring
* */
const obj = {
    first: 'John',
    last: 'Dough',
    fullName () {
        return `${this.first} ${this.last}`;
    }
};

const {first, last, fullName: getFullName} = obj;


/*
* ES6 arrays
* */
const objLooksAsArr = {
    0: 'first',
    1: 'sec',
    2: 'third',
    20: 'third',
    length: 50
};
const objToArr = Array.from(objLooksAsArr);

// const boxesArr = [1,2,3,4,5, 'a', 'b', 'c'];
for(const cur of objToArr) {
    // console.log(cur);
}

const ages = [12, 17, 8, 21, 14, 11];
// const fullAge = ages.map((cur) => cur >= 18);
// console.log(ages[fullAge.indexOf(true)]);

const fullAge = ages.findIndex((item, i, arr) => {
    return item >= 18
});
const findAge = ages.find((item, i, arr) => {
    return item >= 18
});

// console.log(findAge);

/*
* ES6 spread operator
* */
function addFourAges(a,b,c,d) {
    return a + b + c + d;
}
const sum1 = addFourAges(18,30,12,21);

const ages1 = [18,30,12,21];
const sum2 = addFourAges.apply(null, ages1);
const sum3 = addFourAges(...ages1);
// console.log(sum1);
// console.log(sum2);
// console.log(sum3);

const arr1 = ['asd', 'sad'];
const arr2 = ['xcv', 'xcv'];
const arr1and2 = [...arr1, 'some 0', ...arr2, 'some 1'];

const nodeList = document.querySelectorAll('.one');
const nodeArr = [...nodeList];
//console.log(nodeArr);

/*
* ES6 rest parameters
* */
function isFullAge5() {
    const argsArr = Array.prototype.slice.apply(arguments);

    argsArr.forEach((cur) => {
        console.log( 2016 - cur >= 18);
    });
}
// isFullAge5(1990,1999,1965);

function isFullAge6(...years) {
    console.log(years);

    years.forEach((cur) => {
        console.log( 2016 - cur >= 18);
    });
}
// isFullAge6(1990,1999,1965);

function isFullAge5_limit(limit) {
    const argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach((cur) => {
        console.log( 2016 - cur >= limit);
    });
}
// isFullAge5_limit(21, 1990,1999,1965);


function isFullAge6_limit(limit, ...years) {

    years.forEach((cur) => {
        console.log( 2016 - cur >= limit);
    });
}
// isFullAge6_limit(21, 1990,1999,1965);

/*
* ES6 default parameters
* */
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName || 'Smith';
    this.nationality = nationality || 'UA';
}
const john = new SmithPerson('John', 1990);
const emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');

function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'UA') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}
// const john6 = new SmithPerson6('John', 1990);
// console.log(john6);

/*
* ES6 Maps
* */
const question = new Map();
question.set('question', 'What is the official name of the JS');
question.set(1, 'ES5');
question.set(2, 'ECMA');
question.set(3, 'ES6');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct answer :D');
question.set(false, 'wrong ! try again');

question.get('question');
question.size;
question.delete(4);
// question.has(4);
// question.clear();
question.forEach((val, key) => {
    // console.log('val: ' + val, 'key: ' + key);
});

for (let [key, val] of question.entries()) {
    // console.log(key, val);

    if (typeof key === 'number') {
        // console.log(key, val);
    }
}

// const ans = parseInt(prompt('Write correct answer'));
// console.log(question.get(question.get('correct') === ans));

/*
* ES6 Class
* */
const Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calcAge = function () {
    const age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

const Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5.apply(this, arguments);

    this.olympicGames = olympicGames;
    this.medals = medals;
};
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.greatestGame = function () {
    console.log(this.olympicGames);
};

const john5 = new Person5('John', 1990, 'teacher');
const athlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
// console.log(athlete5);
// console.log(john5);

class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calcAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    
    static greeting() {
        console.log('Hi there !');
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    greatestGame() {
        console.log(this.olympicGames);
    }
}

const john6 = new Person5('John', 1990, 'teacher');
const athlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
// console.log(athlete6);

/*
* --- code challenge ---
* */
class TownlElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownlElement {
    constructor(name, buildYear, threes, square) {
        super(name, buildYear);
        this.threes = threes;
        this.square = square;
    }

    treeDensity() {
        return this.threes / this.square;
    }

    parkDescription() {
        return `${this.name} has a tree density of ${this.treeDensity()} threes per square km.`
    }
}

class Street extends  TownlElement {
    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    streetDescription() {
        return `${this.name}, build in ${this.buildYear}, is a ${this.size} street.`
    }
}

const parks = [
    new Park('P-First', 1911, 5127, 20),
    new Park('P-Second', 1961, 817, 7),
    new Park('P-Third', 2018, 205, 30),
];

const streets = [
    new Street('S-f', 1901, 7, 'huge'),
    new Street('S-s', 1955, 3, 'big'),
    new Street('S-t', 1997, 2),
    new Street('S-t', 1999, 1, 'small'),
];

function parksAverageAge(parksArr) {
    let sumAge = parksArr.reduce((prev, item) => prev + ( new Date().getFullYear() - item.buildYear) ,0);
    return `Our ${parksArr.length} parks have an average age of ${sumAge / parksArr.length} years.`;
}

function streetTotalAverageLength(streetArr) {
    const sumLength = streetArr.reduce((prev, item) => prev + item.length,0);
    return `Our ${streetArr.length} streets have a total length of ${sumLength} km, with an average length ${sumLength / streetArr.length} km.`;
}

parksReportLog(parks);
function parksReportLog(parksArr) {
    let reportStr = `--- Parks report --- \n${parksAverageAge(parksArr)}\n`;

    for (let i = 0; i < parksArr.length; i++) {
        reportStr += parksArr[i].parkDescription() + "\n";
    }

    reportStr += `${parksArr.find((item) => item.threes > 1000).name} has more than 1000 threes.`;

    console.log(reportStr);
}

streetReportLog(streets);
function streetReportLog(streetArr) {
    let reportStr = `--- Street report --- \n${streetTotalAverageLength(streetArr)}\n`;

    for (let i = 0; i < streetArr.length; i++) {
        reportStr += streetArr[i].streetDescription() + "\n";
    }

    console.log(reportStr);
}

/**/










