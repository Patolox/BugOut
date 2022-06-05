import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Bug} from '../models/bug';
import {Observable, take} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BugService {

    private readonly url = `${environment.API}/bug`;


    constructor(private readonly http: HttpClient) {
    }


    getAll(): Observable<Bug[]> {
        return this.http.get<Bug[]>(`${this.url}/all`, {
            headers: this.setHeader()
        }).pipe(take(1));
    }

    create(bug: Bug): Observable<Bug> {
        return this.http.post<Bug>(`${this.url}`, bug)
        .pipe(take(1));
    }

    update(bug: Bug): Observable<Bug> {
        return this.http.put<Bug>(`${this.url}`, bug)
        .pipe(take(1));
    }

    delete(id: number): Observable<Bug> {
        return this.http.delete<Bug>(`${this.url}/${id}`)
        .pipe(take(1));
    }

    getById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`${this.url}/${id}`)
        .pipe(take(1));
    }

    setHeader(): HttpHeaders{
        return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('user_token')}`});
    }

}
