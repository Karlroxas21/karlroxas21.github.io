import { Component, Input } from '@angular/core';
import { Github, LucideAngularModule, SquareArrowOutUpRight } from 'lucide-angular';
import { TagsComponent } from '../tags/tags.component';

@Component({
    selector: 'app-project-cards',
    standalone: true,
    imports: [LucideAngularModule, TagsComponent],
    templateUrl: './project-cards.component.html',
    styleUrl: './project-cards.component.css',
})
export class ProjectCardsComponent {
    readonly Github = Github;
    readonly SquareArrowOutUpRight = SquareArrowOutUpRight;

    @Input() img!: string;
    @Input() title!: string;
    @Input() description!: string;
    @Input() tags!: string[];
    @Input() githubLink!: string;
    @Input() demoLink!: string;
    @Input() buttonName?: string;
    @Input() buttonLink!: string;
}
