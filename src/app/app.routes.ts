import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ResumeComponent } from './resume/resume.component';
import { ArticleViewerComponent } from './articles/article-viewer/article-viewer/article-viewer.component';
import { NoteViewerComponent } from './notes/note-viewer/note-viewer/note-viewer.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Karl Marx Roxas - Home' },
    { path: 'about-me', component: AboutMeComponent, title: 'About me' },
    { path: 'articles', component: ArticlesComponent, title: 'My Articles' },
    { path: 'notes', component: NotesComponent, title: 'My Notes' },
    { path: 'skills', component: SkillsComponent, title: 'My skills' },
    { path: 'projects', component: ProjectsComponent, title: 'My Projects' },
    { path: 'resume', component: ResumeComponent, title: 'Hire me!' },
    { path: 'article/:file', component: ArticleViewerComponent },
    { path: 'note/:file', component: NoteViewerComponent },
    { path: 'contact', component: ContactComponent },
];
