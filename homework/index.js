'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
 // this function creates the header with hyf logo and text
  function createHeader(){
    const hyfHeader = createAndAppend('div', root, {class:'hyf-header' });
    createAndAppend('img',hyfHeader, {src:'hyf.png', class:'hyf-logo'})
    createAndAppend('h3', hyfHeader, {text:'HYF Repositories'});
  }
 // this formats date inside repo details
  function format(dateValue) {
    const dateAndTime = new Date(dateValue);
    return dateAndTime.toLocaleString('en-US');
  }
 //This is for adding repo details more efficiently
  function detailSection(sectionName, tag1, tag2, text1, text2, urlPath, targetURL){
    createAndAppend(tag1, sectionName, {text:text1, class:'bold-title'} );
    createAndAppend(tag2, sectionName, { text:text2, href:urlPath , target:targetURL });
  }
  //I didn't want to use list items, instead I used a new div with a class of 'block',
  //here is the part where I call the function above to add repo details
  function renderRepoDetails(repo) {
      const block = createAndAppend('div', root, {class: 'block'});
      const repositorySection = createAndAppend('div', block, {class:'row'} );
      const descriptionSection = createAndAppend('div', block, {class:'row'} );
      const forksSection = createAndAppend('div', block, {class: 'row'});
      const updateSection = createAndAppend('div', block, {class: 'row'});
      detailSection(repositorySection, 'span', 'a', 'Repositories:', repo.name, repo.html_url, '_blank');
      detailSection(descriptionSection, 'span', 'span', 'Description:', repo.description ||'No Description was provided.');
      detailSection(forksSection, 'span', 'span', 'Forks:', repo.forks);
      detailSection(updateSection, 'span', 'span', 'Update:', format(repo.updated_at));
  }

  function main(url) {
    createHeader();
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      //This is where repos are sorted alphabetically right before they are rendered.
      repos
      .sort(function(a, b) {return a.name.localeCompare(b.name)})
      .forEach(repo => renderRepoDetails(repo));
    });

  }



  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}


