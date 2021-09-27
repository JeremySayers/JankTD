import Tower from "./tower";

class LightningTower extends Tower {

    constructor(x: number, y: number, image: HTMLImageElement){
        super(x, y, 75, image);
    }
}

export default LightningTower