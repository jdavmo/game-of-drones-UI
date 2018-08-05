import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOfDronesService } from '../../services';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    private rootUrl: string = '/game-of-drones';
    public stats: object;

    constructor(private router: Router, private _gameOfDrones: GameOfDronesService) { }

    ngOnInit() {
        if (this._gameOfDrones.isGameActive()) {
            this.getStats();
        } else {
            this.router.navigate([this.rootUrl + '/register']);
        }
    }

    getStats() {
        this.stats = this._gameOfDrones.getStats();
    }

    rematch() {
        this._gameOfDrones.startNewMatch();
        this.router.navigate([this.rootUrl + '/round']);
    }

    finishGame() {
        this._gameOfDrones.finishGame();
        this.router.navigate([this.rootUrl + '/register']);
    }

}
