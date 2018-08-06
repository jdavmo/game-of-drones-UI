import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameOfDronesService } from '../../services';
import { PlayerDescriptor, GameDescriptor } from '../../models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    playerOne: PlayerDescriptor;
    playerTwo: PlayerDescriptor;
    private rootUrl: string = '/game-of-drones';

    constructor(private router: Router, private _gameOfDrones: GameOfDronesService) {}

    ngOnInit() {

        this.form = new FormGroup({
            playerOne: new FormControl(null, Validators.required),
            playerTwo: new FormControl(null, Validators.required)
        });

        this.createPlayers();
    }

    createPlayers() {
        this.playerOne = new PlayerDescriptor(1);
        this.playerTwo = new PlayerDescriptor(2);
    }

    setNamesPlayers() {
        this.playerOne.setName(this.form.controls['playerOne'].value);
        this.playerTwo.setName(this.form.controls['playerTwo'].value);
    }

    onSubmit(isValid: boolean) {
        if (isValid && this.validateDifferentNamePlayer()) {
            this.setNamesPlayers();
            // TODO: loading...
            this._gameOfDrones.start(this.playerOne, this.playerTwo)
            .subscribe(() => {
                this.router.navigate([this.rootUrl + '/round']);
            });
        } else {
            // TODO: Show a message with this validation
            console.log('it is not valid, the names are iqual');
        }
    }

    validateDifferentNamePlayer(): boolean {
        return this.form.controls['playerOne'].value !== this.form.controls['playerTwo'].value;
    }

}
