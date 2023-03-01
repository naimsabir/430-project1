const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<nav class="navbar has-shadow is-white">
  <!-- logo / brand -->
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src="images/CP2077_Samurai_Logo.webp" alt="logo image" style="max-height: 70px" class="py-2 px-2">
    </a>
    <a class="navbar-burger" id="burger">
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>

  <div class="navbar-menu" id="nav-links">
    <div class="navbar-start">
      <a id="home" class="navbar-item is-hoverable" href="client.html">
        Write
      </a>
      
      <a id="app" class="navbar-item is-hoverable" href="app.html">
        View
      </a>

    </div> <!-- end navbar-start -->
    </div>

  </div>
</nav>
`;

class Nav extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.burger = this.shadowRoot.querySelector('#burger');
        this.navMen = this.shadowRoot.querySelector('#nav-links');

        if(this.dataset.current)
        {
            this.shadowRoot.querySelector(`#${this.dataset.current}`).classList.add("has-text-weight-bold");
        }
    }
    connectedCallback()
    {
        this.burger.addEventListener('click', () => {
            this.navMen.classList.toggle('is-active')
        })
    }
    static get observedAttributes(){
        return ["data-current"];
      }
    
}
customElements.define("app-nav", Nav);