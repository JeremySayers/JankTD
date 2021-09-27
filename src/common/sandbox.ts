import Entity from "./entity";

export default class Sandbox {
    static loadImage = (imageObject: HTMLImageElement, sourceUrl: string) => {
        return new Promise((resolve, reject) => {
            imageObject.onload = () => resolve(imageObject);
            imageObject.onerror = reject;
            imageObject.src = sourceUrl;
          });
    }

    static uuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static mouseCollidedWithEntity = (mouseX: number, mouseY: number, entity: Entity) => {
        return (((mouseX >= entity.x) && (mouseX <= entity.x + entity.width))
            && ((mouseY >= entity.y) && (mouseY <= entity.y + entity.height)));
    }
}