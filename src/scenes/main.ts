import Entity from "../common/entity";
import Sandbox from "../common/sandbox";
import Scene from "../common/scene";
import { Game } from "../index";

class Main extends Scene {  
    private map: Entity;
    private infoPanel: Entity;

    create() {
        this.map = new Entity(0, 0, 640, 480, "assets/map.png");
        this.infoPanel = new Entity(640, 0, 160, 480, "assets/info_panel.png");

        this.entities.push(this.map);
        this.entities.push(this.infoPanel);
    }

    update(delta: number) {
        this.entities.map(entity => entity.update(delta));
    }

    render(context: CanvasRenderingContext2D) {

        this.entities.map(entity => entity.render(context));
    }
}

export default Main