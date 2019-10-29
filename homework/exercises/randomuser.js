//With XMLHTTPSRequest

'use strict';
(function(){
 let randomRequest = new XMLHttpRequest();
 randomRequest.open('GET', 'https://www.randomuser.me/api');
 randomRequest.addEventListener('load', function(){
     if(randomRequest.status >=200 && randomRequest.status <= 299){
         console.log(JSON.parse(this.response));
     }else{
         console.log(`Error: ${randomRequest.status}`);
     }
 })
 randomRequest.onerror = function(){
     console.log(`An error has occured!!! Error: ${randomRequest.status}`)
 }
 randomRequest.send();
})()


//With Axios

axios
.get('https://www.randomuser.me/api')
.then(function(response){
    console.log(response.data)
})
.catch(function(error){
    console.log(error)
})
