export const addTodo = (text: string) => {
    return {
        type: 'ADD_TODO',
        text
    }
}

export const deleteTodo = (index: number) => {
    return {
        type: 'DELETE_TODO',
        index
    }
}