'use strict';

{
  const { createAndAppend, detailSection, format} = window.Util;
  
  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    
    render(repo) {
        this.container.innerHTML = '';
        const repoCont = document.querySelector('.repo-container')
        const block = createAndAppend('div', repoCont, {class: 'block'});
        const repositorySection = createAndAppend('div', block, {class:'row'} );
        const descriptionSection = createAndAppend('div', block, {class:'row'} );
        const forksSection = createAndAppend('div', block, {class: 'row'});
        const updateSection = createAndAppend('div', block, {class: 'row'});
        detailSection(repositorySection, 'span', 'a', 'Repositories:', repo.name, repo.html_url, '_blank');
        detailSection(descriptionSection, 'span', 'span', 'Description:', repo.description ||'No Description was provided.');
        detailSection(forksSection, 'span', 'span', 'Forks:', repo.forks);
        detailSection(updateSection, 'span', 'span', 'Update:', format(repo.updated_at));
    }
  }

  window.RepoView = RepoView;
}
