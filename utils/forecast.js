const request = require("request")

const forecast=(latitude,longitude,callback) => {
    const url='https://api.weatherbit.io/v2.0/current?lat='+latitude+'&lon='+longitude+'&key=c6201535a5f949158d85a09e6e5055fc'
    request({url: url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(response.body.error){
            callback('Location not found!',undefined)
        }else{
            callback(undefined,{
                forecastdata: response.body.data[0].weather.description + '. It is currently '+ response.body.data[0].temp + ' degrees out. There is ' + response.body.data[0].precip+' % chances of rain.'
        })
    }
})
}
module.exports=forecast






