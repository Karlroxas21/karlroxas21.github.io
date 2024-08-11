import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';

export const routes: Routes = [
    {
        path: '', component: NavigationBarComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'notes', component: NotesComponent},
            { path: 'articles', component: ArticlesComponent},
            { path: 'projects', component: ProjectsComponent},
            { path: 'about-me', component: AboutMeComponent},
        ]
    }
];
