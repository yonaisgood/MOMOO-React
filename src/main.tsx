import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import EditContextProvider from './context/EditContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <EditContextProvider>
      <App />
    </EditContextProvider>
  </AuthContextProvider>,
);
