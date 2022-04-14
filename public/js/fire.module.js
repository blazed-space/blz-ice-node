/****************
    (c) 2022 Blazed Labs LLC;
        Blazed Publishing BD;
        https://blazed.space/
        >>   Blazed Fire   <<
        ** Blazed App Module **
        All Rights Reserved.
    (v) 3.0.0
****************/

class BlazedApp extends HTMLElement {
    constructor() {
        super();
        // Create shadow DOM
        // The shadow DOM is only
        // used to display certain
        // elements.
        var shadow = this.attachShadow({mode: 'open'});
        // Create source attribute for FIRE
        const sourceAttr = document.createElement("span");
        sourceAttr.style.display = "none";
        sourceAttr.textContent = "fire-3.1.0";
        shadow.appendChild(sourceAttr);
    }
    connectedCallback() {
        // On <blz-app> load
    }
    attributeChangedCallback(name, oldValue, newValue) {
        //console.log('Custom square element attributes changed.');
        //updateStyle(this);
    }
    disconnectedCallback() {
        // On <blz-app> unload
    }
}
window.customElements.define('blz-app', BlazedApp);

export default window;