const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

const IMAGE_BASE_URL = API_BASE_URL + '/' + 'images/';

const APP_ENV = {
    API_BASE_URL,
    RECAPTCHA_KEY,
    IMAGE_BASE_URL
}

export { APP_ENV };