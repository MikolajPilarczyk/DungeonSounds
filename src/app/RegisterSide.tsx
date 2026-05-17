
export function RegisterSide()
{

//ZMIANA STYLU




    return(
        <div className="p-8 md:p-12 flex flex-col justify-center bg-[#2a2a2a] text-[#e0e0e0] min-h-full">
            <div className="mb-8">
                <h2 className="text-3xl mb-2 text-[#ffb59c] font-serif">Dołącz do nas!</h2>
                <p className="text-[#8b8b8b]">Stwórz nowe konto</p>
            </div>

            {/* Wybór typu konta */}

            <form className="space-y-5">


                <button>
                    <a>
                        <a href={"https://discord.com/oauth2/authorize?client_id=1497965024046747879&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=guilds+identify+connections"}>Login By Discord</a>
                    </a>
                </button>
            </form>
        </div>
    );
}