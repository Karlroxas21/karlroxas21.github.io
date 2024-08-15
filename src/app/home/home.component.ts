import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import Typed from 'typed.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const options = {
                strings: ['currently looking for a job', 'do back-end development', 'do front-end development', 'specialized in Web Development'],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true
            };
            const typed = new Typed('.test-component', options);
        }

    }

}
