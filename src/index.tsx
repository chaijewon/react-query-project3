import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries:{
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
            retry:false,
            staleTime:5*60*1000 // 5분
        }
    }
});
const rootElement = document.getElementById('root');
if(rootElement){
    // rootElement가 null 아니면
    const root=ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
