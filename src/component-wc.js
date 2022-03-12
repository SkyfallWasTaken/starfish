import { fetchComponent } from "./index.js";

class Component extends HTMLElement {
	constructor() {
		super();

		setTimeout(async () => {
			const src = this.getAttribute("path");
			const name = this.getAttribute("name");

			if (!name)
				throw new Error(`[loading ${src}] \`name\` attribute required in <component> tags!`);

			if (!src)
				throw new Error(
					`[loading ${name}] \`src\` attribute required in <component> tags!`
				);

			this.attachShadow({ mode: "open" });

			const fragment = await fetchComponent(src, name);

			this.shadowRoot.appendChild(fragment);
		}, 0);
	}
}

customElements.define("component-", Component);
