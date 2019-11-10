const request = require('request');

const forcast = (latitude, logitude, callback) => {

    const URL = 'https://api.darksky.net/forecast/343f5b7814c0b40b5455a1de71bf7e72/'+ latitude +','+ logitude+'?units=si';

    request({ url: URL, json: true}, (err, res) => {
        if (err) {
            callback('Unable to  connect...', undefined);
        } else if (res.body.error) {
            callback(`Sorry Do ${res.body.error}`, undefined);
        } else{
            callback( undefined, `${res.body.daily.data[0].summary} The Tempreture is ${res.body.currently.temperature}  degree celcious . Rain Chance Is ${res.body.currently.precipProbability} And ${res.body.daily.summary} ` )

        }
    });

};

module.exports = forcast