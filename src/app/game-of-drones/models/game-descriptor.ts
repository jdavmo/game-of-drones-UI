import { PlayerDescriptor, MatchDescriptor } from './';
export class GameDescriptor {

    id?: string;
    date: number = Math.floor(Date.now() / 1000);
    active: boolean = true;
    players: PlayerDescriptor[] = [];
    matchs: MatchDescriptor[] = [];

    constructor() {}

    public registerPlayer(player: PlayerDescriptor) {
        this.players.push(player);
    }

    public registerMatch(match: MatchDescriptor) {
        this.matchs.push(match);
    }

    public getPlayer(playerNumber: number) {
        return this.players.filter((player: PlayerDescriptor) => player.player === playerNumber);
    }

    public import(rawData: any) {
        this.id = rawData.hasOwnProperty('id') ? rawData.id : null;
        this.date = rawData.hasOwnProperty('date') ? rawData.date : Math.floor(Date.now() / 1000);
        this.active = rawData.hasOwnProperty('active') ? rawData.active : null;

        if (rawData.hasOwnProperty('players')) {
            for (let i = 0; i < rawData.players.length; i++) {
                let player: PlayerDescriptor = new PlayerDescriptor();
                let row = rawData.players[i];
                player.import(row);
                this.registerPlayer(player);
            }
        }

        if (rawData.hasOwnProperty('matchs')) {
            for (let i = 0; i < rawData.matchs.length; i++) {
                let match: MatchDescriptor = new MatchDescriptor();
                let row = rawData.matchs[i];
                match.import(row);
                this.registerMatch(match);
            }
        }

    }
}
