'use strict';

  async function fetchJSON(url) {
      const response = await axios.get(url);
      return response.data;
  }         
  const root = document.getElementById('root');
  const upperDiv = createAndAppend('div', root, {class : 'upper-div'});
  const container = createAndAppend('div', root, { class: 'container' });
  const repoContainer = createAndAppend('div', container, { class: 'repo-container' });
  const contributorContainer = createAndAppend('div', container, { class: 'contr-container' });      

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
  function renderRepoDetails(repo) {
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
  async function renderContDetails(url) {
    try{
      const contributors = await fetchJSON(url);
      const contAll = createAndAppend('div', contributorContainer, { class: 'cont-all' });
      contributors.forEach(contr => {
        const eachCont = createAndAppend('div', contAll, {class: 'each-contributor'});
        createAndAppend('img', eachCont, {src: contr.avatar_url,class: 'cont-pic'});
        const contDetails = createAndAppend('div', eachCont, {class: 'cont-details'})
        createAndAppend('a', contDetails, {text: contr.login, class: 'cont-name',href: contr.html_url});
        createAndAppend('span', contDetails, {text: `Contributions: ${contr.contributions}`,class: 'contributons'});
      });
    }catch (err) {
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    }
    
  }

  //main function 
  async function main(url) {
      try{
        const hyfHeader = createAndAppend('div', upperDiv, {class:'hyf-header' });
        createAndAppend('img',hyfHeader, {src:'hyf.png', class:'hyf-logo'})
        createAndAppend('h3', hyfHeader, {text:'HYF Repositories'});
        const repos = await fetchJSON(url);
        const select = createAndAppend('select', hyfHeader, { class: 'select-menu' });
        repos
         .sort((a, b) => a.name.localeCompare(b.name))   // sorting and creating options
         .forEach((repo, index) => {                     //  with each repo's name
            createAndAppend('option', select, { text: repo.name, value: index });
        });

        //default shown first repo
        renderRepoDetails(repos[0]);
        renderContDetails(repos[0].contributors_url);
      //changing current repo to the selected one with contributor details.
      select.addEventListener('change', function(){
         repoContainer.innerHTML = '';
         contributorContainer.innerHTML = '';
         const index = select.value;
         renderRepoDetails(repos[index]);
         renderContDetails(repos[index].contributors_url);
      });
      }catch(err){
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
      }   
    }
      const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
      window.onload = () => main(HYF_REPOS_URL) 
