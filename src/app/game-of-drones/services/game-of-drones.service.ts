import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerDescriptor, GameDescriptor, MatchDescriptor, RoundDescriptor } from '../models';
import { ConfigService } from '@shared/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { GAME_MOCK } from '../../mocks/game.mock';

@Injectable({
    providedIn: 'root'
})
export class GameOfDronesService {

    static resource: string = "category.json";
    private gameActive: GameDescriptor;

    constructor(private _http: HttpClient, private _config: ConfigService) { }

    start(playerOne: PlayerDescriptor, playerTwo: PlayerDescriptor) {
        this.gameActive = new GameDescriptor();
        this.gameActive.registerPlayer(playerOne);
        this.gameActive.registerPlayer(playerTwo);
        this.gameActive.matchs.push(new MatchDescriptor());
    }

    startNewMatch() {
        this.gameActive.matchs.push(new MatchDescriptor());
    }

    finishGame() {
        this.gameActive.active = false;
    }

    finishMatch() {
        this.gameActive.matchs[this.gameActive.getMatchActiveIndex()].active = false;
    }

    registerRound(round: RoundDescriptor) {
        delete round.playerName;
        this.gameActive.matchs[this.gameActive.getMatchActiveIndex()].registerRound(round);
    }

    existWinner(): boolean {
        let score = this.getScore();
        if (score.hasOwnProperty('1') && score.hasOwnProperty('2')) {
            return score['1'] === 3 || score['2'] === 3;
        }
        return false;
    }

    getStats() {
        let stats: object = {};
        stats['matchs'] = this.gameActive.getStatsMatchs();
        stats['players'] = this.gameActive.players;
        stats['gamesWon'] = this.gameActive.getCountMatchsWonByPlayer();
        return stats;
    }

    isGameActive(): boolean {        
        if (this.gameActive) {
            return this.gameActive.active;
        }
        return false;
    }

    getScore() {
        return this.gameActive.matchs[this.gameActive.getMatchActiveIndex()].getScore();
    }

    isMatchActive(): boolean {
        return this.gameActive.matchs.filter((match: MatchDescriptor) => match.isActive()).length > 0;
    }
    
    whoMoves(): Object {
        let activeMatch = this.gameActive.matchs.filter((match: MatchDescriptor) => match.isActive());
        let nextGame: Object = {};
        if (activeMatch.length > 0) {
            let player = this.gameActive.getPlayer(activeMatch[0].nextPlayer());
            nextGame['player'] = player[0].player;
            nextGame['playerName'] = player[0].name;
            nextGame['round'] = activeMatch[0].getRound();
        }
        return nextGame;
    }
    /*start(playerOne: PlayerDescriptor, playerTwo: PlayerDescriptor): Observable<GameDescriptor> {
        return new Observable(observable => {
            this.gameActive = new GameDescriptor();
            this.gameActive.import(GAME_MOCK);
            console.log(this.gameActive);
            observable.next(this.gameActive);
            observable.complete();
            this._http.get('./mocks/game.json')
                .pipe(
                    catchError(e => throwError(e))
                )
                .subscribe(response => {
                    observable.next(GameDescriptor.import(response));
                    observable.complete();
                });
        });
    }*/

}
