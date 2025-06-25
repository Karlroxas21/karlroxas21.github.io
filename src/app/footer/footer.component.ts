import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule, LucideAngularModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    readonly Github = Github;
    readonly Linkedin = Linkedin;
    readonly Mail = Mail;
}
