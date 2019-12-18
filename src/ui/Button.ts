import * as PIXI from 'pixi.js';
import { ISubscriber } from './ISubscriber';

export class Button {
    textureMain: PIXI.Texture;
    texturePointerDown: PIXI.Texture;
    texturePointerOn: PIXI.Texture;
    sprite: PIXI.Sprite;

    isActive: boolean;
    isDown: boolean;
    isOver: boolean;

    downSubscribers: Array<ISubscriber>;
    upSubscribers: Array<ISubscriber>;
    overSubscribers: Array<ISubscriber>;
    outSubscribers: Array<ISubscriber>;

    constructor(mainTexture: string, pointerDownTexture: string, pointerOnTexture: string) {
        this.textureMain = PIXI.Loader.shared.resources[mainTexture].texture;
        this.texturePointerDown = PIXI.Loader.shared.resources[pointerDownTexture].texture;
        this.texturePointerOn = PIXI.Loader.shared.resources[pointerOnTexture].texture; 
        this.sprite = new PIXI.Sprite(this.textureMain);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;

        this.sprite
            .on('pointerdown', () => this.onDown(this))
            .on('pointerup', () => this.onUp(this))
            .on('pointerover', () => this.onOver(this))
            .on('pointerout', () => this.onOut(this))
            .on('mouseupoutside', () => this.onUpOutside(this));

        this.downSubscribers = [];
        this.upSubscribers = [];
        this.overSubscribers = [];
        this.outSubscribers = [];
    }

    public subscribeDown(subscriber: ISubscriber) {
        this.downSubscribers.push(subscriber);
    }

    public subscribeUp(subscriber: ISubscriber) {
        this.upSubscribers.push(subscriber);
    }

    public subscribeOver(subscriber: ISubscriber) {
        this.overSubscribers.push(subscriber);
    }

    private onDown(button: Button) {
        button.isDown = true;
        button.sprite.texture = button.texturePointerDown;

        button.downSubscribers.forEach(s=>s.notify(button));
    }

    private onUp(button: Button) {
        button.isDown = false;
        button.sprite.texture = button.textureMain;

        button.upSubscribers.forEach(s=>s.notify(button));
    }

    private onUpOutside(button: Button) {
        button.isDown = false;
        button.sprite.texture = button.textureMain;
    }

    private onOver(button: Button) {
        button.isOver = true;
        if(button.isDown) {
            return;
        }
        button.sprite.texture = button.texturePointerOn;

        button.overSubscribers.forEach(s=>s.notify(button));
    }

    private onOut(button: Button) {
        button.isOver = false;
        if(button.isDown) {
            return;
        }
        button.sprite.texture = button.textureMain;

        button.outSubscribers.forEach(s=>s.notify(button));
    }
}