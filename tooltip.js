const template = document.createElement("template");
template.innerHTML = `

<style>
    .tooltip_container {
        position: relative;
        display: inline-block;
    }

    img {
      cursor: pointer;
    }

    img.icon {
      width: .8em;
    }

    img.close {
      display: none;
    }

    .tooltip_content {
      font-size: 0.75rem;
      background: lightgrey;
      color: black;
      transform: scale(0);
      transform-origin: bottom left;
      transition: transform .5s ease-in;
      box-shadow: 5px 5px 10px rgba(0 , 0, 0, 0.1);
      border-radius: .5em;
      position: absolute;
      width: 300px;
      bottom: 125%;
      padding: 1em;
    }
</style>
<div class="tooltip_container">
    <img class="icon info" src="./image/info.svg" />
    <img class="icon close" src="./image/close.svg" />
    <span class="tooltip_content"><slot name="message"/></span>
</div>

`;

class InfoTip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const toolTipContent = this.shadowRoot.querySelector(".tooltip_content");
    const info = this.shadowRoot.querySelector(".info");
    const close = this.shadowRoot.querySelector(".close");

    info.addEventListener("click", () => this.toolTipHandler(true));
    close.addEventListener("click", () => this.toolTipHandler(false));

    if (this.getAttribute("bgColor")) {
      toolTipContent.style.backgroundColor = this.getAttribute("bgColor");
    }

    if (this.getAttribute("contentColor")) {
      toolTipContent.style.color = this.getAttribute("contentColor");
    }
  }

  toolTipHandler(expandState) {
    const toolTipContent = this.shadowRoot.querySelector(".tooltip_content");
    const info = this.shadowRoot.querySelector(".info");
    const close = this.shadowRoot.querySelector(".close");

    if (expandState) {
      info.style.display = "none";
      close.style.display = "inline-block";
      toolTipContent.style.transform = "scale(1)";
    } else {
      close.style.display = "none";
      info.style.display = "inline-block";
      toolTipContent.style.transform = "scale(0)";
    }
  }
}

window.customElements.define("info-tip", InfoTip);
