const request = require('request')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')


const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../templates/views')//setting path for views folder
const partialPath = path.join(__dirname, '../templates/partials')// setting path for partials folder
app.set('view engine', 'hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialPath)

//Setup static direcotry to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name:'Prapti Maheshwari',
        message:'Use this app to get your weather!!'
    })
})
app.get('/about', (req,res) =>{
    res.render('about', {
        title:'About me',
        name:'Prapti Maheshwari'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        message:'Nice work',
        title:'Help',
        name:'Prapti Maheshwari'
        
    })
})


app.get('', (req, res) => {//html  
    res.send('<h1>Weather</h1>')
})

// app.get('/help', (req, res) => {//sending json data 
//     res.send({
//         name:'Prapti',
//         age:19
//     })
// })

app.get('/about', (req, res) => {
    res.send('<h1>about page</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){

   return res.send({
       error:'You must provide an address'
   })
 }

 geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
    // res.send({
    //     forecast:'It is snowing',
    //     location :data.location,
    //     address:req.query.address
    //     // console.log(data.location)
    //     // console.log(forecastData)
    // })
})



app.get('*', (req, res) => {//default route when someone types wrong thing in url //this default routr should be at last after all the routes
    res.render('404', {
        
        title:'404',
        name:'Prapti M',
        errorMessage:'Page not found'
        
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

//45 static assets
//Task abot and help html page 

// 
