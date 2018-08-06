import { RoundDescriptor } from './round-descriptor';

export class MatchDescriptor {

    date: number = Math.floor(Date.now() / 1000);
    active: boolean = true;
    rounds: RoundDescriptor[] = [];

    constructor() { }

    public registerRound(round: RoundDescriptor) {
        this.rounds.push(round);
    }

    public finishMatch() {
        this.active = false;
    }

    public isActive() {
        return this.active;
    }

    private getRounds() {
        let rounds: { [property: string]: any } = {};
        this.rounds.forEach(round => {
            if (!rounds.hasOwnProperty(round.round)) {
                rounds[round.round] = {};
            }
            rounds[round.round][round.player] = round;
        });
        return rounds;
    }

    public getRound() {
        let round: number = 1;
        let rounds = this.getRounds();
        if (Object.keys(rounds).length > 0) {
            let maxRound = Math.max(...Object.keys(rounds).map(Number));
            if (rounds[maxRound].hasOwnProperty('1')) {
                round = maxRound;
            }
            if (rounds[maxRound].hasOwnProperty('2')) {
                round++;
            }
        }
        return round;
    }

    public nextPlayer() {
        let player: number = 1;
        let rounds = this.getRounds();
        if (Object.keys(rounds).length > 0) {
            let maxRound = Math.max(...Object.keys(rounds).map(Number));
            if (rounds[maxRound].hasOwnProperty('1')) {
                player = 2;
            }
            if (rounds[maxRound].hasOwnProperty('2')) {
                player = 1;
            }
        }
        return player;
    }

    public getScore() {
        let players: { [property: string]: any } = {};
        players[1] = 0;
        players[2] = 0;
        let rounds = this.getRounds();
        let movePlayerOne: string;
        let movePlayerTwo: string;

        Object.keys(rounds).forEach(roundNumber => {

            if (rounds[roundNumber].hasOwnProperty('1')) {
                movePlayerOne = rounds[roundNumber]['1'].move;
            }
            if (rounds[roundNumber].hasOwnProperty('2')) {
                movePlayerTwo = rounds[roundNumber]['2'].move;
            }
            if (movePlayerOne && movePlayerTwo) {
                let winner = this.getWinnerRound(movePlayerOne, movePlayerTwo);
                if (winner > 0) {
                    players[winner]++;
                }
            }
            movePlayerOne = '';
            movePlayerTwo = '';
        });

        return players;
    }

    private getWinnerRound(playerOne, playerTwo) {
        if (playerOne ===  playerTwo) {
            return 0;
        }
        if (playerOne === 'scissors') {
            if (playerTwo === 'rock') {
                return 2;
            } else {
                return 1;
            }
        }
        if (playerOne === 'paper') {
            if (playerTwo === 'rock') {
                return 1;
            } else {
                return 2;
            }
        }
        if (playerOne === 'rock') {
            if (playerTwo === 'scissors') {
                return 1;
            } else {
                return 2;
            }
        }
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
