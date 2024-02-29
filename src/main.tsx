import * as ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './modules';
import { AuthContextProvider } from './context/AuthContext';
import EditContextProvider from './context/EditContext';
import UploadContextProvider from './context/UploadContext.tsx';

import App from './App.tsx';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <AuthContextProvider>
      <UploadContextProvider>
        <EditContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </EditContextProvider>
      </UploadContextProvider>
    </AuthContextProvider>
  </HelmetProvider>,
);
