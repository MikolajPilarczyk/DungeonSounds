import { useState } from 'react';
import { User, GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

export function RegisterSide()
{



    interface UserRegisterData {
        userNameAndSurname: string;
        userEmail: string;
        password: string;
        agreeToTerms: boolean;
        accountType: string;
    }
    const {register, handleSubmit} = useForm<UserRegisterData>();
    const onSubmit: SubmitHandler<UserRegisterData> = async (data) => {
        data.accountType=accountType
            try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const message = await response.text()

            if (response.ok) {
                console.log("Zalogowano pomyślnie!");
                alert(message);
            }
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }



    };


    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [accountType, setAccountType] = useState<'student' | 'tutor'>('student');


    return(
        <div
            className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white">
            <div className="mb-8">
                <h2 className="text-3xl mb-2 text-blue-600">Dołącz do nas!</h2>
                <p className="text-gray-600">Stwórz nowe konto</p>
            </div>

            {/* Wybór typu konta */}
            <div className="mb-6 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setAccountType('student')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                        accountType === 'student'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                >
                    <User className="w-6 h-6 mx-auto mb-2"/>
                    <span className="block">Uczeń</span>
                </button>
                <button
                    type="button"
                    onClick={() => setAccountType('tutor')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                        accountType === 'tutor'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                >
                    <GraduationCap className="w-6 h-6 mx-auto mb-2"/>
                    <span className="block">Korepetytor</span>
                </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block mb-2 text-gray-700">Imię i nazwisko</label>
                    <input
                        type="text"
                        placeholder="Jan Kowalski"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        {...register("userNameAndSurname")}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Email</label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <input
                            type="email"
                            placeholder="twoj@email.com"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            {...register("userEmail")}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Hasło</label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            {...register("password")}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                            {showRegisterPassword ? <EyeOff className="w-5 h-5"/> :
                                <Eye className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox"
                           className="w-4 h-4 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                           required
                           {...register("agreeToTerms")}

                    />
                    <span className="text-sm text-gray-600">
                    Akceptuję{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                      regulamin
                    </a>{' '}
                        i{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                      politykę prywatności
                    </a>
                  </span>
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                    Zarejestruj się jako {accountType === 'student' ? 'Uczeń' : 'Korepetytor'}
                </button>
            </form>
        </div>


    );
}