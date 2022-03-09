import { fetchComponent } from "./index.js";

class Component extends HTMLElement {
	constructor() {
		super();
		this.dispatchEvent(new CustomEvent('loaded'))

		setTimeout(async () => {
			if (!this.hasAttribute("path"))
				throw new Error("`path` attribute required in <component> tags!");

			if (!this.hasAttribute("name"))
				throw new Error("`name` attribute required in <component> tags!");
			this.attachShadow({ mode: "open" });

			const fragment = await fetchComponent(
				this.getAttribute("path"),
				this.getAttribute("name")
			);
			
			this.shadowRoot.appendChild(fragment);
		}, 1);
	}
}

customElements.define("component-", Component);
