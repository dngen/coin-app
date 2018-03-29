const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.render('index', {cmc: null, error: null});
});

// app.post('/', function (req, res) {
//   let coin = req.body.coin;
//   let url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`
//   request(url, function (err, response, body) {
//      let cmc = JSON.parse(body)
//      let cmcText = `${cmc['0'].symbol} It's ${cmc['0'].price_usd} USD !`;
//           res.render('index', {cmc: cmcText, error: null});
//           console.log(cmcText);
//
//   });
// });

app.post('/', function(req, res) {
  let query = req.body.query;
  request(`https://api.coinmarketcap.com/v1/ticker/`, function (err, response, body) {
       let res_txt = '';
       let coins = JSON.parse(body)
       for(var coin of coins) {
          if(coin.symbol ==  query) {
            res_txt = "Coin: " + coin.name + " (" + coin.symbol + "\nPrice:\n≈ " + coin.price_usd + " USD\n≈ ";
            break;
          }
       }
       if (res_txt === '') {
         request(`https://api.coinmarketcap.com/v1/ticker/${query}`, function (err, response, body) {
           let coins = JSON.parse(body)
           for(var coin of coins) {
              res_txt = "Coin: " + coin.name + " Price: " + coin.price_usd + " USD";
           }
           res.render('index', {cmc: res_txt, error: null});
         });
       } else {
         res.render('index', {cmc: res_txt, error: null});
       }
    });
});

let port = process.env.PORT;
if ( port == null ) {
  port = 3000;
}

app.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !')
});
