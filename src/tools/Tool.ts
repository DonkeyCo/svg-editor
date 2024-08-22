import { Position } from "../SVGEditor";

export default abstract class Tool {
    color: string;
    state: any = {};

    constructor(color = "black") {
        this.color = color;
    }

    createSVGElement(tag: string) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }

    abstract onStep(svg: HTMLElement, position: Position): void;
    abstract onMove(svg: HTMLElement, position: Position): void;
    abstract reset(svg: HTMLElement): void;
};