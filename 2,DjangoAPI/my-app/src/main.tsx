import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {APP_ENV} from "./env";
import {ThemeProvider} from "./context/ThemeContext";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <Provider store={store}>
                <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.RECAPTCHA_KEY}>
                    <BrowserRouter>
                        <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_AUTH_KEY}>
                            <App/>
                        </GoogleOAuthProvider>
                    </BrowserRouter>
                </GoogleReCaptchaProvider>
            </Provider>
        </ThemeProvider>

    </>
)
