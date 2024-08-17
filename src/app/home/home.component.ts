import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import Typed from 'typed.js';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectTemplateComponent } from '../projects/project-template/project-template/project-template.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterModule, ProjectTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        strings: [
          'am currently looking for a job',
          'do back-end development',
          'do front-end development',
          'am batman',
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
      };
      const typed = new Typed('.test-component', options);
    }
  }
}
