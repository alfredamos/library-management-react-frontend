import { useState, useEffect} from "react";

interface Entity {
  id: string;
}

export function useFindResource<T extends Entity>(
  resources: T[],
  id: string
) {
  const [resource, setResource] = useState<T>({} as T);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resources) {
      
      const initialResource = resources?.find((resource) => resource.id === id);

      setResource(initialResource!);
      setIsLoading(false);
    }
  }, [resources]);

  return { resource, isLoading };
}
