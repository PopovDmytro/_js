//
const names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const sernames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
//

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

const wizardsArr = createWizardObjects(names, sernames, coatColors, eyesColors);

setWizardsToBlock(similarWizardTemplate, wizardsArr);

//functions

//get random item from array
function getRandomItem (arr, min = 0, max = arr.length - 1) {
    return arr[Math.floor(Math.random() * (max - min + 1) + min)];
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



