
// With XMLHTTPSRequest
// This is an extra exercise alternative to cat api which does not work anymore
// I did that exercise as well, but it naturally gives an error

(function(){
    let dogRequest = new XMLHttpRequest();
    dogRequest.open('GET', 'https://dog.ceo/api/breeds/image/random');
    dogRequest.addEventListener('load', function(){
        if(dogRequest.status >=200 && dogRequest.status <= 299){
            const newResponse = JSON.parse(this.response);
            const newImg = document.createElement('img');
            document.body.appendChild(newImg);
            newImg.setAttribute('src', newResponse.message);

        }else{
            console.log(`Error : ${dogRequest.status}`)
        }
    })
    dogRequest.onerror=function(){
        console.log(`Error : ${dogRequest.status}`)
    }
    dogRequest.send();

})()

// With Axios

axios
.get('https://dog.ceo/api/breeds/image/random')
.then(function(response){
    const newResponse = response.data;
    const newImg = document.createElement('img');
    document.body.appendChild(newImg);
    newImg.setAttribute('src', newResponse.message);
})
.catch(function(error){
    console.log(error)
})
