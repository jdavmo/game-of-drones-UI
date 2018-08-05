import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GAME_OF_DRONES_ROUTES, GAME_OF_DRONES_COMPONENTS } from './game-of-drones.routes';
import { GameOfDronesService } from './services';
const ANGULAR_MODULES: any[] = [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule,
];

@NgModule({
    imports: [
        ANGULAR_MODULES,
        SharedModule,
        RouterModule.forChild(GAME_OF_DRONES_ROUTES),
    ],
    declarations: [GAME_OF_DRONES_COMPONENTS],
    providers: [GameOfDronesService]
})
export class GameOfDronesModule {}
