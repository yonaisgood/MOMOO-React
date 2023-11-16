import { useContext } from 'react';
import { PageContext } from '../context/PageContext';

export default function usePageContext() {
  const context = useContext(PageContext);

  return context;
}
