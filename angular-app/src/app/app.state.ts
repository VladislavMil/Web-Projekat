import { projectState } from "./store/project/project.reduce";

export interface AppState {
    projects: projectState;
}