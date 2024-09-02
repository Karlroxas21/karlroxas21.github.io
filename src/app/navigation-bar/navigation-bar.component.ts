import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import Typed from 'typed.js';
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  private typed: Typed | undefined;

  @ViewChild('navbarDefault') navbarDefault!: ElementRef;
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;

  @ViewChild('navbarUnscrolled') navbarUnscrolled!: ElementRef;
  @ViewChild('navbarScrolled') navbarScrolled!: ElementRef;

  private routerSubscription!: Subscription;
  private isRootPage!: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRootPage =
          event.urlAfterRedirects === '/#' || event.urlAfterRedirects === '/';
        this.updateNavbarVisibility();
      }

      console.log('ROOTPAGE?????' + this.isRootPage);
    });

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onWindowScroll.bind(this));
      this.onWindowScroll(); // Check scroll position on load
      const options = {
        strings: [
          'am currently looking for a job',
          'do back-end development',
          'do front-end development',
        ],
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
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onWindowScroll.bind(this));
    }
    if (this.typed) {
      this.typed.destroy();
    }
  }

  ngAfterViewInit(): void {
    const navbar = this.navbarDefault.nativeElement;

    this.isRootPage = this.router.url === '/#' || this.router.url === '/';
    this.updateNavbarVisibility();


    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onWindowScroll.bind(this));
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isRootPage) return;

    if (window.scrollY > 300) {
      if (
        this.navbarUnscrolled &&
        !this.navbarUnscrolled.nativeElement.classList.contains('invisible')
      ) {
        this.navbarUnscrolled.nativeElement.classList.add('invisible');
      }
      if (
        this.navbarScrolled &&
        this.navbarScrolled.nativeElement.classList.contains('invisible')
      ) {
        this.navbarScrolled.nativeElement.classList.remove('invisible');
      }
    } else {
      if (
        this.navbarUnscrolled &&
        this.navbarUnscrolled.nativeElement.classList.contains('invisible')
      ) {
        this.navbarUnscrolled.nativeElement.classList.remove('invisible');
      }
      if (
        this.navbarScrolled &&
        !this.navbarScrolled.nativeElement.classList.contains('invisible')
      ) {
        this.navbarScrolled.nativeElement.classList.add('invisible');
      }
    }
  }

  private updateNavbarVisibility(): void {
    if (this.isRootPage) {
      this.navbarUnscrolled.nativeElement.classList.remove('invisible');
      this.navbarUnscrolled.nativeElement.classList.add('flex');
      this.navbarUnscrolled.nativeElement.classList.remove('hidden');
      this.navbarScrolled.nativeElement.classList.add('invisible');
    } else {
      this.navbarUnscrolled.nativeElement.classList.add('invisible');
      this.navbarUnscrolled.nativeElement.classList.add('hidden');
      this.navbarScrolled.nativeElement.classList.remove('invisible');
    }
  }

  
}
