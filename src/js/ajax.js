/*Fetch with promises*/
fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956/')
    .then(res => {
        // console.log(res);

        return res.json();
    })
    .then(data => {
        // console.log(data);
        const today = data.consolidated_weather[0];
        // console.log(today);
    })
    .catch(err => {
        console.log(err);
    });

/*Fetch with async await*/

let x = '';

async function getWeatherAW(woeid) {

    try {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await res.json();
        console.log(data);

        return data;
    } catch (e) {
        console.error(e);
    }
}

getWeatherAW(2487956);
const dataLondon = getWeatherAW(44418);
dataLondon.then((data) => {console.log(data);});





