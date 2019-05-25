
/*
* Promises
* */
const getId = new Promise((res, rej) => {

    setTimeout(() => {
        res([213,121,547,688,777]);
    }, 1500);
});

getId
    .then((ids) => {
        console.log(ids);
    })
    .catch(err => {
        console.log(err);
    });