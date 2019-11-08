'use strict';

{
  // I tried to get rid of completely this callback, but I couldn't make it work, so I just changed
 //xhr part to fetch while keeping the callback.
  function fetchJSON(url, callback) {
    fetch(url).then(function(res){
      return res.json();
    }).then(function(res){
      callback(null, res)
    }).catch(function(err){
      callback(err)
    })
  }

  //a very cool pre-written creatAndAppend function
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
  function renderRepoDetails(repoContainer,repo) {
    const block = createAndAppend('div', repoContainer, {class: 'block'});
    const repositorySection = createAndAppend('div', block, {class:'row'} );
    const descriptionSection = createAndAppend('div', block, {class:'row'} );
    const forksSection = createAndAppend('div', block, {class: 'row'});
    const updateSection = createAndAppend('div', block, {class: 'row'});
    detailSection(repositorySection, 'span', 'a', 'Repositories:', repo.name, repo.html_url, '_blank');
    detailSection(descriptionSection, 'span', 'span', 'Description:', repo.description ||'No Description was provided.');
    detailSection(forksSection, 'span', 'span', 'Forks:', repo.forks);
    detailSection(updateSection, 'span', 'span', 'Update:', format(repo.updated_at));
  }
 
  //adding contributor details for each repo
  function renderContDetails(contributorContainer, url) {
    fetchJSON(url, (err, contributors) => {
      if (err) {
        createAndAppend('div', contributorContainer, { text: `An error has occured: ${err.message}`, class: 'alert-error' });
        return;
      }
      const contAll = createAndAppend('div', contributorContainer, { class: 'cont-all' });
      contributors.forEach(contr => {
        const eachCont = createAndAppend('div', contAll, {class: 'each-contributor'});
        createAndAppend('img', eachCont, {src: contr.avatar_url,class: 'cont-pic'});
        const contDetails = createAndAppend('div', eachCont, {class: 'cont-details'})
        createAndAppend('a', contDetails, {text: contr.login, class: 'cont-name',href: contr.html_url});
        createAndAppend('span', contDetails, {text: `Contributions: ${contr.contributions}`,class: 'contributons'});
      });
    });
  }

  //main function 
  function main(url) {
    fetchJSON(url, (err, repos) => {
      if (err) {
        createAndAppend('div', root, { text: `An error has occured: ${err.message}`, class: 'alert-error' });
        return;
      }
       //creating header and select menu appended to the hyf header

        const hyfHeader = createAndAppend('div', root, {class:'hyf-header' });
        createAndAppend('img',hyfHeader, {src:'hyf.png', class:'hyf-logo'})
        createAndAppend('h3', hyfHeader, {text:'HYF Repositories'});
        const select = createAndAppend('select', hyfHeader, { class: 'select-menu' });
        repos
         .sort((a, b) => a.name.localeCompare(b.name))   // sorting and creating options
         .forEach((repo, index) => {                     //  with each repo's name
            createAndAppend('option', select, { text: repo.name, value: index });
        });

        //repo and contributor containers wrapped in a main container
      
        const container = createAndAppend('div', root, { class: 'container' });
        const repoContainer = createAndAppend('div', container, { class: 'repo-container' });
        const contributorContainer = createAndAppend('div', container, { class: 'contr-container' });

        //default shown first repo

        renderRepoDetails(repoContainer, repos[0]);
        renderContDetails(contributorContainer, repos[0].contributors_url);
      //changing current repo to the selected one with contributor details.
      select.onchange =() => {
         repoContainer.innerHTML = '';
         contributorContainer.innerHTML = '';
         const index = select.value;
         renderRepoDetails(repoContainer, repos[index]);
         renderContDetails(contributorContainer, repos[index].contributors_url);
      };
    });
  }
   

  const root = document.getElementById('root');
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}