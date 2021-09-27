import Entity from "../../common/entity";

class RangeIndicator extends Entity {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    render(context: CanvasRenderingContext2D) {
        context.globalAlpha = .3;
        context.beginPath();
        context.fillStyle = "red";
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.globalAlpha = 1.0;
    }
}

export default RangeIndicator