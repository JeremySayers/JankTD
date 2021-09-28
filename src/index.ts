import Scene from "./common/scene";
import FpsCounter from "./common/fps-counter";
import Menu from "./scenes/menu";
import Main from "./scenes/main";

export class Game {
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private scenes: Scene[];
    private activeScene: Scene;
    private fpsCounter: FpsCounter;
    mouseX: number = 0;
    mouseY: number = 0;
    private oldTimeStamp = 0;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.fpsCounter = new FpsCounter();

        this.scenes = [];

        this.addScene(new Menu(this));
        this.addScene(new Main(this));

        this.create();
    }

    create() {
        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
            this.mouseX = event.clientX - this.canvas.offsetLeft;
            this.mouseY = event.clientY - this.canvas.offsetTop;

            this.scenes.map(scene => scene.onMouseMove(event))
        });
        
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.scenes.map(scene => scene.onClick(event))
        });

        window.requestAnimationFrame(this.loop);
    }

    loop = (timestamp: number) => {
        const delta = (timestamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timestamp;
        this.update(delta);
        this.render();       

        this.fpsCounter.update(timestamp);

        window.requestAnimationFrame(this.loop)
    }

    update = (delta: number) => {
        this.activeScene?.update(delta)
    }

    render = () => {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 800, 480);
        this.activeScene?.render(this.context);
        
        this.fpsCounter.render(this.context);
    }

    addScene = (scene: Scene) => {
        this.scenes.push(scene);
        scene.create();
    }

    makeSceneActive = (id: string) => {
        console.log(`Debug: Making scene active: ${id}.`);
        this.activeScene = this.scenes.find(scene => scene.id === id);

        if (!this.activeScene) {
            console.log(`Debug: Failed to make scene active: ${id}.`);
        }
        
    }

    nextScene = () => {
        const nextScene = this.scenes[this.scenes.findIndex(scene => scene.id === this.activeScene.id) + 1];
        this.makeSceneActive(nextScene.id);
    }
}

new Game();
