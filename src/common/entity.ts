import Sandbox from "./sandbox";

class Entity {
    id: string;

    constructor() {
        this.id = Sandbox.uuid();
    }

    update(delta: number) {}
    render(context: CanvasRenderingContext2D) {}
}

export default Entity;