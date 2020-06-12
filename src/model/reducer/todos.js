const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [{
                name: action.text,
                create: Date.now()
            }, ...state];

        case "DELETE_TODO":
            state.splice(action.index, 1);
            return [...state];

        case "FETCH_TODOS_SUCCEEDED":
            return action.todos;
    
        default:
            return state;
    }
}

export default todos;