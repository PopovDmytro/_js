//load avatar images
const imagesArr = [];
for (let i = 1; i < 7; i++) {
    imagesArr.push(require(`../../images/avatar-${i}.svg`));
}
//
const templateArrOfComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];
const templateArrOfDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!',];
const templateData = randomDataGenerator(templateArrOfComments, templateArrOfDescriptions);
//
renderPosts(templateData, '.pictures', '#picture');

const bigPicture = document.querySelector('.big-picture');

const uploadForm = document.querySelector('.img-upload__form');
    imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay'),
    imgIploadInput = uploadForm.querySelector('.img-upload__input');

//temporary hide elements
bigPicture.querySelector('.comments-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
//

/*
* events
*/

document.querySelector('.pictures.container').addEventListener('click', function (e) {

    const activeEl = document.activeElement;

    if(activeEl.classList.contains('picture') && activeEl.id) {
        const activePicture = templateData.find((item) => item.id === activeEl.id);
        createBigPictureDOMElement(activePicture, bigPicture);
        bigPicture.classList.remove('hidden');
    }
});

imgIploadInput.addEventListener('change', function (e) {

    if(this.value) {
        imgUploadOverlay.classList.remove('hidden');
    }
});

uploadForm.querySelector('.effect-level__pin').addEventListener('mouseup', changeEffectSize);

uploadForm.querySelector('.effect-level__line').addEventListener('click', changeEffectSize);

function changeEffectSize () {
    console.log(uploadForm.querySelector('.effects__radio:checked'));

    const y = uploadForm.querySelector('.effect-level__line').clientLeft ;
    // const y = uploadForm.querySelector('.effect-level__line').clientLeft ;
    // const x = uploadForm.querySelector('.effect-level__line').offsetLeft ;

    console.log(y);
}

closeElement(document.querySelector('.big-picture__cancel'), 'big-picture');
closeElement(document.querySelector('.img-upload__cancel'), 'img-upload__overlay');
/*
* functions
*/

//close element on click cancel button
function closeElement(cancelEl, elClassToHide) {
    cancelEl.addEventListener('click', function (e) {
        const parent = findAncestor(this, elClassToHide);
        parent.classList.add('hidden');
    });
}
//generate random posts data
function randomDataGenerator(arrComments, arrDescriptions, dataLength = 25) {
    const data = [];

    for (let i = 0; i < dataLength; i++) {

        const item = {
            id: `picture_${i}`,
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
//create big-picture DOM element
function createBigPictureDOMElement(dataObj, bigPictureEl) {
    bigPictureEl.querySelector('.big-picture__img img').setAttribute('src', dataObj.url);
    bigPictureEl.querySelector('.likes-count').textContent = dataObj.likes;
    bigPictureEl.querySelector('.social__comment-count .comments-shows').textContent = dataObj.comments.length;
    bigPictureEl.querySelector('.social__caption').textContent = dataObj.description;

    const commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(createCommentsFragment(dataObj.comments));
}
//create comments fragment
function createCommentsFragment(dataArr) {
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < dataArr.length; i++) {
        const commentLi = createCommentDOMElement(templateData[0].comments[i]);
        fragment.appendChild(commentLi);
    }

    return fragment;
}
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
//create post DOM element
function createPostDOMElement(dataObj, template) {
    const newTemplate = template.content.cloneNode(true);

    newTemplate.querySelector('.picture').setAttribute('id', dataObj.id);
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
//create comment DOM element
function createCommentDOMElement(text, dataObj, template) {
    const commentLi = document.createElement('li');
    commentLi.className = 'social__comment social__comment--text';

    const commentAvatarImg = document.createElement('img');
    commentAvatarImg.setAttribute('src', imagesArr[randomN(0,5)]);
    commentAvatarImg.className = 'social__picture';
    commentAvatarImg.setAttribute('alt', 'Photo commentator avatar');
    commentAvatarImg.setAttribute('width', '35');
    commentAvatarImg.setAttribute('height', '35');

    const commentText = document.createElement('p');
    commentText.className = 'social__text';
    commentText.textContent = text;

    commentLi.appendChild(commentAvatarImg);
    commentLi.appendChild(commentText);

    return commentLi;
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
//find ancestor
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
