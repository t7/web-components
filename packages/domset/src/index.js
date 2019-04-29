/**
* @func domset
* @desc Return a DOM structure set with new properties, attributes, and children.
* @param {String} [id] - The node being referenced or created.
* @param {Object} [props] - The properties or attributes being assigned to the node.
* @param {...Node|String} [children] Additional nodes or text being appended to the node.
* @return {HTMLElement|DocumentFragment}
*/

export default function domset (id, props) {
	const node = id == null
		// void ids becomes fragments
		? document.createDocumentFragment()
	: id === Object(id)
		// objects are used as-is
		? id
	// new nodes are referenced then created
	: document.createElement(id);

	for (const name in props) {
		// conditionally set the node property
		if (name in node) {
			node[name] = props[name];
		}
		// conditionally remove the node attribute
		else if (props[name] === null && node.removeAttribute) {
			node.removeAttribute(name);
		}
		// conditionally set the node attribute
		else if (node.setAttribute) {
			node.setAttribute(name, props[name]);
		}
	}

	// conditionally assign children
	if (node.append) {
		node.append(...Array.prototype.slice.call(arguments, 2));
	}

	return node;
}
