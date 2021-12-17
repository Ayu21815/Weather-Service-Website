const request=require('request')

const geocode=(address,callback)=> {
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXl1MjE4IiwiYSI6ImNrc3RhNnk4YTE0c2gyd3RmcjdmdWM1bzcifQ.Kxh24yeEuhhwUGl5XUJuYg'
    
    request({url: url1, json: true}, (error,{body})=>{
        if(error){
            callback('Not able to connect to the weather service',undefined);
        }else if(body.features.length===0){
                callback('No matching results!',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports=geocode