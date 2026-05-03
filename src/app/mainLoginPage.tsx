import {LoginSide} from "./Login.tsx";
import {RegisterSide} from "./RegisterSide.tsx";
import {useCookies} from "react-cookie";

export function MainLoginPage()
{
    const [cookie] = useCookies(["userData"])

    if(!cookie?.userData?.isLogged)
        return (
            <div>
                <div
                    className="size-full flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white py-15">
                    <div className="w-full max-w-6xl mx-auto p-4">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="grid md:grid-cols-2 min-h-[600px]">
                                {/* Lewa strona - Logowanie */}
                                <LoginSide/>

                                {/* Prawa strona - Rejestracja */}
                                <RegisterSide/>
                            </div>
                        </div>
                 </div>
            </div>
            </div>

        );
    else return (


        <>
            <div>
                <div
                    className="size-full flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white py-15">
                    <div className="w-full max-w-6xl mx-auto p-4">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="grid  min-h-[600px]">
                                <h2 className="flex items-center justify-center">Jesteś już zalogowany</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
    }