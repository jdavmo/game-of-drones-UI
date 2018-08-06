export class PlayerDescriptor {

    name: string;
    player: number;

    constructor(player?) {
        this.player = player;
    }

    public setName(name: string) {
        this.name = name;
    }

    public import(rawData: any) {
        this.name = rawData.hasOwnProperty('name') ? rawData.name : '';
        this.player = rawData.hasOwnProperty('player') ? rawData.player : null;
    }

}
