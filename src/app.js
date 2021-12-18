const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('../utils/forecast')
const geocode=require('../utils/geocode')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ayushi Bhargava'
    })
})
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ayushi Bhargava'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude,data.longitude,(error,response)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecastdata: response.forecastdata,
                location: data.location
            })
        })
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Ayushi Bhargava'
    })
})
//set up 404 page for routes beginning with /help/ and after that matches everything
app.get('/help/*', (req,res)=>{
    res.render('404page',{
        title: '404',
        name: 'Ayushi Bhargava',
        text: 'Help article not found!'
    })
})
//set up generic 404 page; * matches everything which has not been matched above
app.get('*', (req,res)=>{
    res.render('404page',{
        title: '404',
        name: 'Ayushi Bhargava',
        text: '404 Error! Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up')
})