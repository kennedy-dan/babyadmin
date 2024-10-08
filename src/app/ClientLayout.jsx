'use client'
import './globals.css'
// import { Metadata } from 'next'

import Providers from '~/redux/provider';
import AxiosConfig from '../AxiosConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/redux/store';
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
  icons: {
    icon: '/favicon.ico', // /public/favicon.ico
    // You can add more sizes or formats if needed:
    // apple: '/apple-icon.png',
    // shortcut: '/shortcut-icon.png',
  },
}


export default function RootLayout({ children }) {
    return (
        <html lang="en">
              <body>
        <Providers>
           <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            pauseOnFocusLoss={false}
            transition={Zoom}

            // limit={1}
          />
        <PersistGate loading={null} persistor={persistor}>
          <AxiosConfig>
            {children}
          </AxiosConfig>
        </PersistGate>
        </Providers>
      </body>
        </html>
    );
}
