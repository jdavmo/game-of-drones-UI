import { RoundDescriptor } from './';

export class MatchDescriptor {

    date: number = Math.floor(Date.now() / 1000);
    active: boolean = true;
    rounds: RoundDescriptor[] = [];

    constructor() {}

    public registerRound(round: RoundDescriptor) {
        this.rounds.push(round);
    }

    public finishMatch() {
        this.active = false;
    }

    public isActive() {
        return this.active;
    }

    public nextPlayer() {
        let player: number = 1;
        let rounds: {[property:string]:any} = {};
        this.rounds.forEach(round => {
            let _round = round.round;
            rounds[round.round][round.player] = round;
            /*this.rounds.forEach(round => {

            });*/
        });

        console.log(rounds);

        return player;
    }

    public import(rawData: any) {

        this.date = rawData.hasOwnProperty('date') ? rawData.date : Math.floor(Date.now() / 1000);
        this.active = rawData.hasOwnProperty('active') ? rawData.active : null;

        for (let i = 0; i < rawData.rounds.length; i++) {
            let round: RoundDescriptor = new RoundDescriptor();
            let row = rawData.rounds[i];
            round.import(row);
            this.registerRound(round);
        }
    }
}
