import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ResumeComponent } from './resume/resume.component';
import { ArticleViewerComponent } from './articles/article-viewer/article-viewer/article-viewer.component';
import { NoteViewerComponent } from './notes/note-viewer/note-viewer/note-viewer.component';

export const routes: Routes = [
    {
        path: '', component: NavigationBarComponent,
        children: [
            { path: '', component: HomeComponent, title: 'Hello, I\'m Karl\!'},
            { path: 'notes', component: NotesComponent, title: 'My Notes'},
            { path: 'articles', component: ArticlesComponent, title: 'My Articles'},
            { path: 'projects', component: ProjectsComponent, title: 'My Projects'},
            { path: 'about-me', component: AboutMeComponent, title: 'About me'},
            { path: 'resume', component: ResumeComponent, title: 'Hire me\!'},
            { path: 'article/:file', component: ArticleViewerComponent},
            { path: 'note/:file', component: NoteViewerComponent},
        ]
    }
];
