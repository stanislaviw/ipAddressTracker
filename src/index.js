import 'babel-polyfill';
import { addOffset, getAdress, addTileLayer, validateIp } from './helpers/index.js';
import icon from '../images/icon-location.svg';

const btn = document.querySelector('.header__input_btn');
const ipInput = document.querySelector('.header__input_item');
const newIp = document.getElementById('ip')
const newLocation = document.getElementById('location')
const newTimezone = document.getElementById('timezone')
const newIsp = document.getElementById('isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const map = L.map('map').setView([37.38605, -122.08385], 13);

addTileLayer(map);

function getData() {
    if(validateIp(ipInput.value)) {
      getAdress(ipInput.value)
        .then(printInfo)
    }
}

function handleKey(event) {
  if (event.key === 'Enter') {
    getData()
  }
};

function printInfo(data) {
  const { country, lat, lng, region, timezone } = data.location;

  newIp.innerText = data.ip;

  newLocation.innerText = `${region} ${country}`;

  newTimezone.innerText = timezone;

  newIsp.innerText = data.isp;

  map.setView([lat, lng], 13);

  if(L.marker([lat, lng], {icon: markerIcon}).addTo(map) == false) {
    L.marker([lat, lng], {icon: markerIcon}).removeTo(map)
  }
  
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);

  if (matchMedia("(max-wigth: 1024px)").matches) {
    addOffset(map)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAdress().then(printInfo)
})