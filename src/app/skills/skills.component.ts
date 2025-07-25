import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Terminal, Globe, Database } from 'lucide-angular';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [RouterModule, LucideAngularModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css',
})
export class SkillsComponent {
    readonly Terminal = Terminal;
    readonly Globe = Globe;
    readonly Database = Database;
}
