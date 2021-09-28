import Coordinate from "../common/coordinate";
import Entity from "../common/entity";
import Sandbox from "../common/sandbox";
import Scene from "../common/scene";
import Enemy from "../components/main/enemy";
import LightningTower from "../components/main/lightning-tower";
import Tower from "../components/main/tower";
import GameState from "../enums/game-state";
import { Game } from "../index";

class Main extends Scene {
    private map: Entity;
    private mapWaypoints: Coordinate[];
    private infoPanel: Entity;
    private lightningTowerButton: Entity;
    private startButton: Entity;
    private pauseButton: Entity;
    private enemiesSent: number = 0;
    private timeSinceLastEnemy: number = 0;
    private lightningTowerImage: HTMLImageElement = new Image();

    private isTowerCurrentlyBeingPlaced: boolean = false;
    private towerCurrentlyBeingPlaced: Tower;
    private state: GameState = GameState.PreRound;

    create() {
        this.mapWaypoints = [
            {x:81, y:0},
            {x:81, y:223},
            {x:317, y:223},
            {x:317, y:82},
            {x:553, y:82},
            {x:553, y:325},
            {x:81, y:325},
            {x:79, y:420},
            {x:562, y:420},
            {x:562, y:490},
        ];

        Sandbox.loadImage(this.lightningTowerImage, "assets/lightning_tower.png");

        this.map = new Entity(0, 0, 640, 480, "assets/map.png");
        this.infoPanel = new Entity(640, 0, 160, 480, "assets/info_panel.png");
        this.lightningTowerButton = new Entity(650, 10, 32, 32, null, this.lightningTowerImage);
        this.startButton = new Entity(650, 410, 140, 60, "assets/start_button.png");
        this.pauseButton = new Entity(650, 410, 140, 60, "assets/pause_button.png");
        this.pauseButton.hide();

        this.entities.push(this.map);
        this.entities.push(this.infoPanel);
        this.entities.push(this.lightningTowerButton);        
        this.entities.push(this.startButton);
        this.entities.push(this.pauseButton);
    }

    update(delta: number) {
        if (this.state == GameState.Round) {
            this.timeSinceLastEnemy += delta;

            if ((this.enemiesSent == 0) || (this.enemiesSent < 20 && this.timeSinceLastEnemy >= .5)) {
                const enemy = new Enemy(81, -32, 100, this.mapWaypoints, this.lightningTowerImage)
                this.entities.push(enemy);
                this.enemiesSent++;
                this.timeSinceLastEnemy = 0;
            }

            this.entities = this.entities.filter(entity => !(entity instanceof Enemy) || (entity instanceof Enemy && !entity.completedRoute));

            if (this.entities.filter(entity => entity instanceof Enemy).length == 0) {
                this.state = GameState.PreRound;
                this.pauseButton.hide();
                this.startButton.show();
            }
        }
        
        this.entities.map(entity => entity.update(delta));
    }

    render(context: CanvasRenderingContext2D) {
        this.entities.map(entity => entity.render(context));
    }

    startRound() {
        this.state = GameState.Round;        
        this.enemiesSent = 0;
        this.timeSinceLastEnemy = 0;
    }

    pauseRound() {
        this.state == GameState.Pause;
    }

    onClick(event: MouseEvent) {
        if (this.isTowerCurrentlyBeingPlaced) {
            this.towerCurrentlyBeingPlaced.hideRangeIndicator();

            this.isTowerCurrentlyBeingPlaced = false;
            this.towerCurrentlyBeingPlaced = null;
            this.game.canvas.style.cursor = "default";

            return;
        }

        if (this.startButton.clicked(this.game)){
            console.log(`Debug: Entity clicked: ${this.startButton.id}`);
            this.startRound();
            this.startButton.hide();
            this.pauseButton.show();
            return;
        }

        if (this.pauseButton.clicked(this.game)){
            this.state = GameState.Pause;
            this.startButton.show();
            this.pauseButton.hide();
            return;
        }

        this.entities.map(entity => {
            if ((entity instanceof Tower)){
                entity.hideRangeIndicator();
            }
        });

        const clickedTower = this.entities.find(entity => (entity instanceof Tower) && (entity.clicked(this.game))) as Tower;

        if (clickedTower) {
            clickedTower.showRangeIndicator();
        }

        if (this.lightningTowerButton.clicked(this.game)){
            this.isTowerCurrentlyBeingPlaced = true;
            this.game.canvas.style.cursor = "none";

            this.towerCurrentlyBeingPlaced = new LightningTower(this.game.mouseX - 16, this.game.mouseY - 16, this.lightningTowerImage);    
            this.towerCurrentlyBeingPlaced.showRangeIndicator();
            this.entities.push(this.towerCurrentlyBeingPlaced);
        }
    }

    onMouseMove(event: MouseEvent) {
        if (this.isTowerCurrentlyBeingPlaced) {            
            this.towerCurrentlyBeingPlaced.x = event.clientX - this.game.canvas.offsetLeft - 16;
            this.towerCurrentlyBeingPlaced.y = event.clientY - this.game.canvas.offsetTop - 16;
        }
    }
}

export default Main