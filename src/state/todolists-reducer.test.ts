import { v1 } from "uuid";

import {
    todolistsActions,
    todolistsReducer,
    TodolistsType,
} from "./todolists-reducer";

const todolistId1 = v1();
const todolistId2 = v1();
let startState: TodolistsType[];

const {
    addTodolist,
    removeTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
} = todolistsActions;

beforeEach(() => {
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];
});

it("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolist(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState !== startState).toBeTruthy();
});

it("correct todolist should be added", () => {
    const endState = todolistsReducer(startState, addTodolist("New Todolist"));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
    expect(endState !== startState).toBeTruthy();
});

it("correct todolist should change it's name", () => {
    const endState = todolistsReducer(
        startState,
        changeTodolistTitle(todolistId2, "New Todolist")
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
    expect(endState[1] !== startState[1]).toBeTruthy();
});

it("correct filter of todolist should be changed", () => {
    const endState = todolistsReducer(
        startState,
        changeTodolistFilter("completed", todolistId2)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
    expect(endState[1] !== startState[1]).toBeTruthy();
});
