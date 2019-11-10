const path = require('path')
const express = require('express');
const geocord = require('./utils/geocord')
const forcast = require('./utils/forcast')
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 4000


const publicDerectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/view')
const partialPath = path.join(__dirname, '../templates/partial')

app.use(express.static(publicDerectory));
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        appName: 'Weather App',
        name : 'Jay'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        appName: 'About Me',
        name : 'Badal Kumar Behera'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        appName: 'Help page',
        name : 'jay'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error:'Provide Address For Weather'
        })
    }
    const addrs = req.query.address;


    geocord(addrs, (error, { latitude, logotitude, location } = {} )=>{
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, logotitude, (err, ForcastData)=> {
            if (err) {
               return res.send({ err })
            }

            res.send({
                Forcast: ForcastData,
                Address:location,
                Place: req.query.address
            })

        })
    })


})


app.get('*', (req, res) =>{
    res.render('404page', {
        title:'Wrong URL, page is Not Foud',
        err: '404'
    })
})
app.listen(port, ()=>{
    console.log('Server Is Running in  Port '+ port);
});