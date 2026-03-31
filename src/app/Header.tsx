import { Link } from 'react-router-dom';


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
                    <button className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
                       <Link to="/mainLoginPage">Zaloguj się</Link>
                    </button>
                </div>
            </div>
        </header>

    )
}