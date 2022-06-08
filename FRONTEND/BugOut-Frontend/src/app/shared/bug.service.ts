import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Bug} from '../models/bug';
import {Observable, take} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BugService {

    private readonly url = `${environment.api}/bug`;


    constructor(private readonly http: HttpClient) {
    }


    getById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`${this.url}/${id}`);
    }

    getAll(): Observable<Bug[]> {
        return this.http.get<Bug[]>(`${this.url}`);
    }

    create(bug: Bug): Observable<Bug> {
        return this.http.post<Bug>(`${this.url}`, bug);
    }

    update(id: number, bug: Bug): Observable<Bug> {
        return this.http.put<Bug>(`${this.url}/${id}`, bug);
    }

    delete(id: number): Observable<Bug> {
        return this.http.delete<Bug>(`${this.url}/${id}`);
    }

}
