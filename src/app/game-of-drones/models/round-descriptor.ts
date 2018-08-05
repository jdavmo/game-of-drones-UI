export class RoundDescriptor {

    player: number;
    move: Move;
    round: number;

    constructor() {}

    public import(rawData: any) {
        this.player = rawData.hasOwnProperty('player') ? rawData.player : null;
        this.move = rawData.hasOwnProperty('move') ? rawData.move : null;
        this.round = rawData.hasOwnProperty('round') ? rawData.round : null;
    }
}

export enum Move {
    Paper = 'paper',
    Rock = 'rock',
    Scissors = 'scissors'
}
