import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
//https://react-icons.github.io/react-icons/search/#q=info

//git push -u origin main
//npm run build
//npm run deploy

import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
