//BUDGET CONTROLLER
const budgetController = (function () {

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    const calculateTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach((item) => {
            sum += item.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem (type, des, val) {
            let newItem, id;

            //Create new id
            if(data.allItems[type].length) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if(type === 'exp') {
                newItem = new Expense(id, des, val);
            } else if(type === 'inc') {
                newItem = new Income(id, des, val);
            }
            data.allItems[type].push(newItem);

            return newItem;
        },
        calculateBudget () {
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //Calculate the percentage of income that we spent
            if(data.totals.inc) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },
        getBudget () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    };
})();

//UI CONTROLLER
const UIController = (function () {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };

    return {

        getInput () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc / exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem (obj, type) {
            //Crete HTML string with placeholder text
            let html, el;
            if(type === 'inc') {
                el = DOMstrings.incomeContainer;
                html = `
                    <div class="item clearfix" id="income-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${obj.value}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            } else if(type === 'exp') {
                el = DOMstrings.expenseContainer;
                html = `
                    <div class="item clearfix" id="expense-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${obj.value}</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            }
            //Insert the HTML to the DOM
            document.querySelector(el).insertAdjacentHTML('beforeend', html);

        },
        clearFields () {
            const fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
            const fieldsArr = Array.prototype.slice.apply(fields);
            fieldsArr.forEach((item, i) => {
                item.value = '';
            });
            fieldsArr[0].focus();
        },
        displayBudget (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

            if(~obj.percentage) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        getDOMStrings () {
            return DOMstrings;
        }
    };
})();

//GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    const setupEventListeners = function () {
        const DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if(e.key === 'Enter') {
                ctrlAddItem(e);
            }
        });
    };

    const updateBudget = function () {
        //Calculate the budget
        budgetCtrl.calculateBudget();
        //Return the budget
        const budget = budgetCtrl.getBudget();
        //Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    const ctrlAddItem = function (e) {
        //Get thw field input data
        const input = UICtrl.getInput();
        if(input.description.trim() && !isNaN(input.value) && input.value) {
            //Add the item to the budget controller
            const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            //Calculate and update budget
            updateBudget();
        }
    };

    return {
        init () {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();
