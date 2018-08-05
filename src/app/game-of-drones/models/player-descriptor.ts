export class PlayerDescriptor {

    id?: string;
    name: string;
    player: number;

    constructor(player?) {
        this.player = player;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setId(id: string) {
        this.id = id;
    }

    public import(rawData: any) {
        this.id = rawData.hasOwnProperty('id') ? rawData.id : null;
        this.name = rawData.hasOwnProperty('name') ? rawData.name : "";
        this.player = rawData.hasOwnProperty('player') ? rawData.player : null;
    }

}
