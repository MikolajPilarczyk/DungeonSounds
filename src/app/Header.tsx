import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";

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

        <div className="px-6">
            <button className="px-6 py-2.5 m-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
                    onClick={hadleLogout}
            >

                <Link to="/mainLoginPage">Wyloguj</Link>
            </button>
            <button className="px-6 py-2.5 m-4 bg-white hover:bg-blue-6 00 border-blue-700 border-2 text-blue-700 hover:text-white rounded-lg font-medium transition-colors duration-200"
            >

                <Link to={`/profile/${cookies.userData.userNameAndSurname}`}>Profil Użytkownika</Link>
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
        return ( <button className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
            <Link to="/mainLoginPage">Zaloguj się</Link>
        </button>);

    }
}


export function Header()
{
    return(
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                                Learnly
                            </h1>
                            <p className="text-sm text-gray-500">Znajdź idealnego korepetytora</p>
                        </div>
                    </div>

                    <ButtonLogin></ButtonLogin>

                </div>
            </div>
        </header>

    )
}