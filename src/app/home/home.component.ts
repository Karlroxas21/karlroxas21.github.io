import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProjectTemplateComponent } from '../projects/project-template/project-template/project-template.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FooterComponent, RouterModule, ProjectTemplateComponent, ProjectsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
