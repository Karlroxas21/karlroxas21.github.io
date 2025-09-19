import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import {
    LucideAngularModule,
    Waypoints,
    Briefcase,
    Calendar,
    GraduationCap,
    Award,
    MessageCircleQuestion,
    ArrowUpRight,
} from 'lucide-angular';

@Component({
    selector: 'app-about-me',
    standalone: true,
    imports: [FooterComponent, PageHeaderComponent, LucideAngularModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
    readonly Waypoints = Waypoints;
    readonly Briefcase = Briefcase;
    readonly Calendar = Calendar;
    readonly GraduationCap = GraduationCap;
    readonly Award = Award;
    readonly MessageCircleQuestion = MessageCircleQuestion;
    readonly ArrowUpRight = ArrowUpRight;

    isCumLaudeModalOpen = false;
    isBackendApiDevOpen = false;

    openCumLaudeModal() {
        this.isCumLaudeModalOpen = true;
    }

    closeCumLaudeModal() {
        this.isCumLaudeModalOpen = false;
    }

    openBackendApiDevModal() {
        this.isBackendApiDevOpen = true;
    }

    closeBackendApiDevModal() {
        this.isBackendApiDevOpen = false;
    }
}
