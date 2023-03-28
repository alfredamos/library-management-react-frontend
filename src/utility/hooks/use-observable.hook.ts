import { Observable } from "rxjs";
import { useState } from "react";
import { useSubscription } from "./use-subscription.hook";

export function useObservable<T>(source$: Observable<T>, initialState: T, deps?: any[]) {
  const [value, setValue] = useState(initialState);

  useSubscription(source$, setValue, deps);

  return value;
}
