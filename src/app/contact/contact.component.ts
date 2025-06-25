import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { LucideAngularModule, Github, Linkedin, Mail, Phone, FileDown } from 'lucide-angular';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent {
    readonly Github = Github;
    readonly Linkedin = Linkedin;
    readonly Mail = Mail;
    readonly Phone = Phone;
    readonly FileDown = FileDown;

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
