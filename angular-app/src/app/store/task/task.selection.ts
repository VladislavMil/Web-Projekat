import { AppState } from "../../app.state";
import { createSelector } from "@ngrx/store";
import { Task } from "../../models/task.model";


export const selectTaskFeature=createSelector((state:AppState)=>state.tasks,(tasks)=>tasks);
export const selectTaskList=createSelector(selectTaskFeature,(task)=>task.ids.map(x=><Task>task.entities[x]));