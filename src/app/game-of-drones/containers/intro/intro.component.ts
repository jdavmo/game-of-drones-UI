import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    private rootUrl: string = '/game-of-drones';
    
    constructor(private router: Router) { }

    ngOnInit() {}

    play() {
        this.router.navigate([this.rootUrl + '/register']);
    }

}
