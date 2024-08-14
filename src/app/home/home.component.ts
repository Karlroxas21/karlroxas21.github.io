import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        const options = {
            strings: ['front-end development', 'back-end development', 'web design', 'code in Javascript', 'code in Typescript', 'know Angular 15+', 'specialized in Web Development'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
          };
          const typed = new Typed('.test-component', options);
    }

}
