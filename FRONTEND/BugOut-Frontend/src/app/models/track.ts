import {Bug} from './bug';

export interface Track {
    id: number;
    title: string;
    bugs: Bug[];
}
