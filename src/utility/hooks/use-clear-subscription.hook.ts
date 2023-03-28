import { useEffect } from "react";
import { Subscription } from "rxjs";

export function useClearSubscription(subscription: Subscription) {
  console.log("At point 1, In clear-subscription");

  useEffect(() => {
    return () => {
      console.log("I have unsubscribed in useClearSubscription");
      
      subscription?.unsubscribe();
    
    };
  }, [subscription]);
}
