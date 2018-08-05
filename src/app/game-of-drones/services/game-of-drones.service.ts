import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerDescriptor, GameDescriptor, MatchDescriptor } from '../models';
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

    registerRound(player: PlayerDescriptor, ) {

    }

    checkGameActive(): boolean {
        return this.gameActive.active;
    }

    checkMatchActive(): boolean {
        return this.gameActive.matchs.filter((match: MatchDescriptor) => match.isActive()).length > 0;
    }
    
    whoMoves() {
        let activeMatch = this.gameActive.matchs.filter((match: MatchDescriptor) => match.isActive());
        if (activeMatch.length > 0) {
            let nextPlayerNumber = activeMatch[0].nextPlayer();
            let player = this.gameActive.getPlayer(nextPlayerNumber);
            // let round = this.gameActive.getRound();
            
        }
        
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


    post() {

    }

}
