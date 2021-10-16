import { BackendServiceI } from "../types/common.types";

const defaultHeaders = new Headers({
    'content-type': 'Application/json'
});


export class RestApiService<T> implements BackendServiceI<T>{
    
    private getListRestDataAsync(url: string): Promise<T[]> {
        return fetch(url, {
            headers: {...defaultHeaders}
        })
        .then(response => response.json());
    };

    private getItemRestDataAsync(url: string): Promise<T> {
        return fetch(url, {
            headers: {...defaultHeaders}
        })
        .then(response => response.json());
    };

    public async getList(): Promise<T[]> {
        try{
            const data = await this.getListRestDataAsync("");
            return data;
        } catch(e) {
            return null as any as T[];
        }
    }
    
    public async getItem(): Promise<T>{
        try{
            const data = await this.getItemRestDataAsync("");
            return data;
        } catch(e) {
            return null as any as T;
        }
    }
    
    public async addItem(data: T): Promise<string>{
        return Promise.resolve("Item added successfully");
    }
    
    public putItem(data: T): Promise<string>{
        return Promise.resolve("Item updated successfully");
    }
    
    public deleteItem(data: T): Promise<string>{
        return Promise.resolve("Item deleted successfully");
    }
}
