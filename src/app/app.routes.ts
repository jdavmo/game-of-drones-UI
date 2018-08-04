import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'game-of-drones',
        pathMatch: 'full'
    },
    {
        path: 'game-of-drones',
        loadChildren: './game-of-drones/game-of-drones.module#GameOfDronesModule'
    }
];
