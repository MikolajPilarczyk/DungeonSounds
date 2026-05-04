import {Lock, EyeOff, Eye, Mail} from "lucide-react";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export function LoginSide()
{
    interface UserLoginData
    {
        userEmail: string
        password: string
    }
    const userData =
        {
            userNameAndSurname: "",
            isLogged: false
        };
    const [cookies, setCookie] = useCookies(['userData']);

    const navigate = useNavigate()
    const {register, handleSubmit} = useForm<UserLoginData>()
    const onSubmit: SubmitHandler<UserLoginData> = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


            if (response.ok) {
                const userDataResponse = await response.json();


                if (userDataResponse.success) {
                    userData.userNameAndSurname = userDataResponse.userName
                    userData.isLogged = true
                    setCookie('userData', userData, { path: '/', maxAge: 604800 });
                    alert("Zalogowano " + cookies.userData?.userNameAndSurname + " " + cookies.userData?.isLogged);
                    navigate("/")
                } else {
                    alert("Hasło niepoprawne")
                }
            }
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }
    }

    const [showLoginPassword, setShowLoginPassword] = useState(false);

    return(
        <>
            {/* Zmieniono tło, usunięto zaokrąglenia, zmieniono obramowanie na szary/fantasy */}
            <div className="p-8 md:p-12 flex flex-col justify-center border-r border-[#3a3a3a] bg-[#2a2a2a] text-[#e0e0e0] min-h-full">
                <div className="mb-8">
                    <h1 className="text-3xl mb-2 text-[#ffb59c] font-serif">Witaj ponownie!</h1>
                    <p className="text-[#8b8b8b]">Zaloguj się do swojego konta</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block mb-2 text-[#e0e0e0]">Email</label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] w-5 h-5"/>
                            <input
                                type="email"
                                placeholder="twój@email.com"
                                className="w-full pl-12 pr-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-transparent transition"
                                {...register("userEmail")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-[#e0e0e0]">Hasło</label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] w-5 h-5"/>
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3 bg-[#1c1c1c] border border-[#3a3a3a] text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-transparent transition"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8b8b] hover:text-[#ffb59c] transition"
                            >
                                {showLoginPassword ? <EyeOff className="w-5 h-5"/> :
                                    <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox"
                                   className="w-4 h-4 bg-[#1c1c1c] text-[#ffb59c] border-[#3a3a3a] focus:ring-[#ffb59c]"/>
                            <span className="text-sm text-[#8b8b8b]">Zapamiętaj mnie</span>
                        </label>
                        <a href="#"
                           className="text-sm text-[#ffb59c] hover:text-[#ffc5a9] underline transition">
                            Zapomniałeś hasła?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ffb59c] hover:bg-[#ffbfa0] text-[#1c1c1c] font-bold py-3 transition-colors"
                    >
                        Zaloguj się
                    </button>
                </form>
            </div>
        </>
    );
}