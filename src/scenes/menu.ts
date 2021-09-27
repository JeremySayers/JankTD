import Entity from "../common/entity";
import Sandbox from "../common/sandbox";
import Scene from "../common/scene";

class Menu extends Scene {
    private playButton: Entity;
    private background: Entity;

    create() {        
        this.background = new Entity(0, 0, 800, 480, "assets/menu.png");
        this.playButton = new Entity((this.game.canvas.width / 2) - (164 / 2), 320, 164, 82, "assets/play_button.png");
        
        this.entities.push(this.background);
        this.entities.push(this.playButton);

        this.game.makeSceneActive(this.id);
    }

    update(delta: number) {
        this.entities.map(entity => entity.update(delta));
    }

    render(context: CanvasRenderingContext2D) {
        this.entities.map(entity => entity.render(context));
    }

    onClick(event: MouseEvent) {
        if (Sandbox.mouseCollidedWithEntity(this.game.mouseX, this.game.mouseY, this.playButton)){
            this.game.nextScene();
        }
    }
}

export default Menu