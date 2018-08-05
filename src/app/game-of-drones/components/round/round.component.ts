import { Component, OnInit } from '@angular/core';
import { GameOfDronesService } from '../../services';
import { PlayerDescriptor, GameDescriptor } from '../../models';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

    constructor(private _gameOfDrones: GameOfDronesService) { }

    ngOnInit() {
        console.log(this._gameOfDrones.checkGameActive());
        if (this._gameOfDrones.checkGameActive()) {
            this.continuosGame();
        } else {
            // TODO: return to the register view
        }
    }

    continuosGame() {
        console.log(this._gameOfDrones.checkMatchActive());
        if (this._gameOfDrones.checkMatchActive()) {
            let move = this._gameOfDrones.whoMoves();
        } else {
            // TODO: should start a match
        }
    }

}
