// CURRENT STATUS - This is just the anime card code from 330 Project 1.
//                 But it should be sufficient for this project it just needs to be simplified like a lot.
//                 I can keep the layout with a couple image links for type of ideas. But let's table that
//                 for if I have time because it can work without images it will just look kinda boring.
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>
.card
{
    width: auto;
    height: auto;
    position: relative;
}
button:hover
{
    background-color: #67468c;
}
@media screen and (min-width: 760px)
{
  .card
  {
      width: 300px;
      height: 400px;
      position: relative;
      overflow: auto;
  }
  button:hover
  {
      background-color: #67468c;
  }
  /* width */
  ::-webkit-scrollbar 
  {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track 
  {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb 
  {
      background: #1985A1; 
      border-radius: 5px; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover 
  {
    background: #67468c; 
  }
}
</style>
<div>
    <div class="card" pb-3 pr-3>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5" id="title"></p>
          <p class="subtitle is-5" id="type"></p>
          <p class="subtitle is-6" id="description"></]>
        </div>
      </div>
      <div class="content"></div>
    </div>
    </div>
</div>
`;

class IdeaCard extends HTMLElement {
  constructor() {
    super();
    // 1 - attach a shadow DOM tree to this instace -  this creates `.shadowRoot` for us
    this.attachShadow({ mode: 'open' });

    // 2 - Clone `template` and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#title').innerHTML = this.dataset.title;
    this.shadowRoot.querySelector('#type').innerHTML = this.dataset.type;
    this.shadowRoot.querySelector('#description').innerHTML = this.dataset.description;
  }
}
customElements.define('idea-card', IdeaCard);
