import { Game } from "../index";
import Entity from "./entity";

class Scene extends Entity {
    protected game: Game;
    protected entities: Entity[];

    constructor(game: Game) {
        super();
        this.entities = [];
        this.game = game;
    }

    create() {}
    update(delta: number) {}
    render(context: CanvasRenderingContext2D) {}
}

export default Scene;