import { BackendServiceI } from "../types/common.types";
import { BaseModelI } from "../types/Facility.type";

const localStorageToken = 'FACILITIES'
const delayDuration = 1000;

export class LocalStorageService<T extends BaseModelI> implements BackendServiceI<T>{

    private getLocalStorageData<T extends BaseModelI>(): T[]{
        
        const facilityListData = localStorage.getItem(localStorageToken);
        return facilityListData ? JSON.parse(facilityListData) : [];
    }

    private setLocalStorageData<T extends BaseModelI>(data: T[]): void {
        localStorage.setItem(localStorageToken, JSON.stringify(data || []));
    }

    private resolveWithDelay(fn: () => void, duration: number): Promise<any> {
        return new Promise((res) => {
            setTimeout(() => {
                res(fn());
            }, duration)
        });
    };

    public getList(): Promise<T[]> {
        return this.resolveWithDelay(() => this.getLocalStorageData(), delayDuration);
    }
    
    public getItem(id: string): Promise<T>{
        const list = this.getLocalStorageData();
        const itemDetails = (list || []).find(item => item.id === id);
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
            return "SUCCESS";
        }, delayDuration);
    }
    
    public putItem<T extends BaseModelI>(data: T): Promise<string>{
        let list = this.getLocalStorageData();
        list = (list || []).map(item => item.id === data.id ? {...data} : item);
        this.setLocalStorageData(list);
        return this.resolveWithDelay(() => {
            return "SUCCESS";
        }, delayDuration);
    }
    deleteItem(id: string): Promise<string>{
        let list = this.getLocalStorageData();
        this.setLocalStorageData((list || []).filter(item => item.id !== id));
        return this.resolveWithDelay(() => {
            return "SUCCESS";
        }, delayDuration);
    }
}
