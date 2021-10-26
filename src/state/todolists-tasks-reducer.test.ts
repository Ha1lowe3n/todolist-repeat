import { TaskStateType, TodolistsType } from "../components/app";
import { todolistsReducer, todolistsActions } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";

const { addTodolist, removeTodolist } = todolistsActions;

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addTodolist("new todolist");

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});

test("property with todolistId should be deleted", () => {
    const startState: TaskStateType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const action = removeTodolist("todolistId2");

    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});