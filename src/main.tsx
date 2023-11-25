import * as ReactDOM from 'react-dom/client';

import { AuthContextProvider } from './context/AuthContext';
import EditContextProvider from './context/EditContext';
import UploadContextProvider from './context/UploadContext.tsx';
import PageContextProvider from './context/PageContext';

import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <UploadContextProvider>
      <EditContextProvider>
        <PageContextProvider>
          <App />
        </PageContextProvider>
      </EditContextProvider>
    </UploadContextProvider>
  </AuthContextProvider>,
);
