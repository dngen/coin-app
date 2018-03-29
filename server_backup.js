const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'bfebf731eac2d2c5a9a27bc87f43f81f'

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
     let weather = JSON.parse(body)
     let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
     res.render('index', {weather: weatherText, error: null});
     console.log(weatherText);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
