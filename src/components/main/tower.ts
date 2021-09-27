import Entity from "../../common/entity";
import RangeIndicator from "./range-indicator";

class Tower extends Entity {
    private range: number;
    private rangeIndicator: RangeIndicator;

    constructor(x: number, y: number, range: number, image: HTMLImageElement){
        super(x, y, 32, 32, null, image);
        this.range = range;
    }

    update(delta: number) {
        if (this.rangeIndicator) {
            this.rangeIndicator.x = this.x + 16;
            this.rangeIndicator.y = this.y + 16;
        }
    }

    render(context: CanvasRenderingContext2D) {
        super.render(context);

        if (this.rangeIndicator) {
            this.rangeIndicator.render(context);
        }
    }

    showRangeIndicator() {
        this.rangeIndicator = new RangeIndicator(this.range);
    }

    hideRangeIndicator() {
        this.rangeIndicator = null;
    }
}

export default Tower