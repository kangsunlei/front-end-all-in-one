import { Dispatch } from "react";
import { Action } from "redux";

interface AppProps {
    dispatch: Dispatch<Action>,
    items: ItemObject[]
}

interface AppState {
    items: ItemObject[]
}

interface ItemObject {
    name: string,
    create: number
}