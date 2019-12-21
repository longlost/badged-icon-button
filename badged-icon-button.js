
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
  *    alt: String undefined -> <paper-icon-button> 'aria-label' data-binding.
  *
  *    icon: String undefined -> <paper-icon-button> 'icon' data-binding.
  *
  *    lowerLabel: String '!' -> Centered label displayed in lower badge.
  *
  *    upperLabel: String undefined -> Centered label displayed in upper badge.
  *
  *    showLower: Boolean undefined -> Lower badge state.
  *
  *    showUpper: Boolean undefined -> Upper badge state.
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
import htmlString from './badged-icon-button.html';
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

      _lowerBadge: Object,

      _upperBadge: Object
      
    };
  }


  static get observers() {
    return [
      '__showLowerChanged(_lowerBadge, showLower)',
      '__showUpperChanged(_upperBadge, showUpper)'
    ];
  }


  connectedCallback() {
    super.connectedCallback();

    this._upperBadge = this.$.upperBadge;
    this._lowerBadge = this.$.lowerBadge;
  }


  __upperSlotChanged() {
    const nodes      = this.slotNodes('slot[name="upper-badge"]');
    this._upperBadge = nodes[0];
  }


  __lowerSlotChanged() {
    const nodes      = this.slotNodes('slot[name="lower-badge"]');
    this._lowerBadge = nodes[0];
  }


  __controlBadge(badge, show) {
    if (!badge) { return; }

    if (show) {
      badge.style['transform'] = 'scale(1, 1)';
    }
    else {
      badge.style['transform'] = 'scale(0, 0)';
    }
  }


  __showLowerChanged(lowerBadge, showLower) {
    this.__controlBadge(lowerBadge, showLower);
  }


  __showUpperChanged(upperBadge, showUpper) {
    this.__controlBadge(upperBadge, showUpper);
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
