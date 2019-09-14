const template = `
<div>
  <div id="me">6</div>

  <style>
    #me {
      border: 1px solid black;
      background-color: white;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
<div>
`
export class DiceView extends HTMLElement {
  static get observedAttributes() {
    return ['number'];
  }

  set number(val) {
    this.setAttribute('number', val);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = template;
    this.core = new DiceViewCore(this.shadowRoot, () => {
      console.log("@@@nikonko")
      this.number = Math.floor(Math.random() * 6) + 1
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'number') {
      this.core.number = newValue;
    }
  }
}

class DiceViewCore {

  set number(val) {
    this.host.querySelector('#me').innerHTML = val;
  }

  constructor(host, onclick) {
    this.host = host;
    this.me = this.host.querySelector('#me')
    this.me.addEventListener('click', () => {
      onclick();
    });
  }
}
