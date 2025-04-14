import { use } from 'react';
import { NumContext } from '../context/num-context';

export default function useNum() {
  const context = use(NumContext);
  if (!context) throw new Error('useNum 必須在 NumContextProvider 內使用');
  return context;
}
