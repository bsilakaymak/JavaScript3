'use strict';

{
  class Util {
    /**
     * Creates an element, optionally setting its attributes, and appends
     * the element to a parent.
     * @param {string} name The tag name of the element to create.
     * @param {HTMLElement} parent The parent element.
     * @param {Object} options An object with attribute names and values.
     * @param {HTMLElement} tag1
     * @param {HTMLElement} tag2
     * @param {string} text1
     * @param {string} text2
     * @param {string} urlPath
     * @param {string} targetURL

   
     */
    static createAndAppend(name, parent, options = {}) {
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
    static detailSection(sectionName, tag1, tag2, text1, text2, urlPath, targetURL){
      Util.createAndAppend(tag1, sectionName, {text:text1, class:'bold-title'} );
      Util.createAndAppend(tag2, sectionName, { text:text2, href:urlPath , target:targetURL });
    }

    static format(dateValue) {
      const dateAndTime = new Date(dateValue);
      return dateAndTime.toLocaleString('en-US');
    }
  }

  window.Util = Util;
}
