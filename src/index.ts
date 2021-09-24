import Entity from "./common/entity";
import Sandbox from "./common/sandbox";
import Scene from "./common/scene";
import GameState from "./enums/game-state";
import FpsCounter from "./ui/fps-counter";
import Menu from "./ui/menu";

export class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private scenes: Scene[];
    private activeScene: Scene;
    private gameState: GameState;
    private fpsCounter: FpsCounter;

    constructor() {
        this.gameState = GameState.Loading;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.fpsCounter = new FpsCounter();

        this.scenes = [];

        this.addScene(new Menu(this));

        this.create();
    }

    create() {
        window.requestAnimationFrame(this.loop);
    }

    loop = (delta: number) => {
        this.update(delta);
        this.render();

        window.requestAnimationFrame(this.loop)
    }

    update = (delta: number) => {
        this.activeScene?.update(delta)

        this.fpsCounter.update(delta);
    }

    render = () => {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 640, 480);
        this.activeScene?.render(this.context);
        
        this.fpsCounter.render(this.context);
    }

    addScene = (scene: Scene) => {
        this.scenes.push(scene);
    }

    makeSceneActive = (id: string) => {
        this.activeScene = this.scenes.find(scene => scene.id === id);
    }
}

new Game();
