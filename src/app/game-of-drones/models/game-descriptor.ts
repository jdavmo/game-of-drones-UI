import { PlayerDescriptor } from './player-descriptor';
import { MatchDescriptor } from './match-descriptor';

export class GameDescriptor {

    _id?: string;
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

    public getMatchActiveIndex(): number {
        let index: number;
        this.matchs.forEach((match: MatchDescriptor, _index: number) => {
            if (match.isActive()) {
                index = _index;
            }
        });
        return index;
    }

    public getStatsMatchs(): number {
        let matchsComplete = this.matchs.filter((match: MatchDescriptor) => match.active === false);
        return matchsComplete.length;
    }

    public getCountMatchsWonByPlayer() {
        let players: { [property: string]: any } = {};
        players[1] = 0;
        players[2] = 0;
        this.matchs.forEach(match => {
            let score = match.getScore();
            if (score['1'] === 3) {
                players[1]++;
            }
            if (score['2'] === 3) {
                players[2]++;
            }
        });
        return players;
    }

    public import(rawData: any) {
        this._id = rawData.hasOwnProperty('_id') ? rawData._id : null;
        this.date = rawData.hasOwnProperty('date') ? rawData.date : Math.floor(Date.now() / 1000);
        this.active = rawData.hasOwnProperty('active') ? rawData.active : null;
        if (rawData.hasOwnProperty('players')) {
            this.players = [];
            for (let i = 0; i < rawData.players.length; i++) {
                let player: PlayerDescriptor = new PlayerDescriptor();
                let row = rawData.players[i];
                player.import(row);
                this.registerPlayer(player);
            }
        }
        if (rawData.hasOwnProperty('matchs')) {
            this.matchs = [];
            for (let i = 0; i < rawData.matchs.length; i++) {
                let match: MatchDescriptor = new MatchDescriptor();
                let row = rawData.matchs[i];
                match.import(row);
                this.registerMatch(match);
            }
        }
    }
}
