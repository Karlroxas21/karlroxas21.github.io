import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ArticleViewerComponent } from './article-viewer/article-viewer/article-viewer.component';

@Component({
    selector: 'app-articles',
    standalone: true,
    imports: [FooterComponent, MarkdownModule, HttpClientModule, RouterModule, ArticleViewerComponent],
    providers: [MarkdownService],
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.css',
})
export class ArticlesComponent {}
