
/**
  *
  * `badged-icon-button`
  *
  *   An icon-button implementation that adds an upper and lower set of notification badges.
  *
  *
  *
  *
  *   properites:
  *
  *  
  *    
  * 
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  **/


import {
  AppElement, 
  html
}                 from '@longlost/app-element/app-element.js';
import {
  listen, 
  schedule
}                 from '@longlost/utils/utils.js';
import htmlString from './badged-icon-button.html';
import '@polymer/paper-badge/paper-badge.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


class BadgedIconButton extends AppElement {
  static get is() { return 'badged-icon-button'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      alt: String,

      icon: String,

      lowerLabel: {
        type: String,
        value: '!'
      },

      upperLabel: String,

      showLower: Boolean,

      showUpper: Boolean,

      _canShowBadges: Boolean,
      
    };
  }


  static get observers() {
    return [
      '__showLowerChanged(showLower, _canShowBadges)',
      '__showUpperChanged(showUpper, _canShowBadges)'
    ];
  }
  

  async connectedCallback() {
    super.connectedCallback();

    // Fixes badge text misalignment in ios Safari.
    const badges = this.selectAll('.badges');

    badges.forEach(badge => {
      const text = this.select('#badge-text', badge);
      // Match line-height with default height of 
      // container to vertically center text in it's span.
      text.style['line-height'] = '11px'; // Default <paper-badge> height.
    });

    // Wait for cart badge at home screen starting in wrong position
    await schedule();

    badges.forEach(badge => {
      badge.notifyResize();
    });

    await schedule();

    this._canShowBadges = true;
  }


  __controlBadge(id, show, canShow) {
    if (!canShow) { return; }

    if (show) {
      this.$[id].classList.add('show-badge');
    }
    else {
      this.$[id].classList.remove('show-badge');
    }
  }


  __showLowerChanged(showLower, canShow) {
    this.__controlBadge('lowerBadge', showLower, canShow);
  }


  __showUpperChanged(showUpper, canShow) {
    this.__controlBadge('upperBadge', showUpper, canShow);
  }


  showLowerBadge() {
    this.showLower = true;
  }


  hideLowerBadge() {
    this.showLower = false;
  }


  showUpperBadge() {
    this.showUpper = true;
  }


  hideUpperBadge() {
    this.showUpper = false;
  }

}

window.customElements.define(BadgedIconButton.is, BadgedIconButton);
