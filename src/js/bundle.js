
let lonVariableNameWithLorem = () => {
    console.log(123);
    return 123;
};

const h1Tag = document.querySelector('h1');
h1Tag.innerHTML = "Nadiuhs Jopuha ";

h1Tag.classList.remove('test');
setTimeout(() => {
    h1Tag.classList.add('test');
}, 3500);


