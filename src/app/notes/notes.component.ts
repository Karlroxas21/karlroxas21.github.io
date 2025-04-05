import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [FooterComponent, RouterModule],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.css',
})
export class NotesComponent {}
