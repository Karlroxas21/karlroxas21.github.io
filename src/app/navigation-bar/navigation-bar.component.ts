import { Component, AfterViewInit, OnInit, PLATFORM_ID, Inject, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
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
export class NavigationBarComponent implements AfterViewInit, OnInit, OnDestroy {
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

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isRootPage = event.urlAfterRedirects === '/#' || event.urlAfterRedirects === '/';
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            const options = {
                strings: ['am open for new opportunities', 'do back-end development', 'do front-end development'],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true,
            };
            this.typed = new Typed('.typed', options);
        }
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
        if (this.typed) {
            this.typed.destroy();
        }
    }

    ngAfterViewInit(): void {
        this.isRootPage = this.router.url === '/#' || this.router.url === '/';
    }

    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
        this.applyTheme();
    }

    private applyTheme(): void {
        if (this.isDarkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
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
