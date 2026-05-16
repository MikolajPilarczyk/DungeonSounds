import {useCookies} from "react-cookie";

export function LoginSide()
{

    const userData =
        {
            userId: "",
            userDiscordId: "",
            isLogged: false
        };
    const [cookies, setCookie] = useCookies(['userData']);



    return(
        <>
            {/* Zmieniono tło, usunięto zaokrąglenia, zmieniono obramowanie na szary/fantasy */}
            <div className="p-8 md:p-12 flex flex-col justify-center border-r border-[#3a3a3a] bg-[#2a2a2a] text-[#e0e0e0] min-h-full">
                <div className="mb-8">
                    <h1 className="text-3xl mb-2 text-[#ffb59c] font-serif">Witaj ponownie!</h1>
                    <p className="text-[#8b8b8b]">Zaloguj się do swojego konta</p>
                </div>

                <form className="space-y-6" >


                    <div>

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