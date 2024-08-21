class Line {
    color: string = "black";
    state: any = {};

    constructor() {
        this.state.clicks = [];
    }

    onStep(svg: HTMLElement, position: any) {
        this.state.clicks.push({x: position.x, y: position.y});
        if (this.state.clicks.length === 2) {
            const pos1 = this.state.clicks[0], pos2 = this.state.clicks[1];
            const line = this.createLine({x: pos1.x, y: pos1.y}, {x: pos2.x, y: pos2.y}, this.color);
            svg.appendChild(line);

            this.reset(svg);
        }
    }

    onMove(svg: HTMLElement, position: any) {
        if (this.state.clicks.length !== 1) {
            return;
        }

        if (!this.state.shadow) {
            const pos1 = this.state.clicks[0];
            this.state.shadow = this.createLine({x: pos1.x, y: pos1.y}, {x: position.x, y: position.y}, this.color, "0.3");
            svg.appendChild(this.state.shadow);
        } else {
            this.state.shadow.setAttribute("x2", position.x);
            this.state.shadow.setAttribute("y2", position.y);
        }
    }

    reset(svg: HTMLElement) {
        this.state.shadow && svg.removeChild(this.state.shadow);
        this.state.clicks = [];
        this.state.shadow = null;
    }

    createLine(pos1: any, pos2: any, color: string, opacity="1") {
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  
        line.setAttribute("x1", pos1.x);
        line.setAttribute("y1", pos1.y);
        line.setAttribute("x2", pos2.x);
        line.setAttribute("y2", pos2.y);
        line.setAttribute("stroke", color);
        line.setAttribute("opacity", opacity);

        return line;
    }
}

export default Line;