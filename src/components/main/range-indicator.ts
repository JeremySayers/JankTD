import Entity from "../../common/entity";

class RangeIndicator extends Entity {
    render(context: CanvasRenderingContext2D) {
        context.globalAlpha = .3;
        context.beginPath();
        context.fillStyle = "red";
        context.arc(this.x, this.y, 75, 0, 2 * Math.PI);
        context.fill();
        context.globalAlpha = 1.0;
    }
}

export default RangeIndicator