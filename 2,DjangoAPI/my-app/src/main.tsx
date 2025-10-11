import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {APP_ENV} from "./env";

createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.RECAPTCHA_KEY}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </GoogleReCaptchaProvider>
        </Provider>

    </>
)
