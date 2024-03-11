import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'
const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-dn4vpdadvdtnjbil.us.auth0.com"
    clientId="UZRxW3T2sqbMnKKzAi8lZ7mb35dXBtoY"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
