import { Component } from '@angular/core';
import { LucideAngularModule, Github } from 'lucide-angular';
@Component({
    selector: 'app-project-template',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './project-template.component.html',
    styleUrl: './project-template.component.css',
})
export class ProjectTemplateComponent {
    readonly Github = Github;
}
