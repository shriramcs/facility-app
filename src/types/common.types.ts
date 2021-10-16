export interface BackendServiceI<T> {
    getList: () => Promise<T[]>;
    getItem: () => Promise<T>;
    addItem: (data: T) => Promise<string>;
    putItem: (data: T) => Promise<string>;
    deleteItem: (data: T) => Promise<string>;
}