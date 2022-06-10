import {User} from './user';

export interface Bug {
    id?: number;
    title: string;
    description?: string;
    trackId: number;
    userId?: number;
    user?: User;
}
