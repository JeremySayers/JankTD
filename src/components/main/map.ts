import Entity from "../../common/entity";

class Map extends Entity {
    update(delta: number) {
        
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export default Map