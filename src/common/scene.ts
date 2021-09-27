import { Game } from "../index";
import Entity from "./entity";
import Sandbox from "./sandbox";

class Scene {
    id: string;
    protected game: Game;
    protected entities: Entity[];

    constructor(game: Game) {
        this.id = Sandbox.uuid();
        this.entities = [];
        this.game = game;
    }

    create() {}
    update(delta: number) {}
    render(context: CanvasRenderingContext2D) {}
    onClick(event: MouseEvent) {}
    onMouseMove(event: MouseEvent) {}
}

export default Scene;