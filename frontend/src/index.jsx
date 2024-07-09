import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import App from './App';
import './index.css';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <ClerkProvider publishableKey="pk_test_dW5jb21tb24tc3R1cmdlb24tODMuY2xlcmsuYWNjb3VudHMuZGV2JA">
    <SignedIn>
      <App />
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
);


