export class RoundDescriptor {

    player: number;
    playerName?: string;
    move?: Move;
    round: number;

    constructor() {}

    public import(rawData: any) {
        this.player = rawData.hasOwnProperty('player') ? rawData.player : null;
        if (rawData.hasOwnProperty('playerName')) { this.playerName = rawData.playerName; }
        if (rawData.hasOwnProperty('move')) { this.move = rawData.move; }
        this.round = rawData.hasOwnProperty('round') ? rawData.round : null;
    }
}

export enum Move {
    Paper = 'paper',
    Rock = 'rock',
    Scissors = 'scissors'
}
