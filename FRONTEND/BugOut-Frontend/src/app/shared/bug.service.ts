import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Bug} from '../models/bug';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BugService {

    private readonly url = `${environment.api}/bug`;


    constructor(private readonly http: HttpClient) {
    }


    getAll(): Observable<Bug[]> {
        return this.http.get<Bug[]>(`${this.url}`);
    }

    create(bug: Bug): Observable<Bug> {
        return this.http.post<Bug>(`${this.url}`, bug);
    }

    update(bug: Bug): Observable<Bug> {
        return this.http.put<Bug>(`${this.url}`, bug);
    }

    delete(id: number): Observable<Bug> {
        return this.http.delete<Bug>(`${this.url}/${id}`);
    }

    getById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`${this.url}/${id}`);
    }

}
