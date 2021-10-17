export interface BackendServiceI<T> {
    getList: () => Promise<T[]>;
    getItem: (id: number) => Promise<T>;
    addItem: (data: T) => Promise<string>;
    putItem: (data: T) => Promise<string>;
    deleteItem: (id: string) => Promise<string>;
}