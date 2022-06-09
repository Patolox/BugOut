import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Track} from '../../../../models/track';

@Injectable({
    providedIn: 'root'
})
export class TrackService {

    private readonly url = `${environment.api}/track`;


    constructor(private readonly http: HttpClient) {
    }


    getById(id: number): Observable<Track> {
        return this.http.get<Track>(`${this.url}/${id}`);
    }

    getAll(): Observable<Track[]> {
        return this.http.get<Track[]>(`${this.url}`);
    }

}
