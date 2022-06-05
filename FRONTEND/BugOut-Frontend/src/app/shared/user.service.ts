import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Message} from '../models/message';
import {Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly url = `${environment.API}/user`;

    constructor(private readonly http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/all`, {
            headers: this.setHeader()
        })
        .pipe(take(1));
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}`, user)
        .pipe(take(1));
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(`${this.url}`, user)
        .pipe(take(1));
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${this.url}/${id}`)
        .pipe(take(1));
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.url}/${id}`)
        .pipe(take(1));
    }

    setHeader(): HttpHeaders{
        return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('user_token')}`});
    }
}
