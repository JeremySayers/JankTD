import Entity from "../common/entity";

class FpsCounter extends Entity {
    private secondsPassed: number;
    private oldTimeStamp: number;
    private fps: number;

    update(delta: number) {
        this.secondsPassed = (delta - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = delta;

        this.fps = Math.round(1 / this.secondsPassed);
    }

    render(context: CanvasRenderingContext2D) {
        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.fillText("FPS: " + this.fps, 10, 20);
    }
}

export default FpsCounter