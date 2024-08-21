import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import Line from "./Line";

@customElement("dz-svg-editor")
class SVGEditor extends LitElement {
    @property({type: String})
    width?: string = "500px";
    
    @property({type: String})
    height?: string = "500px";

    session?: any = {};

    static styles = css`
        :host {
            font-size: 1.2rem;
        }

        #wrapper {
            display: flex;
            flex-direction: column;
        }

        #toolbar {
            display: flex;
            flex-direction: row;
            gap: 10px;
        }

        #drawingArea {
            border: 1px solid black;
            flex-grow: 1;
        }
    `;

    onClear() {
        this.svg?.replaceChildren();
    }

    onCopy() {
        if (!navigator.clipboard) {
            console.error("Copying is not supported.");
        }
        navigator.clipboard.writeText(this.svg?.outerHTML ?? "");
    }

    onLineTool() {
        console.log("Clicked on Line tool");
        this.session.tool = new Line();
    }

    onClickDrawingArea (event: MouseEvent) {
        if (!this.session.tool) {
            return;
        }
        this.session.tool.onStep(this.svg, {x: event.offsetX, y: event.offsetY});
    }

    onMouseMoveDrawingArea(event: MouseEvent) {
        if (!this.session.tool) {
            return;
        }
        this.session.tool.onMove(this.svg, {x: event.offsetX, y: event.offsetY});
    }
    
    render() {
        return html`
            <div id="wrapper" style="width: ${this.width}; height: ${this.height};">
                <div id="toolbar">
                    <span style="font-weight: bold;">Toolbar</span>
                    <button id="line" @click="${this.onLineTool}">Line</button>
                    <button id="clear" @click="${this.onClear}">Clear</button>
                    <button id="copy" @click="${this.onCopy}">Copy SVG</button>
                </div>
                <svg id="drawingArea" width="${this.width}" height="${this.height}" @click="${this.onClickDrawingArea}" @mousemove="${this.onMouseMoveDrawingArea}"></svg>
            <div>
        `;
    }

    get svg() {
        return this.shadowRoot?.getElementById("drawingArea");
    }
}

export default SVGEditor;