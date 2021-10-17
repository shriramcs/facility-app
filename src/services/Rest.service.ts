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
    
    public async getItem(id: number): Promise<T>{
        try{
            const url = "BASE_URL/" + id; // TODO
            const data = await this.getItemRestDataAsync(url);
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
    
    public deleteItem(id: string): Promise<string>{
        return Promise.resolve("Item deleted successfully");
    }
}
