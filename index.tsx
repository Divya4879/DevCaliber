
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || 'your-tenant.auth0.com'}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || 'your_client_id_here'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
   