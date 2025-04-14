import { createContext, ReactNode, useState } from 'react';

export type NumContextType = {
  num: number;
  setNum: (number: number) => void;
};

export const NumContext = createContext<NumContextType | null>(null);

export const NumContextProvider = ({ children }: { children: ReactNode }) => {
  const [num, setNum] = useState<number>(0);

  return <NumContext value={{ num, setNum }}>{children}</NumContext>;
};
