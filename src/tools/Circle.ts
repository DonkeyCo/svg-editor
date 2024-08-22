import { Position } from "../SVGEditor";
import Tool from "./Tool";

class Circle extends Tool {
    fill: string;
    strokeWidth: string;

    constructor(color = "black", fill="none", strokeWidth="1") {
        super(color);
        this.state.clicks = [];
        this.fill = fill;
        this.strokeWidth = strokeWidth;
    }

    onStep(svg: HTMLElement, position: Position): void {
        this.state.clicks.push(position);
        if (this.state.clicks.length === 2) {
            const pos1 = this.state.clicks[0], pos2 = this.state.clicks[1];
            const circle = this.createCircle(pos1, pos2);
            svg.appendChild(circle);

            this.reset(svg);
        }
    }

    onMove(svg: HTMLElement, position: Position): void {
        if (this.state.clicks.length !== 1) {
            return;
        }

        const pos1 = this.state.clicks[0];
        if (!this.state.shadow) {
            this.state.shadow = this.createCircle(pos1, position, "0.3");
            svg.appendChild(this.state.shadow);
        } else {
            this.state.shadow.setAttribute("r", `${this.getRadius(pos1, position)}`);
        }
    }

    reset(svg: HTMLElement): void {
        this.state.shadow && svg.removeChild(this.state.shadow);
        this.state.clicks = [];
        this.state.shadow = null;
    }

    createCircle(pos1: Position, pos2: Position, opacity="1") {
        const circle = this.createSVGElement("circle");

        circle.setAttribute("cx", pos1.x);
        circle.setAttribute("cy", pos1.y);
        circle.setAttribute("stroke", this.color);
        circle.setAttribute("stroke-width", this.strokeWidth);
        circle.setAttribute("opacity", opacity);
        circle.setAttribute("fill", this.fill)
        circle.setAttribute("r", `${this.getRadius(pos1, pos2)}`);

        return circle;
    }

    private getRadius(pos1: Position, pos2: Position) {
        const dX = Math.abs(parseInt(pos1.x) - parseInt(pos2.x)),
            dY = Math.abs(parseInt(pos1.y) - parseInt(pos2.y));
        return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    }
}

export default Circle;