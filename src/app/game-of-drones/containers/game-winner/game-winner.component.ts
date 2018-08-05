import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOfDronesService } from '../../services';

@Component({
    selector: 'app-game-winner',
    templateUrl: './game-winner.component.html',
    styleUrls: ['./game-winner.component.scss']
})
export class GameWinnerComponent implements OnInit {

    score: Object;
    private rootUrl: string = '/game-of-drones';

    constructor(private router: Router, private _gameOfDrones: GameOfDronesService) { }

    ngOnInit() {
        if (this._gameOfDrones.isGameActive()) {
            this.validateWinner();
            this.finishMatch();
        } else {
            this.router.navigate([this.rootUrl + '/register']);
        }   
    }

    getWinner() {
        this.score = this._gameOfDrones.getScore();
    }

    rematch() {
        this._gameOfDrones.startNewMatch();
        this.router.navigate([this.rootUrl + '/round']);
    }

    validateWinner() {
        if (!this._gameOfDrones.existWinner()) {
            this.router.navigate([this.rootUrl + '/round']);
        }
    }

    finishMatch() {
        if (this._gameOfDrones.isMatchActive() && this._gameOfDrones.existWinner()) {
            this._gameOfDrones.finishMatch();
        }
    }

    stats() {
        this.router.navigate([this.rootUrl + '/stats']);
    }

    finishGame() {
        this._gameOfDrones.finishGame();
        this.router.navigate([this.rootUrl + '/register']);
    }

}
