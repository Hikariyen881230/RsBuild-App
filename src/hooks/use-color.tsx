import { use } from 'react';
import { ColorContext } from '../context/color-context';

export default function useColor() {
  const context = use(ColorContext);
  if (!context) throw new Error('useColor 必須在 ColorContextProvider 內使用');
  return context;
}
