import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProjectTemplateComponent } from '../projects/project-template/project-template/project-template.component';
import { ProjectsComponent } from '../projects/projects.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    readonly Github = Github;
    readonly Linkedin = Linkedin;
    readonly Mail = Mail;

    contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
        });
    }
    ngOnInit(): void {}

    onSubmit() {
        if (this.contactForm.valid) {
            console.log('Form submitted:', this.contactForm.value);
        }
    }
}
