import { createContext, ReactNode, useState } from 'react';

export type ColorContextType = {
  color: string;
  setColor: (color: string) => void;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const ColorContextProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<string>('#007595');

  return <ColorContext value={{ color, setColor }}>{children}</ColorContext>;
};
