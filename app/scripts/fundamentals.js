'use strict';
//new variables let and const -------
{
    for (let i = 0; i < 20; i++) {
        let div = document.createElement('div');
        div.onclick = () => {
            console.log('you clicked on a box #' + i);
        };

        document.getElementsByTagName('section')[0].appendChild(div);
    }
}
//template string -------
// {
    function createEmail(firstName, purchasePrice) {
        let shipping = 5.95;
        console.log(
            `Hello ${firstName}, thanks for buying from us !
                            Total: $${purchasePrice}      
                            Shipping: $${shipping}`
        );
    }
// }
// spread operator -------
{
    let cats = ['Tabby', 'Siamese', 'Persian'];
    let dogs = ['Golden', 'Pug', 'Dog'];

    let animals = ['Whale', 'Giraffe', ...cats, 'Snake', ...dogs];

    // console.log(animals);
}
//object methods -------
{
    let cat = {
        meow(times) {
            console.log("meow".repeat(times));
        },
        purr(times) {
            console.log("purr".repeat(times));
        },
        snore(times) {
            console.log("snore".repeat(times));
        }
    };
}
//arrow function and scope of arrow function -------
{
    let studentList = (students) => {
        console.log(students);
    };
    // studentList(['First', 'Second', 'Third']);

    let person = {
        first: "Doug",
        actions: ['bike', 'hike', 'ski', 'surf'],
        printActions() {
            this.actions.forEach((action) => {
                let str = this.first + " likes to " + action;
                console.log(str);
            });
        }
    };
// person.printActions();
}
//destructing -------
    let [variable1, , , variable4] = ['Spokane', 'Boston', 'Los Angeles', 'Seattle', 'Portland'];
    // console.log(variable1, variable4);
    let sandwich = {
        title: 'Reuben',
        price: 7,
        description: `Cleveland's favorite sandwich`,
        ingredients: ['bread', 'corned beef', 'dressing', 'sauerkraut', 'cheese']
    };
    // let {title, ingredients} = sandwich;
    // console.log(title, ingredients);

    function vacationMarketing({title, description}) {
        return `Come to ${title} , and do ${description}`;
    }

// console.log(vacationMarketing(sandwich));
//generators -------
/*
    function* director() {
        yield "Tree";
        yield "Two";
        yield "One";
        yield "Action";
    }

    let action = director();

    console.log(action.next().value);
    console.log(action.next());
    console.log(action.next());
    console.log(action.next());
    console.log(action.next());
*/
    function* eachItem(arr) {
        for (let i = 0; i < arr.length; i++) {
            yield arr[i];
        }
    }

    let letters = eachItem(`abcdefg`.split(''));
    // console.log(letters);
    let abcs = setInterval(function () {
        let letter = letters.next();
        if (letter.done) {
            clearInterval(abcs);
            // console.log("Now i know my ABC's");
        } else {
            // console.log(letter.value);
        }
    }, 500);
//classes -------
class Vehicle {

    constructor(description, wheels) {
        this.description = description;
        this.wheels = wheels;
    }
    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels.`);
    }
}
const coolSkiVan = new Vehicle(`cool ski van`, 4);
coolSkiVan.describeYourself();

class SemiTrack extends Vehicle {
    constructor() {
        super("semi truck", 18);
    }
}

const groceryStoreSemi = new SemiTrack();
groceryStoreSemi.describeYourself();
