import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

}
