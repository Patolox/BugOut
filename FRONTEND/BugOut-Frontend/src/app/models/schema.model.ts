import {Track} from './track';

export interface Tag {
    name: string;
    color?: string;
}

export enum IssueType {
    Task = 'task',
    SubTask = 'sub-task',
    Bug = 'bug',
    Epic = 'epic',
    Story = 'story'
}

export interface Board {
    title: string;
    tracks: Track[];
}
