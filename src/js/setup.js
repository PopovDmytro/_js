//
const names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const sernames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
const fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
const wizardsArr = createWizardObjects(names, sernames, coatColors, eyesColors);
//

// document.querySelector('.setup').classList.remove('hidden');

//select elements
const setup = document.querySelector('.setup'),
    setupClose = setup.querySelector('.setup-close'),
    inputUsername = setup.querySelector('.setup-user-name'),
    setupSimilar = setup.querySelector('.setup-similar'),
    setupWizard = setup.querySelector('.setup-player');

const setupOpen = document.querySelector('.setup-open');

const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
//

setupSimilar.classList.remove('hidden');
setWizardsToBlock(similarWizardTemplate, wizardsArr);

//adding events on setup popup and buttons for popup open / close
setupOpen.addEventListener('click', function (e) {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscKeydownHandler);
});

setupOpen.addEventListener('keydown', function (e) {

    if (e.keyCode === 13){
        setup.classList.remove('hidden');
        document.addEventListener('keydown', popupEscKeydownHandler);
    }
});

setupClose.addEventListener('click', function (e) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscKeydownHandler);
});

setupClose.addEventListener('keydown', function (e) {

    if (e.keyCode === 13){
        setup.classList.add('hidden');
        document.addEventListener('keydown', popupEscKeydownHandler);
    }
});

//adding events for setup wizard look
setupWizard.querySelector('.wizard-coat').addEventListener('click', function (e) {
    const color = getRandomItem(coatColors);
    e.target.style.fill = color;
    setupWizard.querySelector('[name="coat-color"]').value = color;
});

setupWizard.querySelector('.wizard-eyes').addEventListener('click', function (e) {
    const color = getRandomItem(eyesColors);
    e.target.style.fill = color;
    setupWizard.querySelector('[name="eyes-color"]').value = color;
});

setup.querySelector('.setup-fireball-wrap').addEventListener('click', function (e) {
    const color = getRandomItem(fireballColors);
    this.querySelector('input').value = color;
    this.querySelector('.setup-fireball').style.backgroundColor = color;
});

//functions

//adding click event on element to change fill property
function addingClickHandler (dataArr, element) {
    element.addEventListener('click', function (e) {
       e.target.style.fill = getRandomItem(dataArr);
    });
}

//esc key handle
function popupEscKeydownHandler (e) { //
    if (e.keyCode === 27 && document.activeElement !== inputUsername) {
        setup.classList.add('hidden');
        document.removeEventListener('keydown', popupEscKeydownHandler);
    }
}

//get random item from array
function getRandomItem (arr, min = 0, max = arr.length - 1) {
    return arr[randomN(min, max)];
}

//get random between min max number
function randomN (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//create array of wizard objects 
function createWizardObjects(names, sernames, coatColors, eyesColors, amountObjects = 4) {
    const arr = [];
    for(let i = 0; i < amountObjects; i++) {
        const obj = {
            name: `${getRandomItem(names)} ${getRandomItem(sernames)}`,
            coatColor: getRandomItem(coatColors),
            eyesColor: getRandomItem(eyesColors),
        };
        arr.push(obj);
    }
    return arr;
}

//create wizard DOM element
function createWizardDOMElement (wizardTemplate, wizardObj) {
    const clonedWizard = wizardTemplate.cloneNode(true);
    clonedWizard.querySelector('.setup-similar-label').innerText = wizardObj.name;
    clonedWizard.querySelector('.wizard-coat').style.fill = wizardObj.coatColor;
    clonedWizard.querySelector('.wizard-eyes').style.fill = wizardObj.eyesColor;
    return clonedWizard;
}

//set wizards to DOM block
function setWizardsToBlock(wizardTemplate, wizardsArr) {
    const similarWizardsBlock = document.querySelector('.setup-similar-list');

    for (let i = 0; i < wizardsArr.length; i++) {
        const newWizard = createWizardDOMElement(wizardTemplate, wizardsArr[i]);
        similarWizardsBlock.appendChild(newWizard);
    }
}



