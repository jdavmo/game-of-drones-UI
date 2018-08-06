import { Component, OnInit } from '@angular/core';
import { GameOfDronesService } from '../../services';
import { Router } from '@angular/router';
import { PlayerDescriptor, GameDescriptor, RoundDescriptor } from '../../models';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

    round: RoundDescriptor = new RoundDescriptor();
    score: Object;
    private rootUrl: string = '/game-of-drones';

    constructor(private router: Router, private _gameOfDrones: GameOfDronesService) { }

    ngOnInit() {
        if (this._gameOfDrones.isGameActive()) {
            this.continuosGame();
        } else {
            this.router.navigate([this.rootUrl + '/register']);
        }
    }

    continuosGame() {
        // Validate winner
        this.score = this._gameOfDrones.getScore();
        this.validateWinner();

        if (this._gameOfDrones.isMatchActive()) {
            this.round.import(this._gameOfDrones.whoMoves());
        } else {
            // if you reach here
            // TODO: should start a match
        }
    }

    move() {
        if (this.round.hasOwnProperty('move')) {
            // Kill the reference
            let round = JSON.parse(JSON.stringify(this.round));
            // Register the round
            // TODO: Loadding...
            this._gameOfDrones.registerRound(round).subscribe(() => {
                this.score = this._gameOfDrones.getScore();
                this.validateWinner();
                // Next round
                this.continuosGame();
            }, err => {
                // TODO: handle error
            });
        }
    }

    validateWinner() {
        if (this._gameOfDrones.existWinner()) {
            this.router.navigate([this.rootUrl + '/winner']);
        }
    }

}
