import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Message} from '../models/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly url = `${environment.API}/user`;

    constructor(private readonly http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}`);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}`, user);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(`${this.url}`, user);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${this.url}/${id}`);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.url}/${id}`);
    }

}
