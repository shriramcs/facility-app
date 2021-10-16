import { BackendServiceI } from "../types/common.types";

const localStorageToken = 'FACILITIES'
const delayDuration = 1000;

// const resolveWithDelay = (fn: any, duration: number): Promise<any>  => {
//     return new Promise((res) => {
//         setTimeout(() => {
//             res(fn());
//         }, duration)
//     });
// };


export class LocalStorageService<T> implements BackendServiceI<T>{

    private getLocalStorageData(): T[]{
        
        const facilityListData = localStorage.getItem(localStorageToken);
        return facilityListData ? JSON.parse(facilityListData) : null;
    }

    private setLocalStorageData(data: T[]): void {
        localStorage.setItem(localStorageToken, JSON.stringify(data || []));
    }

    private resolveWithDelay(fn: any, duration: number): Promise<any> {
        return new Promise((res) => {
            setTimeout(() => {
                res(fn());
            }, duration)
        });
    };

    public getList(): Promise<T[]> {
        return this.resolveWithDelay(() => this.getLocalStorageData(), delayDuration);
    }
    
    public getItem(): Promise<T>{
        return Promise.resolve({} as T);
    }
    
    public addItem(data: T): Promise<string>{
        let list = this.getLocalStorageData();
        if(!list){
            list = [];
        }
        list.push({...data});
        this.setLocalStorageData(list);
        return this.resolveWithDelay(() => "SUCCESS", delayDuration);
    }
    
    public putItem(data: T): Promise<string>{
        return Promise.resolve("");
    }
    deleteItem(data: T): Promise<string>{
        return Promise.resolve("");
    }
}
