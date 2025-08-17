import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ProjectTemplateComponent } from './project-template/project-template/project-template.component';
import { Star, LucideAngularModule } from 'lucide-angular';
import { ProjectCardsComponent } from '../components/project-cards/project-cards.component';
@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [FooterComponent, ProjectTemplateComponent, LucideAngularModule, ProjectCardsComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
})
export class ProjectsComponent {
    readonly Star = Star;
}
