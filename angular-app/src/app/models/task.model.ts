export interface Task {
    id: number;
    title: string;
    description: string;
    projectId: number;
    importance: string;
    deadline?: Date;
    status?: boolean;
}