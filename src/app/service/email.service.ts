import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

type Email = {
    from: string;
    message: string;
};

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    constructor() {}

    private http = inject(HttpClient);

    sendEmail(body: Email): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/email/`, body).pipe(
            catchError((err) => {
                console.error('API Error: ', err);
                return throwError(() => new Error('Something went wrong'));
            }),
        );
    }
}
