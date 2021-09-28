import Coordinate from "../../common/coordinate";
import Entity from "../../common/entity";
import RangeIndicator from "./range-indicator";

class Enemy extends Entity {
    private maxHealth: number;
    private currentHealth: number;
    private currentWaypointIndex: number;
    private waypoints: Coordinate[];
    private speed: number = 75;
    completedRoute: boolean = false;

    constructor(x: number, y: number, maxHealth: number, waypoints: Coordinate[], image: HTMLImageElement){
        super(x, y, 32, 32, null, image);
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.waypoints = waypoints;
        this.currentWaypointIndex = 0;
    }

    update(delta: number) {
        console.log(`Delta: ${delta}`);
        console.log(`Enemy: {x: ${this.x}, y: ${this.y}, currentWaypointIndex: ${this.currentWaypointIndex}}, completed: ${this.completedRoute}`);
        let completedX = false;
        let completedY = false;

        if (this.x == this.waypoints[this.currentWaypointIndex].x){
            completedX = true;
        }

        if (this.x < this.waypoints[this.currentWaypointIndex].x) {
            this.x += (this.speed * delta);
            if (this.x >= this.waypoints[this.currentWaypointIndex].x) {
                this.x = this.waypoints[this.currentWaypointIndex].x
                completedX = true;
            }
        }

        if (this.x > this.waypoints[this.currentWaypointIndex].x) {
            this.x -= (this.speed * delta);
            if (this.x <= this.waypoints[this.currentWaypointIndex].x) {
                this.x = this.waypoints[this.currentWaypointIndex].x
                completedX = true;
            }
        }

        if (this.y == this.waypoints[this.currentWaypointIndex].y){
            completedY = true;
        }

        if (this.y < this.waypoints[this.currentWaypointIndex].y) {
            this.y += (this.speed * delta);
            if (this.y >= this.waypoints[this.currentWaypointIndex].y) {
                this.y = this.waypoints[this.currentWaypointIndex].y
                completedY = true;
            }
        }

        if (this.y > this.waypoints[this.currentWaypointIndex].y) {
            this.y -= (this.speed * delta);
            if (this.y <= this.waypoints[this.currentWaypointIndex].y) {
                this.y = this.waypoints[this.currentWaypointIndex].y
                completedY = true;
            }
        }

        if (completedX && completedY && this.currentWaypointIndex == this.waypoints.length - 1) {
            this.completedRoute = true;
        }

        if (completedX && completedY && this.currentWaypointIndex < this.waypoints.length - 1) {
            this.currentWaypointIndex++;
        }        
    }

    render(context: CanvasRenderingContext2D) {
        if (this.image != null) {
            context.drawImage(this.image, this.x - 16, this.y - 16, this.width, this.height);
        }
    }
}

export default Enemy