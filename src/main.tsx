import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import EditContextProvider from './context/EditContext';
import UploadContextProvider from './context/UploadContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <UploadContextProvider>
      <EditContextProvider>
        <App />
      </EditContextProvider>
    </UploadContextProvider>
  </AuthContextProvider>,
);
