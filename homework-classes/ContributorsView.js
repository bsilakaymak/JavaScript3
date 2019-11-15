'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      contributors.forEach(contr => {
        const contributorsCont = document.querySelector('.contributors-container')
        const eachCont = createAndAppend('div', contributorsCont, {class: 'each-contributor'});
        createAndAppend('img', eachCont, {src: contr.avatar_url,class: 'cont-pic'});
        const contDetails = createAndAppend('div', eachCont, {class: 'cont-details'})
        createAndAppend('a', contDetails, {text: contr.login, class: 'cont-name',href: contr.html_url});
        createAndAppend('span', contDetails, {text: `Contributions: ${contr.contributions}`,class: 'contributons'});
      });
    }
  }

  window.ContributorsView = ContributorsView;
}
