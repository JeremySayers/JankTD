import Entity from "../common/entity";

class PlayButton extends Entity {
    private image: HTMLImageElement;
    
    constructor(image: HTMLImageElement) {
        super();
        this.image = image;
    }

    update(delta: number) {
        
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, (640 / 2) - (this.image.width / 2), 320, this.image.width, this.image.height);
    }
}

export default PlayButton