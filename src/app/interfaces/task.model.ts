export interface TaskResponse {
    name:  string,
    todos: Task[],
}

export interface Task {
    label:   string,
    is_done: boolean,
    id:      number,
}




