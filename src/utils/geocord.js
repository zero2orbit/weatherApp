const request = require('request')

const geocord = (address, callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoiYmFkYWwwMDciLCJhIjoiY2sya3Y0MjN6MDBnMzNjcXVraG15cWtsdiJ9.a-h1OIb65ROpq2CTKVtIWQ&limit=1'

    request({url: URL, json: true}, (err, res) => {

        if (err) {
            callback('Unable to Connect.....', undefined);
        } else if (res.body.features.length === 0) {
            callback('Wrong Address Try Agian!', undefined)
        }else{
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                logotitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }

    });
};

module.exports = geocord