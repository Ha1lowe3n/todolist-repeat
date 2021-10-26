import { v1 } from "uuid";

import { TaskStateType } from "../components/app";
import {
    TodolistsActionsTypes,
    TODOLISTS_ACTIONS_TYPE,
} from "./todolists-reducer";

enum TASKS_ACTIONS_TYPE {
    ADD_TASK = "ADD-TASK",
    REMOVE_TASK = "REMOVE-TASK",
    CHANGE_CHECK_STATUS = "CHANGE-CHECK-STATUS",
    CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE",
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes = ReturnType<
    InferValueTypes<typeof tasksActions>
>;

export const tasksReducer = (
    state: TaskStateType,
    action:
        | TasksActionsTypes
        | Extract<
              TodolistsActionsTypes,
              {
                  type:
                      | TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST
                      | TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST;
              }
          >
): TaskStateType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.payload.todolistId]: [
                    ...state[action.payload.todolistId],
                    { id: v1(), title: action.payload.title, isDone: false },
                ],
            };
        case TASKS_ACTIONS_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].filter((task) => task.id !== action.payload.taskId),
            };
        case TASKS_ACTIONS_TYPE.CHANGE_CHECK_STATUS: {
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].map((task) => {
                    if (task.id === action.payload.taskId) {
                        task.isDone = !task.isDone;
                    }
                    return task;
                }),
            };
        }
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todolistId]: state[
                    action.payload.todolistId
                ].map((task) => {
                    if (task.id === action.payload.taskId) {
                        task.title = action.payload.newTitle;
                    }
                    return task;
                }),
            };
        }
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.todolistId]: [],
            };
        }
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST: {
            const newState = { ...state };
            delete newState[action.payload.todolistId];
            return newState;
        }

        default:
            throw new Error("I don't understand this type");
    }
};

export const tasksActions = {
    addTask: (title: string, todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.ADD_TASK as const,
        payload: {
            title,
            todolistId,
        },
    }),
    removeTask: (taskId: string, todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.REMOVE_TASK as const,
        payload: {
            taskId,
            todolistId,
        },
    }),
    changeCheckStatus: (taskId: string, todolistId: string) => ({
        type: TASKS_ACTIONS_TYPE.CHANGE_CHECK_STATUS as const,
        payload: {
            taskId,
            todolistId,
        },
    }),
    changeTaskTitle: (
        taskId: string,
        todolistId: string,
        newTitle: string
    ) => ({
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE as const,
        payload: {
            taskId,
            todolistId,
            newTitle,
        },
    }),
};