import { BackendServiceI } from "../types/common.types";

const localStorageToken = 'FACILITIES'
const delayDuration = 1000;

export class LocalStorageService<T> implements BackendServiceI<T>{

    private getLocalStorageData(): T[]{
        
        const facilityListData = localStorage.getItem(localStorageToken);
        return facilityListData ? JSON.parse(facilityListData) : [];
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
    
    public getItem(id: number): Promise<T>{
        const list: any = this.getLocalStorageData();
        const itemDetails: any[] = (list || []).find((item: any) => item.id === id);
        return this.resolveWithDelay(() => itemDetails, delayDuration);
    }
    
    public addItem(data: T): Promise<string>{
        let list = this.getLocalStorageData();
        if(!list){
            list = [];
        }
        list.push({...data, id: list.length + 1});
        this.setLocalStorageData(list);
        return this.resolveWithDelay(() => {
            console.log("add SUCCESS");
            return "SUCCESS";
        }, delayDuration);
    }
    
    public putItem(data: any): Promise<string>{
        let list: any = this.getLocalStorageData();
        list = (list || []).map((item: any) => item.id === data.id ? {...data} : item);
        this.setLocalStorageData(list);
        return this.resolveWithDelay(() => {
            console.log("update SUCCESS");
            return "SUCCESS";
        }, delayDuration);
    }
    deleteItem(data: T): Promise<string>{
        return Promise.resolve("");
    }
}
