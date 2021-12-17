const weatherForm= document.querySelector('form')  //converts html element into js representation of the same for manipulation
const search= document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')


//adding event listener when someone clicks submit
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    msg1.textContent='Loading...'
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+loc).then((response)=>{
        response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
        }else{
            msg1.textContent=data.location
            msg2.textContent=data.forecastdata
        }
    })
})
})