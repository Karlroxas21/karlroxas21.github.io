import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { LucideAngularModule, Github, Linkedin, Phone, FileDown, Mail } from 'lucide-angular';
import { EmailService } from '../service/email.service';

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

    emailService = inject(EmailService);

    isEmailSending = signal(false);

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
        });
    }
    ngOnInit(): void {
        this.contactForm.get('name')?.disable();
        this.contactForm.get('email')?.disable();
        this.contactForm.get('message')?.disable();
    }

    onSubmit() {
        const from = this.contactForm.value.email;
        const body = `From ${this.contactForm.value.name}\n${this.contactForm.value.message}`;
        this.isEmailSending.set(true);

        this.emailService.sendEmail({ from, message: body }).subscribe({
            next: () => {
                alert('Message sent!');
                this.isEmailSending.set(false);
                this.contactForm.reset();
            },
            error: (err) => {
                alert('Failed to send message.');
                console.error(err);
            },
        });
    }
}
