import { AppState } from "../../app.state";
import { createSelector } from "@ngrx/store";
import { Project } from "../../models/project.model";


export const selectProjectFeature=createSelector((state:AppState)=>state.projects,(projects)=>projects);
export const selectProjectList=createSelector(selectProjectFeature,(project)=>project.ids.map(x=><Project>project.entities[x]));