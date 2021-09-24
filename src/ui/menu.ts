import Entity from "../common/entity";
import Sandbox from "../common/sandbox";
import Scene from "../common/scene";
import { Game } from "../index";
import PlayButton from "./play-button";

class Menu extends Scene {
    private backgroundImage: HTMLImageElement;
    private playButtonImage: HTMLImageElement;
    
    constructor(game: Game) {
        super(game);
        this.backgroundImage = new Image();
        this.playButtonImage = new Image();
        this.create()
    }

    async create() {
        await Sandbox.loadImage(this.backgroundImage, "menu.png");
        await Sandbox.loadImage(this.playButtonImage, "play_button.png");

        this.entities.push(new PlayButton(this.playButtonImage));

        this.game.makeSceneActive(this.id);
    }

    update(delta: number) {
        this.entities.map(entity => entity.update(delta));
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height);

        this.entities.map(entity => entity.render(context));
    }
}

export default Menu