//
const templateArrOfComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];
const templateArrOfDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!',];
const templateData = randomDataGenerator(templateArrOfComments, templateArrOfDescriptions);
//

renderPosts(templateData, '.pictures', '#picture');

//functions

//insert elements into block
function renderPosts(dataArr, blockSelector, templateSelector) {
    if(!blockSelector || !templateSelector) return;

    const template = document.querySelector(templateSelector);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dataArr.length; i++) {
        const element = createPostDOMElement(dataArr[i], template);
        fragment.appendChild(element);
    }

    document.querySelector(blockSelector).appendChild(fragment);
}
//create DOM element
function createPostDOMElement(dataObj, template) {
    const newTemplate = template.content.cloneNode(true);

    newTemplate.querySelector('img').setAttribute('src', dataObj.url);

    insertTextAndAppend(
        createNode('span', 'picture__stat--comments'),
        dataObj.comments.length,
        newTemplate.querySelector('.picture__comments')
    );
    insertTextAndAppend(
        createNode('span', 'picture__stat--likes'),
        dataObj.likes,
        newTemplate.querySelector('.picture__likes')
    );

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
//insert text and append child to element
function insertTextAndAppend(newElement, text, appendTo) {
    newElement.textContent = text;
    appendTo.appendChild(newElement);
}
//generate number between min max
function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//generate random posts data
function randomDataGenerator(arrComments, arrDescriptions, dataLength = 25) {
    const data = [];

    for (let i = 0; i < dataLength; i++) {

        const item = {
            url: `./photos/${i + 1}.jpg`, //n from 1 to 25
            likes: `${randomN(15, 200)}`, //n from 15 to 200
            comments: [], //array of strings
            description: arrDescriptions[randomN(0, arrDescriptions.length - 1)] //string
        };

        for (let j = 0; j < randomN(1, 2); j++) {
            item.comments.push(arrComments[randomN(0, arrComments.length - 1)]);
        }

        data.push(item)
    }
    return data;
}
