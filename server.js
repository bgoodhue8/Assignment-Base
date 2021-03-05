// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

console.log(cities);

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.zip.match(regex)
    })
}

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches() {
const matchArray = findMatches(this.value, cities);
const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi')
    const cityName = place.city.replace(regex, `<span class='h1'>${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class='h1'>${this.value}</span>`);
    return `
    <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
    </li>
`;
}).join('');
suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
