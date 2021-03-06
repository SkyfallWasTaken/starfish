const parser = new DOMParser();
import "./component-wc.js";

const Eta = window["Eta"];
if (!Eta) throw new Error("Eta.js not found, please include it and try again.");
Eta.configure({
	cache: true,
	tags: ["{{", "}}"],
});

/**
 * @param path {string} The path to the component.
 * @param name {string} The name of the component, used for debugging purposes.
 */
export async function fetchComponent(path, name) {
	const response = await fetch(path);
	if (response.status != 200)
		throw new Error(
			`[load ${name}] ${path} load failed with error ${response.status}`
		);

	const text = await response.text();
	const template = parser.parseFromString(
		Eta.render(
			`
			<template>
				<div name="${name}">
					${text}
				</div>
			</template>
			`
		),
		"text/html"
	);

	const fragment = template.getElementsByTagName("template")[0].content;
	fragment.querySelectorAll("script").forEach((oldScript) => {
		const newScript = document.createElement("script");
		newScript.type = "module";
		if (oldScript.src) newScript.src = oldScript.src;
		newScript.innerHTML = oldScript.innerHTML;

		oldScript.parentNode.replaceChild(newScript, oldScript);
	});
	fragment.querySelectorAll("component").forEach((component) => {
		const replacement = document.createElement("component-", {});
		const componentPath = component.getAttribute("src");
		const componentName = component.getAttribute("name");

		replacement.setAttribute("path", componentPath);
		replacement.setAttribute("name", componentName);

		// Persist contents
		replacement.innerHTML = component.innerHTML;

		component.parentNode.replaceChild(replacement, component);
	});
	return fragment;
}

/**
 * @param app {string} The path to your app component.
 */
export default async function init(app) {
	const fragment = await fetchComponent(app, "App");
	document.body.appendChild(fragment);
}
