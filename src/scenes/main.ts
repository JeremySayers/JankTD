import Entity from "../common/entity";
import Sandbox from "../common/sandbox";
import Scene from "../common/scene";
import RangeIndicator from "../components/main/range-indicator";
import { Game } from "../index";

class Main extends Scene {  
    private map: Entity;
    private infoPanel: Entity;
    private lightningTowerButton: Entity;

    private lightningTowerImage: HTMLImageElement = new Image();

    private isTowerCurrentlyBeingPlaced: boolean = false;
    private towerCurrentlyBeingPlaced: Entity;
    private activeRangeIndicator: Entity;

    create() {
        Sandbox.loadImage(this.lightningTowerImage, "assets/lightning_tower.png");

        this.map = new Entity(0, 0, 640, 480, "assets/map.png");
        this.infoPanel = new Entity(640, 0, 160, 480, "assets/info_panel.png");
        this.lightningTowerButton = new Entity(650, 10, 32, 32, null, this.lightningTowerImage);

        this.entities.push(this.map);
        this.entities.push(this.infoPanel);
        this.entities.push(this.lightningTowerButton);
    }

    update(delta: number) {
        this.entities.map(entity => entity.update(delta));
    }

    render(context: CanvasRenderingContext2D) {
        this.entities.map(entity => entity.render(context));
    }

    onClick(event: MouseEvent) {
        if (this.isTowerCurrentlyBeingPlaced) {
            this.isTowerCurrentlyBeingPlaced = false;
            this.towerCurrentlyBeingPlaced = null;
            this.game.canvas.style.cursor = "default";
            this.entities.splice(this.entities.findIndex(entity => entity === this.activeRangeIndicator), 1);
            
            return;
        }

        if (this.lightningTowerButton.clicked(this.game)){
            this.isTowerCurrentlyBeingPlaced = true;
            this.game.canvas.style.cursor = "none";

            this.towerCurrentlyBeingPlaced = new Entity(this.game.mouseX - 16, this.game.mouseY - 16, 32, 32, null, this.lightningTowerImage);
            this.activeRangeIndicator = new RangeIndicator(this.towerCurrentlyBeingPlaced.x + 16, this.towerCurrentlyBeingPlaced.y + 16);            

            this.entities.push(this.towerCurrentlyBeingPlaced);
            this.entities.push(this.activeRangeIndicator);
        }
    }

    onMouseMove(event: MouseEvent) {
        if (this.isTowerCurrentlyBeingPlaced) {            
            this.towerCurrentlyBeingPlaced.x = event.clientX - this.game.canvas.offsetLeft - 16;
            this.towerCurrentlyBeingPlaced.y = event.clientY - this.game.canvas.offsetTop - 16;
            this.activeRangeIndicator.x = this.towerCurrentlyBeingPlaced.x + 16;
            this.activeRangeIndicator.y = this.towerCurrentlyBeingPlaced.y + 16;
        }
    }
}

export default Main