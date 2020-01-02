import { ItemObject } from 'fe';

interface Action {
    type: string,
    text?: string,
    index?: number
}

const todos = (state: ItemObject[] = [], action: Action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [{
                name: action.text,
                create: Date.now()
            }, ...state];

        case "DELETE_TODO":
            state.splice(action.index, 1);
            return [...state];
    
        default:
            return state;
    }
}

export default todos;