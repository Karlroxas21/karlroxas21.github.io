import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ProjectTemplateComponent } from './project-template/project-template/project-template.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [FooterComponent, ProjectTemplateComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
})
export class ProjectsComponent {}
