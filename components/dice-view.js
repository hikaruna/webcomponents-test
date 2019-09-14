const template = (() => {
  const element = document.createElement('html');
  element.innerHTML = `
  <template>
    <div>6</div>

    <style>
      div {
        border: 1px solid black;
        background-color: white;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .dark {
        border-color: white;
        background-color: gray;
      }
    </style>
  </template>
  `;
  return element.getElementsByTagName('template')[0];
})();

export default class extends HTMLElement {
  static get observedAttributes() {
    return ['number', "class"];
  }

  set number(val) {
    this.setAttribute('number', val);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    this.core = new DiceView(this.shadowRoot, () => {
      this.number = Math.floor(Math.random() * 6) + 1
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'number') {
      this.core.number = newValue;
    }else if(name === 'class') {
      this.core.class = newValue;
    }
  }
}

class DiceView {

  set number(val) {
    this.host.querySelector('div').innerHTML = val;
  }

  set class(val) {
    this.host.querySelector('div').setAttribute('class', val);
  }

  constructor(host, onclick) {
    this.host = host;
    this.me = this.host.querySelector('div');
    this.me.addEventListener('click', () => {
      onclick();
    });
  }
}
