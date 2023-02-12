let count = 0;

class MarkdownReviewCommentGenerator extends HTMLElement {
    constructor() {
        super();

        const inputNames = this.hasAttribute("inputs")
            ? this.getAttribute("inputs").split(",").map(input => input.trim())
            : [];
        
        const defaultGenerate = () => "Supply the attributes \"inputs\" and \"generate\" to this element to generate a snippet.\n"
            + "See the following example:\n"
            + "```html\n"
            + "<div>\n"
            + "  <markdown-review-comment-generator\n"
            + "    inputs=\"greeting, addressee\"\n"
            + "    generate=\"`${greeting}, ${addressee}!`\"\n"
            + "  />\n"
            + "</div>\n"
            + "```";
        const generate = this.hasAttribute("generate")
            ? new Function(`{ ${inputNames.join(",")} }`, "return " + this.getAttribute("generate"))
            : defaultGenerate;

        const wrapper = document.createElement("details");
        wrapper.setAttribute("class", "note");
        const summary = document.createElement("summary");
        summary.innerText = "Generate a Markdown Code Review Comment";
        wrapper.append(summary);
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.setAttribute("class", "language-markdown");
        let values = { };
        inputNames.forEach(inputName => {
            values[inputName] = inputName;
        });
        code.innerText = generate(values);
        const inputs = inputNames
            .map(inputName => {
                const input = document.createElement("input");
                input.setAttribute("class", "md-input")
                input.setAttribute("type", "text");
                input.setAttribute("name", inputName);
                input.setAttribute("placeholder", inputName);
                input.setAttribute("aria-label", inputName);
                input.setAttribute("value", inputName);
                input.setAttribute("autocapitalize", "none");
                input.setAttribute("autocorrect", "off");
                input.setAttribute("autocomplete", "off");
                input.setAttribute("spellcheck", "off");
                input.addEventListener("change", (event) => {
                    values[inputName] = event.target.value;
                    code.innerText = generate(values);
                });
                const listItem = document.createElement("li");
                listItem.append(input);
                return listItem;
            });
        const list = document.createElement("ol");
        list.append(...inputs);
        wrapper.append(list);
        pre.append(code);
        wrapper.append(pre);
        this.append(wrapper);
    }
}

customElements.define("markdown-review-comment-generator", MarkdownReviewCommentGenerator);
