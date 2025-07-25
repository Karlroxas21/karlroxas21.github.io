import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() icon!: any;
    @Input() title!: string;
    @Input() description!: string;
    @Input() tags: string[] = [];
}
