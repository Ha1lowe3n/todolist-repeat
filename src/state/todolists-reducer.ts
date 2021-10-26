import { v1 } from "uuid";

export enum TODOLISTS_ACTIONS_TYPE {
    REMOVE_TODOLIST = "REMOVE-TODOLIST",
    ADD_TODOLIST = "ADD-TODOLIST",
    CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE",
    CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER",
}

export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type FilterValuesType = "all" | "active" | "completed";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistsActionsTypes = ReturnType<
    InferValueTypes<typeof todolistsActions>
>;

export const todolistId1 = v1();
export const todolistId2 = v1();

export const initialState: Array<TodolistsType> = [
    { id: todolistId1, title: "1st", filter: "all" },
    { id: todolistId2, title: "2nd", filter: "all" },
];

export const todolistsReducer = (
    state: TodolistsType[] = initialState,
    action: TodolistsActionsTypes
): TodolistsType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter((tl) => tl.id !== action.payload.todolistId);
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all",
                },
            ];
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: {
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, title: action.payload.newTitle }
                    : tl
            );
        }
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: {
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, filter: action.payload.filterValue }
                    : tl
            );
        }
        default:
            return state;
    }
};

export const todolistsActions = {
    removeTodolist: (todolistId: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST as const,
        payload: {
            todolistId,
        },
    }),
    addTodolist: (title: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST as const,
        payload: {
            title,
            todolistId: v1(),
        },
    }),
    changeTodolistTitle: (todolistId: string, newTitle: string) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE as const,
        payload: {
            todolistId,
            newTitle,
        },
    }),
    changeTodolistFilter: (
        filterValue: FilterValuesType,
        todolistId: string
    ) => ({
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER as const,
        payload: {
            filterValue,
            todolistId,
        },
    }),
};
