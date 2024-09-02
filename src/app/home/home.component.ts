import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import Typed from 'typed.js';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectTemplateComponent } from '../projects/project-template/project-template/project-template.component';
import { ProjectsComponent } from "../projects/projects.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterModule, ProjectTemplateComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
