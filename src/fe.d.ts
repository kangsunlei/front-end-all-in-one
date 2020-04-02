import { Dispatch } from "react";
import { Action } from "redux";

interface TodoListProps {
    dispatch: Dispatch<Action>,
    items: ItemObject[]
}

interface StoreObject {
    todos: ItemObject[]
}

interface ItemObject {
    name: string,
    create: number
}