//With XMLHTTPSRequest

'use strict';

(function(){
  let picRequest = new XMLHttpRequest();
  picRequest.open('GET', 'https://picsum.photos/400');
  function loadPic(){  
      if(picRequest.status >= 200 && picRequest.status <= 299){
          const newImg = document.createElement('img');
          document.body.appendChild(newImg);
          newImg.setAttribute('src', picRequest.responseURL);
      }else{
          console.log(`Error : ${picRequest.status}`);
      }
      
  };
  picRequest.addEventListener('load', loadPic);
  picRequest.onerror = function(){
      console.log('An error!!')
  };
  picRequest.send(); 
  
})()

//With Axios

axios
.get('https://picsum.photos/400')
.then(function(response){
        const newImg = document.createElement('img');
        document.body.appendChild(newImg);
        newImg.setAttribute('src', response.request.responseURL);
})
.catch(function(error){
    console.log(error)
})
