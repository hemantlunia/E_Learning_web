import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from './components/ui/sonner'
import Custom from './components/CustomLoading'



createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <Custom>
    <App />
    <Toaster/>
    </Custom>
  </Provider>,
)





