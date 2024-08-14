import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-note-viewer',
  standalone: true,
  imports: [MarkdownModule, HttpClientModule],
  providers: [MarkdownService],
  templateUrl: './note-viewer.component.html',
  styleUrl: './note-viewer.component.css'
})
export class NoteViewerComponent implements OnInit{

    markDownContent!: string;

    constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title) {}

    ngOnInit(): void {
        const fileName = this.route.snapshot.paramMap.get('file');
        if(fileName){
            this.loadMarkDownFile(fileName);
        }
    }
    
    loadMarkDownFile(fileName: string){
        this.http.get(`/notes-dir/${fileName}.md`, { responseType: 'text'}).subscribe(
            content => {
                this.markDownContent = content;
                this.setTitleFromMarkdown(content);
            }
        );
    }

    // Get the first # Header in Mardown as title of the web page
    setTitleFromMarkdown(content: string): void{
        const titleMatch = content.match(/^#\s*(.+)/);
        const title = titleMatch ? titleMatch[1]: 'Default Title';
        this.titleService.setTitle(title);
    }

}
