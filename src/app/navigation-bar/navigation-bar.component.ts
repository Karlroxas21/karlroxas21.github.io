import { Component, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import Typed from 'typed.js';
import { LucideAngularModule, Github, Linkedin, Sun, Moon } from 'lucide-angular';

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [RouterModule, CommonModule, LucideAngularModule],
    templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent {
    private typed: Typed | undefined;

    isDarkTheme: boolean = false;
    isMenuOpen: boolean = false;

    readonly Github = Github;
    readonly Linkedin = Linkedin;
    readonly Sun = Sun;
    readonly Moon = Moon;

    private routerSubscription!: Subscription;
    private isRootPage!: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private router: Router,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            this.isDarkTheme = savedTheme === 'dark';
            this.applyTheme();
        }
    }

    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
        this.applyTheme();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.isDarkTheme = e.matches;
            this.applyTheme();
        });
    }

    private applyTheme(): void {
        const htmlElement = document.documentElement;
        if (this.isDarkTheme) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const menuElement = document.querySelector('#mobile-menu'); // Adjust selector if needed
        const buttonElement = document.querySelector('#hamburger-button'); // Adjust selector if needed

        if (
            this.isMenuOpen &&
            menuElement &&
            !menuElement.contains(target) &&
            buttonElement &&
            !buttonElement.contains(target)
        ) {
            this.toggleMenu();
        }
    }
}
