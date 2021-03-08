async function windowActions() {

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];

fetch(endpoint)
const request = await fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

console.log(cities);

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(event.target.value, 'gi')
        const cityName = place.city.replace(regex, `<span class='h1'>${event.target.value}</span>`);
        const stateName = place.state.replace(regex, `<span class='h1'>${event.target.value}</span>`);
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
searchInput.addEventListener('keyup', (evt) => {
  displayMatches(evt)
});
}

if (typeof window !== "undefined"){
  window.onload = windowActions;
  const arrayName = await request.json()
}