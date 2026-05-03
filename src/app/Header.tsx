import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";
import {BoltIcon } from "lucide-react";







function IsLoggedIn()
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







        <button className="px-6 py-2.5 m-4 text-gray-100 hover:text-yellow-950 00  font-medium transition-colors duration-200"
        >
        </button>
        <button className="px-6 py-2.5 m-4  text-gray-100 hover:text-yellow-950 00  font-medium transition-colors duration-200"
                onClick={hadleLogout}
        >

            <Link to="/mainLoginPage">Wyloguj</Link>
        </button>
        <button className="px-6 py-2.5 m-4 text-gray-100 hover:text-yellow-950 00  font-medium transition-colors duration-200"
        >
            <Link to={`/edycja-profilu`}>
                <BoltIcon>
                </BoltIcon>
            </Link>
        </button>
    </div>


    );


}


function NotLoggedIn()
{


        return (
            <button className="px-6 py-2.5 m-4 text-red-300 hover:text-yellow-950 00  font-medium transition-colors duration-200">

            <Link to="/mainLoginPage">Zaloguj się</Link>
        </button>);

}


export function Header()
{
    const [cookies] = useCookies(['userData']);

    return (
        <nav
            className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-[#131313] border-b-4 border-[#464747]">
            <div className="text-2xl font-black text-[#ffb59c] tracking-widest font-headline uppercase">
                Grymuar Fausta
            </div>

            {/* Prawy kontener z elementami w jednym rzędzie */}
            <div className="flex items-center gap-8">
                {cookies?.userData?.isLogged ? (
                    <>
                        <div className="hidden md:flex gap-8 items-center">
                            <Link className="text-[#c7c6c6] hover:text-[#ffb59c] font-headline tracking-tighter uppercase font-bold transition-all duration-300"
                                  to="/dodaj-wpis">Wykuj grymuar</Link>
                            <a className="text-[#c7c6c6] hover:text-[#ffb59c] font-headline tracking-tighter uppercase font-bold transition-all duration-300"
                               href="#">Włącz muzykę</a>
                            <a className="text-[#c7c6c6] hover:text-[#ffb59c] font-headline tracking-tighter uppercase font-bold transition-all duration-300"
                               href="#">RUNES</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="material-symbols-outlined text-secondary p-2 transition-all active:scale-95">
                            </button>

                        </div>
                        <IsLoggedIn />
                        <div className="w-10 h-10 border-2 border-primary bg-surface-container-high overflow-hidden">
                            <Link to={`/profile/${encodeURIComponent(cookies?.userData?.userNameAndSurname || '')}`}>
                                <img alt="Dwarven hero avatar" className="w-full h-full object-cover grayscale contrast-125"
                                     data-alt="Dwarven warrior with braided beard and glowing copper eyes wearing heavy dark iron plate armor"
                                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRAm5-YVoLQV-_9fyCzCOHBtHxkchsPrKXlwOvqPylzQBt3GTsKD5Y6W3Lr-D1VFspOlWYnNQEMn0sPNvvjeQgzOdP8WnpIFoQ25k8Mid4NXdWlnet9wQGh7rC9saGfYlKm-Eguz9FIMZAXsDA-nj3g5-Tya05mGVOQD8hUD5WgtHuQoWgXBtMGKpXPDtJ_0UzeMkd90goCuGml4FdpXEkFU0pU7rEAIOZcDj6IdXNh8Mo7fuLQbBZMLL5nmu9NO4XLPluIxxKHYW7"/>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div>
                        <NotLoggedIn />
                    </div>
                )}
            </div>
        </nav>
    );
}