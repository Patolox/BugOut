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

    private readonly url = `${environment.api}/user`;


    constructor(private readonly http: HttpClient) { }


    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.url}/${id}`);
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}`);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}`, user);
    }

    update(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.url}/${id}`, user);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${this.url}/${id}`);
    }

}
