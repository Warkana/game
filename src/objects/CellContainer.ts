import { GraphicConf } from "../conf/GraphicConf"
import { IButtonEventContainer } from "../ui/IButtonEventContainer";
import { IElementContainer } from "./IElementContainer";
import { Owner } from "../model/Owner";

export class CellContainer implements IButtonEventContainer, IElementContainer {

    private spriteBackground: PIXI.Sprite;
    private spriteElement: PIXI.Sprite;
    private spriteOwner: PIXI.Sprite;
    private spriteActiveOverlay: PIXI.Sprite;
    private spriteContainer: PIXI.Container;

    public constructor(width: number, height: number, x: number, y: number) {
        this.spriteContainer = new PIXI.Container();
        this.spriteBackground = new PIXI.Sprite(PIXI.utils.TextureCache[GraphicConf.cellBackground]);
        this.spriteContainer.addChild(this.spriteBackground);
        this.spriteOwner = new PIXI.Sprite(PIXI.utils.TextureCache[GraphicConf.friendlyBackground]);
        this.spriteOwner.visible = false;
        this.spriteContainer.addChild(this.spriteOwner);
        this.spriteElement = new PIXI.Sprite();
        this.spriteElement.visible = false;    
        this.spriteContainer.addChild(this.spriteElement); 
        this.spriteActiveOverlay = new PIXI.Sprite(PIXI.utils.TextureCache[GraphicConf.cellOverOverlay]);
        this.spriteActiveOverlay.visible = false;
        this.spriteContainer.addChild(this.spriteActiveOverlay);
        this.spriteContainer.position.set(x, y);
    }

    public getSpriteContainer(): PIXI.Container {
        return this.spriteContainer;
    }

    public pointerOverApply() {
        this.spriteActiveOverlay.visible = true;
    }

    public pointerOutApply() {
        this.spriteActiveOverlay.visible = false;
    }

    public pointerDownApply() {
        this.spriteActiveOverlay.texture = PIXI.utils.TextureCache[GraphicConf.cellDownOverlay];
    }

    public pointerUpApply() {
        this.spriteActiveOverlay.texture = PIXI.utils.TextureCache[GraphicConf.cellOverOverlay];
    }

    public pointerUpOutsideApply() {
        this.spriteActiveOverlay.texture = PIXI.utils.TextureCache[GraphicConf.cellOverOverlay];
        this.spriteActiveOverlay.visible = false;
    }

    public setOwner(owner: Owner) {
        switch(owner) {
            case Owner.NONE:
                this.spriteOwner.visible = false;
                return;
            case Owner.FRIEND: 
                this.spriteOwner.texture = PIXI.utils.TextureCache[GraphicConf.friendlyBackground];
                this.spriteOwner.visible = true;
                return;
            case Owner.ENEMY:
                this.spriteOwner.texture = PIXI.utils.TextureCache[GraphicConf.enemyBackground];
                this.spriteOwner.visible = true;
                return;
            default: 
                throw new Error("Server error, such owner doesn't exist");
        }
    }

    public setEmpty() {
        this.spriteElement.visible = false;
    }
    
    public setAir() {
        this.spriteElement.texture = PIXI.utils.TextureCache[GraphicConf.airElement];
        this.spriteElement.visible = true;
    }

    public setFire() {
        this.spriteElement.texture = PIXI.utils.TextureCache[GraphicConf.fireElement];
        this.spriteElement.visible = true;
    }

    public setEarth() {
        this.spriteElement.texture = PIXI.utils.TextureCache[GraphicConf.fireElement];
        this.spriteElement.visible = true;
    }

    public setWater() {
        this.spriteElement.texture = PIXI.utils.TextureCache[GraphicConf.waterElement];
        this.spriteElement.visible = true;
    }
}