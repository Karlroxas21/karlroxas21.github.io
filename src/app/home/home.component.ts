import { Component, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProjectTemplateComponent } from '../projects/project-template/project-template/project-template.component';
import { ProjectsComponent } from '../projects/projects.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {
    LucideAngularModule,
    Github,
    Linkedin,
    Mail,
    Code,
    Smartphone,
    Database,
    Construction,
    Award,
    Zap,
    Wrench,
    PersonStanding,
} from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { CardComponent } from '../components/card/card.component';
import { TagsComponent } from '../components/tags/tags.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        FooterComponent,
        RouterModule,
        ProjectTemplateComponent,
        ProjectsComponent,
        NavigationBarComponent,
        LucideAngularModule,
        CommonModule,
        ReactiveFormsModule,
        ContactComponent,
        CardComponent,
        TagsComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    readonly Github = Github;
    readonly Linkedin = Linkedin;
    readonly Mail = Mail;
    readonly Code = Code;
    readonly Smartphone = Smartphone;
    readonly Database = Database;
    readonly Construction = Construction;
    readonly Award = Award;
    readonly Zap = Zap;
    readonly Wrench = Wrench;
    readonly PersonStanding = PersonStanding;

    isDownloadResumeLoading = signal(false);
    ngOnInit(): void {}

    async downloadResume() {
        this.isDownloadResumeLoading.set(true);

        try {
            const response = await fetch('/resume/resume-kmvr.pdf');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'karl-marx-roxas-software-engineer';
            link.click();

            URL.revokeObjectURL(url); // clean up
        } catch (error) {
            console.error('Download failed', error);
        } finally {
            this.isDownloadResumeLoading.set(false);
        }
    }
}
