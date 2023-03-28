import { Observable } from "rxjs";
import { useEffect } from 'react';

export function useSubscription<T>(source$: Observable<T>, nextHandler: (value: T)=> void, deps?:any[]){
    useEffect(() => {
        if(source$){
            const subs = source$.subscribe(nextHandler);

            return () => {
                console.log("I have unsubscribed in useSubscription");
                
                subs.unsubscribe()
            }
        }
    }, [deps? deps: null]);
}