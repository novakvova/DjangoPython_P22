import {Link} from "react-router";

const SuccessPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full text-center p-8">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold mb-2">Вам надіслано лист!</h1>
                <p className="text-gray-600 mb-6">
                    Тепер ви можете змінити пароль.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to={'/login'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        Перейти до входу
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
