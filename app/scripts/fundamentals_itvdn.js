"use strict";
//ECMA 5 OOP
//****************************************************************

// -------
//functional OOP
function Rectangle(w, h) {
    this.width = w;
    this.height = h;

    this.getArea = function () {
        return this.width * this.height;
    }
}

const rect = new Rectangle(100, 50);
//console.log(rect.getArea());
// -------
//prototype OOP
function RectangleProto(w, h) {
    this.width = w;
    this.height = h;
}

RectangleProto.prototype.getArea = function () {
    return this.width * this.height;
};

RectangleProto.prototype.name = "RECTANGLE";

const rec1 = new RectangleProto(100, 50);
const rec2 = new RectangleProto(5, 50);

// console.log(rec1.name);
// console.log(rec2.name);

rec1.name = "1 rectangle"; //changing value only for instance of Rectangle

// console.log(rec1.name);
// console.log(rec2.name);

// -------
//prop Constructor
let myArr = new Array(10);
let myDate = new Date();
let myStr = new String('some string lorem');
const myObj = new Object();
const myFunc = new Function('x', 'y', 'return x + y');

const myCtor = function (x, y) {
    this.y = y;
    this.x = x;
};

const myCtorObj = new myCtor(3, 7);

function showCtor(obj, name) {
    console.log(`Object constructor ${name} it is -> ${obj.constructor} \n`);
}

// showCtor(myArr, 'arr');
// showCtor(myDate, 'date');
// showCtor(myStr, 'str');
// showCtor(myObj, 'obj');
// showCtor(myFunc, 'func');
// showCtor(myCtorObj, 'myCtor instance');

//=======================================
//-------
//Object
// console.log('name' in rec1);

//-------
RectangleProto.prototype.equals = function (otherObj) {
    return (this.width === otherObj.width && this.height === otherObj.height);
};
// console.log(rec1.equals(rec2));
RectangleProto.prototype.compareTo = function (otherObj) {
    if (this.getArea() > otherObj.getArea()) {
        return 1;
    } else if (this.getArea() < otherObj.getArea()) {
        return -1;
    } else {
        return 0;
    }
    // return this.getArea() - otherObj.getArea();
};

//-------
//encapsulation
const MyPreviewClass = function () {

    //private method
    const privateMEthod = function () {
        console.log('private method');
    };

    //public method
    this.publicMethod = function () {
        console.log('public method');
        //here ypu can use private
        privateMEthod();
    };

    return this;
};

let m = new MyPreviewClass();
// m.publicMethod();

//-------
//inheritance
function Human (name) {
    this.name = name;
    this.talk = function () {
        // console.log(`Hello my name is ${this.name} \n`);
    }
}

function Student (name) {
    this.name = name;
    this.school = "CBS School";
}

function Worker (name) {
    this.name = name;
    this.speciality = "Software developer";
}

//create parent object ---
const human = new Human('name');
//inherit human as prototype ---
Student.prototype = human;
Worker.prototype = human;
//

const Alex = new Student('Alex');
const Andrew = new Worker('Andrew');
Alex.talk();
Andrew.talk();

//-------
//polymorphism
function Teacher(name) {
    this.name = name;
    this.speciality = "Teacher";

    this.talk = function () {
        // console.log(`Hello I am a teacher, my name is ${this.name} \n`);
    }
}
Teacher.prototype = human;
const Isaak = new Teacher('Isaak');
Isaak.talk();
