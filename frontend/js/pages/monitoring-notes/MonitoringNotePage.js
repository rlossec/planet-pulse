import HeaderComponent from "../../base/HeaderComponent.js";
import AppComponent from "../../base/AppComponent.js";

export default class MonitoringNotePage extends AppComponent {
  template() {
    return `

    <header-component></header-component>

    <div class="conteneur-principal">
      
      <div class="bloc-entete">
        <h1><strong>Create monitoring note</strong></h1>
      </div>

      <form class="bloc-form">
        
        <div class="ligne-form">
          <label for="title">Title</label>
          <input type="text" class="champ-texte" id="title" placeholder="Enter the title of the monitoring note">
        </div>

        <div class="ligne-form">
          <label for="date">Date</label>
          <input type="text" class="champ-texte" id="date" placeholder="YYYY/MM/DD">
        </div>

        <div class="ligne-form">
          <label for="content">Content</label>
          <textarea class="champ-texte zone-texte" id="content" rows="6" placeholder="Enter note details...."></textarea>
        </div>

        <div class="conteneur-boutons">
          <button type="submit" class="bouton-save">Save</button>
          <button type="button" class="bouton-cancel">Cancel</button>
        </div>

      </form>
    </div>
      
    `;
    }

}

customElements.define("monitoring-note-page", MonitoringNotePage );