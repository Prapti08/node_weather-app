const request = require('request')

const forecast = ( latitute,longitute, callback) => {
    const  url = 'http://api.weatherstack.com/current?access_key=0c15bb3d8dfe96a743d7de78612ebaa7&query='+ latitute + ',' + longitute + '&units=f'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '  It is currently  ' + body.current.temperature + '  degrees  out ,It feels like   '+ body.current.feelslike + '   degree out . There is   ' + body.current.precip + '% chance of rain and humidity is '+body.current.humidity + ' %.' )
           
        }
    })
}

module.exports =forecast