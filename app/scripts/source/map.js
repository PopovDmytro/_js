//
const imagesArr = [];
for (let i = 1; i < 9; i++) {
    imagesArr.push(require(`../../images/avatars/user0${i}.png`));
}

const templateArrOfferTitle = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
const templateArrType = ['palace', 'flat', 'house', 'bungalo'];
const templateArrTimes = ['12:00', '13:00', '14:00'];
const templateArrFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const templateArrPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const templateData = randomDataGenerator(templateArrOfferTitle, templateArrType, templateArrTimes, templateArrFeatures, templateArrPhotos);
//

renderPins(templateData, '.map__pins', '#pin');

renderCard(templateData, '.map', '#card', '.map__filters-container');

const map = document.querySelector('.map');
map.classList.remove('map--faded');

/*
* functions
*/

//insert pins into block
function renderPins(dataArr, blockSelector, templateSelector) {
    if(!blockSelector || !templateSelector) return;

    const template = document.querySelector(templateSelector);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dataArr.length; i++) {
        const element = createPinDOMElement(dataArr[i], template);
        fragment.appendChild(element);
    }

    document.querySelector(blockSelector).appendChild(fragment);
}
//insert cart into block before element
function renderCard(dataArr, blockSelector, templateSelector, appendBeforeSelector) {
    if(!blockSelector || !templateSelector) return;

    const appendBeforeEl = document.querySelector(appendBeforeSelector);

    const template = document.querySelector(templateSelector);
    const fragment = document.createDocumentFragment();
    const element = createCartDOMElement(dataArr[0], template);
    fragment.appendChild(element);

    document.querySelector(blockSelector).insertBefore(fragment, appendBeforeEl);
}
//create pin DOM element
function createPinDOMElement(dataObj, template) {
    const newTemplate = template.content.cloneNode(true);

    const avatarSize = {
        w: 40,
        h: 40
    };

    newTemplate.querySelector('.map__pin').style.cssText = `left:${dataObj.location.x + avatarSize.w / 2}px; top:${dataObj.location.y + avatarSize.h}px`;
    newTemplate.querySelector('img').setAttribute('src', dataObj.avatar);
    newTemplate.querySelector('img').setAttribute('alt', dataObj.offer.title);

    return newTemplate;
}
//create card DOM element
function createCartDOMElement(dataObj, template) {
    const newTemplate = template.content.cloneNode(true);

    newTemplate.querySelector('.popup__avatar').setAttribute('src', dataObj.avatar);
    newTemplate.querySelector('.popup__title').textContent = dataObj.offer.title;
    newTemplate.querySelector('.popup__text--address').textContent = dataObj.offer.address;
    newTemplate.querySelector('.popup__text--price').textContent = dataObj.offer.price;
    newTemplate.querySelector('.popup__type').textContent = dataObj.offer.type;
    newTemplate.querySelector('.popup__text--capacity').textContent = `
        ${dataObj.offer.rooms > 1 ? dataObj.offer.rooms + ' rooms': dataObj.offer.rooms + ' room'} for
        ${dataObj.offer.guests > 1 ? dataObj.offer.guests + ' guests': dataObj.offer.guests + 'guest'}
    `;
    newTemplate.querySelector('.popup__text--time').textContent = `
        Check in after ${dataObj.offer.checkin}, 
        check out till ${dataObj.offer.checkout}
    `;

    const fLi = document.createDocumentFragment();
    for(let i = 0; i < dataObj.offer.features.length; i++) {
        const li = createNode('li', `popup__feature popup__feature--${dataObj.offer.features[i]}`);
        fLi.appendChild(li);
    }
    newTemplate.querySelector('.popup__features').innerHTML = '';
    newTemplate.querySelector('.popup__features').appendChild(fLi);

    newTemplate.querySelector('.popup__description').textContent = dataObj.offer.description;

    const fImg = document.createDocumentFragment();
    for(let i = 0; i < dataObj.offer.photos.length; i++) {
        const img = createNode('img', 'popup__photo');
        img.setAttribute('src', dataObj.offer.photos[i]);
        img.setAttribute('alt', 'Apartment photo');
        img.style.cssText = 'width:45px;height:40px';
        fImg.appendChild(img);
    }
    newTemplate.querySelector('.popup__photos').innerHTML = '';
    newTemplate.querySelector('.popup__photos').appendChild(fImg);

    return newTemplate;
}
//create node element and add class
function createNode(tagName, classes = '', id = '') {
    const newEl = document.createElement(tagName);
    newEl.className = classes;

    if(id) {
        newEl.setAttribute('id', id);
    }

    return newEl;
}
//generate number between min max
function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//generate random booking data
function randomDataGenerator(arrOfferTitle, arrType, arrTimes, arrFeatures, arrPhotos, dataLength = 8) {
    const data = [];

    for (let i = 0; i < dataLength; i++) {

        const features = [];
        for (let i = 0; i < randomN(1, arrFeatures.length); i++) {
            features.push(arrFeatures[i]);
        }

        const item = {
            avatar: imagesArr[i],
            offer: {
                title: arrOfferTitle[randomN(0, arrOfferTitle.length - 1)],
                address: `${randomN(100, 900)}, ${randomN(100, 900)}`,
                price: randomN(100, 1000),
                type: arrType[randomN(0, arrType.length - 1)],
                rooms: randomN(1, 5),
                guests: randomN(1, 20),
                checkin: arrTimes[randomN(0, arrTimes.length - 1)],
                checkout: arrTimes[randomN(0, arrTimes.length - 1)],
                features,
                description: '',
                photos: arrPhotos
            },
            location: {
                x: randomN(0, 1000),
                y: randomN(130, 630)
            }
        };

        data.push(item)
    }
    return data;
}
