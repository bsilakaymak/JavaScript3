
// With XMLHTTPSRequest

(function(){
    let kitRequest = new XMLHttpRequest();
    kitRequest.open('GET', 'https://www.placekitten.com/api');
    kitRequest.addEventListener('load', function(){
        if(kitRequest.status >=200 && kitRequest.status <= 299){
            console.log(this.response);

        }else{
            console.log(`Error : ${kitRequest.status}`)
        }
    })
    kitRequest.onerror=function(){
        console.log(`Error : ${kitRequest.status}`)
    }
    kitRequest.send();

})()

// With Axios

axios
.get('https://www.placekitten.com/api')
.then(function(response){
    console.log(response.data)
})
.catch(function(error){
    console.log(error)
})
