import { Routes } from '@angular/router';
// COMPONENTS
import { IntroComponent } from './containers/intro/intro.component';
import { GameComponent } from './containers/game/game.component';
import { GameWinnerComponent } from './containers/game-winner/game-winner.component';
import { RegisterComponent } from './components/register/register.component';
import { RoundComponent } from './components/round/round.component';
import { StartGameComponent } from './containers/start-game/start-game.component';
import { StatsComponent } from './containers/stats/stats.component';
import { ScoreComponent } from './components/score/score.component';

export const GAME_OF_DRONES_ROUTES: Routes = [
    { path: '', component: IntroComponent },
    { path: 'register', component: StartGameComponent },
    { path: 'round', component: GameComponent },
    { path: 'winner', component: GameWinnerComponent },
    { path: 'stats', component: StatsComponent }
];

export const GAME_OF_DRONES_COMPONENTS = [
    IntroComponent,
    GameComponent,
    GameWinnerComponent,
    RegisterComponent,
    RoundComponent,
    StartGameComponent,
    StatsComponent,
    ScoreComponent
];
