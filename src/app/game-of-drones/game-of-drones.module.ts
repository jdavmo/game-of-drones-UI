import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GAME_OF_DRONES_ROUTES, GAME_OF_DRONES_COMPONENTS } from './game-of-drones.routes';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(GAME_OF_DRONES_ROUTES),
    ],
    declarations: [GAME_OF_DRONES_COMPONENTS]
})
export class GameOfDronesModule {}
