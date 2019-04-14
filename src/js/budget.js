//BUDGET CONTROLLER
const budgetController = (function () {

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if(totalIncome) {
            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
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

        data.totals[type] = Math.round(sum * 100) / 100;
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
        deleteItem (type, id) {
            const ids = data.allItems[type].map((item, i) => {
                return item.id;
            });
            const index = ids.indexOf(id);

            if(~index) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget () {
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //Calculate the budget: income - expenses
            data.budget = Math.round((data.totals.inc - data.totals.exp) * 100) / 100;
            //Calculate the percentage of income that we spent
            if(data.totals.inc) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentage () {
            data.allItems.exp.forEach((item, i) => {
                item.calcPercentage(data.totals.inc);
            });
        },
        getPercentage () {
            return data.allItems.exp.map((item, i) => {
                return item.getPercentage();
            });
        },
        getBudget () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
        ,test() {
            return data;
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
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    const formatNumber = function  (num, type) {
        num = Math.abs(num);
        num = num.toFixed(2);

        const numSplit = num.split('.');
        let int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }

        let dec = numSplit[1];
        let sign = type === 'exp' ? '-' : '+';
        return sign + ' ' + int + '.' + dec;
    };

    function nodeListForEach (list, callback) {
        for(let i = 0; i < list.length; i++) {
            callback(list[i], i, list);
        }
    }

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
                    <div class="item clearfix" id="inc-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value)}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            } else if(type === 'exp') {
                el = DOMstrings.expenseContainer;
                html = `
                    <div class="item clearfix" id="exp-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value)}</div>
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
        deleteListItem (id) {
            const el = document.getElementById(id);
            el.parentNode.removeChild(el);
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

            let type = obj.budget > 0 ? 'inc' : 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(~obj.percentage) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages (percentages) {
            const fields = document.querySelectorAll(DOMstrings.expensePercLabel);

            nodeListForEach(fields, (item, i) => {
                if(percentages[i]) {
                    item.textContent = percentages[i] + '%';
                } else {
                    item.textContent = '---';
                }
            });
        },
        displayMonth () {
            const now = new Date();

            const year = now.getFullYear();

            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const month = now.getMonth();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        changeType () {
            const fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}, ${DOMstrings.inputType}`);
            nodeListForEach(fields, (item, i) => {
                item.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
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
            //Calculate and update percentage
            updatePercentage();
        }
    };

    const updatePercentage = function () {

        //Calculate percentages
        budgetCtrl.calculatePercentage();
        //Read percentages from the budget controller
        const percentages = budgetCtrl.getPercentage();
        //Update the UI with new percentages
        UICtrl.displayPercentages(percentages);
    };

    const ctrlDeleteItem = function (e) {
        const itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            const splitID = itemID.split('-'),
            type = splitID[0],
            id = parseInt(splitID[1]);

            //delete the item from the data structure
            budgetCtrl.deleteItem(type, id);
            //delete item from the UI
            UICtrl.deleteListItem(itemID);
            //Update and show the new budget
            updateBudget();
            //Calculate and update percentage
            updatePercentage();
        }
    };

    return {
        init () {
            UICtrl.displayMonth();
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
