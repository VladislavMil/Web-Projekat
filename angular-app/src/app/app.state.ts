import { projectState } from "./store/project/project.reduce";
import { taskState } from "./store/task/task.reduce";

export interface AppState {
    projects: projectState;
    tasks: taskState;
}

