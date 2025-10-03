import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule, MarkdownService, provideMarkdown, MARKED_OPTIONS } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-article-viewer',
    standalone: true,
    imports: [MarkdownModule, HttpClientModule],
    providers: [
        MarkdownService,
        provideMarkdown({
            markedOptions: {
                provide: MARKED_OPTIONS,
                useValue: {
                    gfm: true,
                    breaks: true,
                    pedantic: false,
                    smartLists: true,
                    smartypants: true,
                    inline: true,
                },
            },
        }),
    ],
    templateUrl: './article-viewer.component.html',
    styleUrl: './article-viewer.component.css',
})
export class ArticleViewerComponent implements OnInit {
    markDownContent!: string;

    isContentLoading = signal(false);

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private titleService: Title,
    ) {}

    ngOnInit(): void {
        const fileName = this.route.snapshot.paramMap.get('file');
        if (fileName) {
            this.loadMarkDownFile(fileName);
        }
    }

    loadMarkDownFile(fileName: string) {
        this.isContentLoading.set(true);

        this.http
            .get(`/articles-dir/${fileName}.md`, { responseType: 'text' })
            .pipe(
                finalize(() => {
                    this.isContentLoading.set(false);
                }),
            )
            .subscribe({
                next: (content) => {
                    this.markDownContent = content;
                    this.setTitleFromMarkdown(content);
                },
                error: (err) => {
                    alert('Failed to send message.');
                    console.error(err);
                },
            });
    }

    // Get the first # Header in Mardown as title of the web page
    setTitleFromMarkdown(content: string): void {
        const titleMatch = content.match(/^#\s*(.+)/);
        const title = titleMatch ? titleMatch[1] : 'Default Title';
        this.titleService.setTitle(title);
    }
}
