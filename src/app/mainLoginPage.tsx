import {LoginSide} from "./Login.tsx";
import {RegisterSide} from "./RegisterSide.tsx";
import {useCookies} from "react-cookie";

export function MainLoginPage()
{
    const [cookie] = useCookies(["userData"])

    if(!cookie?.userData?.isLogged)
        return (
            <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center py-15 text-[#e0e0e0]">
                <div className="w-full max-w-6xl mx-auto p-4">
                    {/* Usunięto zaokrąglenia (rounded-*) i zmieniono tło kontenera */}
                    <div className="bg-[#2a2a2a] shadow-2xl border border-[#3a3a3a] overflow-hidden">
                        <div className="grid md:grid-cols-2 min-h-[600px]">
                            {/* Lewa strona - Logowanie */}
                            <LoginSide/>

                            {/* Prawa strona - Rejestracja */}
                            <RegisterSide/>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return (
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center py-15 text-[#e0e0e0]">
            <div className="w-full max-w-6xl mx-auto p-4">
                <div className="bg-[#2a2a2a] shadow-2xl border border-[#3a3a3a] overflow-hidden">
                    <div className="grid min-h-[600px]">
                        <h2 className="flex items-center justify-center text-2xl font-serif text-[#ffb59c]">
                            Jesteś już zalogowany
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}