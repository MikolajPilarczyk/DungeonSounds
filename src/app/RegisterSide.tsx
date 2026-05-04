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
        data.accountType = accountType;
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const message = await response.text();

            if (response.ok) {
                console.log("Zarejestrowano pomyślnie!");
                alert(message);
            }
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }
    };

    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [accountType, setAccountType] = useState<'chochlik' | 'bardodziej'>('chochlik');

    return(
        // Tło kontenera: ciemny szary z palety fantasy, usunięte zaokrąglenia
        <div className="p-8 md:p-12 flex flex-col justify-center bg-[#2a2a2a] text-[#e0e0e0] min-h-full">
            <div className="mb-8">
                <h2 className="text-3xl mb-2 text-[#ffb59c] font-serif">Dołącz do nas!</h2>
                <p className="text-[#8b8b8b]">Stwórz nowe konto</p>
            </div>

            {/* Wybór typu konta */}
            <div className="mb-6 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setAccountType('chochlik')}
                    className={`p-4 border-2 transition-all ${
                        accountType === 'chochlik'
                            ? 'border-[#ffb59c] bg-[#1c1c1c] text-[#ffb59c]'
                            : 'border-[#3a3a3a] bg-[#212121] text-[#8b8b8b] hover:border-[#ffb59c] hover:text-[#ffb59c]'
                    }`}
                >
                    <User className="w-6 h-6 mx-auto mb-2"/>
                    <span className="block">Chochlik</span>
                </button>
                <button
                    type="button"
                    onClick={() => setAccountType('bardodziej')}
                    className={`p-4 border-2 transition-all ${
                        accountType === 'bardodziej'
                            ? 'border-[#ffb59c] bg-[#1c1c1c] text-[#ffb59c]'
                            : 'border-[#3a3a3a] bg-[#212121] text-[#8b8b8b] hover:border-[#ffb59c] hover:text-[#ffb59c]'
                    }`}
                >
                    <GraduationCap className="w-6 h-6 mx-auto mb-2"/>
                    <span className="block">Bardodziej</span>
                </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block mb-2 text-[#e0e0e0]">Imię i nazwisko</label>
                    <input
                        type="text"
                        placeholder="Jan Kowalski"
                        className="w-full px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-transparent transition"
                        {...register("userNameAndSurname")}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-[#e0e0e0]">Email</label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] w-5 h-5"/>
                        <input
                            type="email"
                            placeholder="twoj@email.com"
                            className="w-full pl-12 pr-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-transparent transition"
                            {...register("userEmail")}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-[#e0e0e0]">Hasło</label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] w-5 h-5"/>
                        <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3 bg-[#1c1c1c] border border-[#3a3a3a] text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-transparent transition"
                            {...register("password")}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] hover:text-[#ffb59c] transition"
                        >
                            {showRegisterPassword ? <EyeOff className="w-5 h-5"/> :
                                <Eye className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox"
                           className="w-4 h-4 mt-1 bg-[#1c1c1c] text-[#ffb59c] border-[#3a3a3a] focus:ring-[#ffb59c]"
                           required
                           {...register("agreeToTerms")}
                    />
                    <span className="text-sm text-[#8b8b8b]">
                        Akceptuję{' '}
                        <a href="#" className="text-[#ffb59c] hover:text-[#ffc5a9] underline">
                            regulamin
                        </a>{' '}
                        i{' '}
                        <a href="#" className="text-[#ffb59c] hover:text-[#ffc5a9] underline">
                            politykę prywatności
                        </a>
                    </span>
                </label>

                <button
                    type="submit"
                    className="w-full bg-[#ffb59c] hover:bg-[#ffbfa0] text-[#1c1c1c] font-bold py-3 transition-colors"
                >
                    Zarejestruj się jako {accountType === 'chochlik' ? 'Chochlik' : 'Bardodziej'}
                </button>
            </form>
        </div>
    );
}