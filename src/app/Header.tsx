import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";
import {BoltIcon , SquarePlus} from "lucide-react";

function ButtonLogOut()
{

    const [cookies,setCookie] = useCookies(['userData']);
    const hadleLogout = () =>{
        const userData = {
                isLogged: false,
                userNameAndSurname: ""
            };
        alert("Wylogowano " + cookies.userData.userNameAndSurname )
        setCookie('userData',userData,{path: '/'})
    }


    return(

    <div className="login flex">
        <div className="px-6">
            <button className="px-6 py-2.5 m-4 bg-yellow-700 hover:bg-yellow-600 hover:text-yellow-950 00  font-medium transition-colors duration-200"
                    onClick={hadleLogout}
            >

                <Link to="/mainLoginPage">Wyloguj</Link>
            </button>


            <button className="px-6 py-2.5 m-4 bg-yellow-950  hover:bg-yellow-600 border-yellow-700 border-2 text-yellow-700 hover:text-neutral-800    font-medium transition-colors duration-200">
                <Link to={`/profile/${cookies.userData.userNameAndSurname}`}>Profil Użytkownika</Link>
            </button>




        </div>
            <button className="px-6 py-2.5 m-4 bg-yellow-950  hover:bg-yellow-600 border-yellow-700 border-2 text-yellow-700 hover:text-neutral-800   font-medium transition-colors duration-200">
                <Link to={`/edycja-profilu`}>
                <BoltIcon>
                </BoltIcon>
                </Link>
            </button>
            <button className="px-6 py-2.5 m-4 bg-yellow-950  hover:bg-yellow-600 border-yellow-700 border-2 text-yellow-700 hover:text-neutral-800  font-medium transition-colors duration-200">
                <Link to={`/dodaj-wpis`}>
                    <SquarePlus>
                    </SquarePlus>
                </Link>
            </button>
    </div>


    );


}


function ButtonLogin()
{

    const [cookies] = useCookies(['userData']);
    if(cookies.userData.isLogged)
    {
        return(
            <ButtonLogOut></ButtonLogOut>
        );
    }
    else
    {
        return ( <button className="px-6 py-2.5 bg-yellow-700 hover:bg-yellow-600 text-neutral-900 rounded-lg font-medium transition-colors duration-200">
            <Link to="/mainLoginPage">Zaloguj się</Link>
        </button>);

    }
}


export function Header()
{
    return(
        <header className="bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <div>
                            <Link to={"/"}>
                                <h1 className="text-3xl font-bold bg-gradient-to-r font-serif from-yellow-700 to-yellow-500 bg-clip-text text-transparent">
                                    DungeonSounds
                                </h1>
                            </Link>
                            <p className="text-sm text-gray-400">Znajdź idealną playliste do swojej sesji RPG</p>
                        </div>
                    </div>

                    <ButtonLogin></ButtonLogin>

                </div>
            </div>
        </header>

    )
}