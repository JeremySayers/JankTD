import { Game } from "../index";
import Sandbox from "./sandbox";

class Entity {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    private visible: boolean = true;

    protected image: HTMLImageElement;

    constructor(x?: number, y?: number, width?: number, height?: number, imagePath?: string, image?: HTMLImageElement) {
        this.id = Sandbox.uuid();
        this.x = x || 0;
        this.y = y || 0;
        this.height = height || 0;
        this.width = width || 0;
        this.image = new Image();

        if (imagePath) {
            console.log(`Debug: Loading image from ${imagePath}.`)
            Sandbox.loadImage(this.image, imagePath);
        }
        else if (image != null) {
            this.image = image;
        }
    }

    update(delta: number) {}

    render(context: CanvasRenderingContext2D) {
        if (this.image != null && this.visible) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    clicked(game: Game){        
        return (this.visible && Sandbox.mouseCollidedWithEntity(game.mouseX, game.mouseY, this));
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}

export default Entity;