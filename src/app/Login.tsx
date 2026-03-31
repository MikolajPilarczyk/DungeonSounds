import {Lock,EyeOff,Eye, Mail} from "lucide-react";
import {useState} from "react";

export function LoginSide()
{
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    return(
      <>
          <div className="p-8 md:p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="mb-8">
                  <h1 className="text-3xl mb-2 text-blue-600">Witaj ponownie!</h1>
                  <p className="text-gray-600">Zaloguj się do swojego konta</p>
              </div>

              <form className="space-y-6">
                  <div>
                      <label className="block mb-2 text-gray-700">Email</label>
                      <div className="relative">
                          <Mail
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                          <input
                              type="email"
                              placeholder="twój@email.com"
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="block mb-2 text-gray-700">Hasło</label>
                      <div className="relative">
                          <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                          <input
                              type={showLoginPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                          <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                          >
                              {showLoginPassword ? <EyeOff className="w-5 h-5"/> :
                                  <Eye className="w-5 h-5"/>}
                          </button>
                      </div>
                  </div>

                  <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox"
                                 className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"/>
                          <span className="text-sm text-gray-600">Zapamiętaj mnie</span>
                      </label>
                      <a href="#"
                         className="text-sm text-blue-600 hover:text-blue-700 transition">
                          Zapomniałeś hasła?
                      </a>
                  </div>

                  <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                  >
                      Zaloguj się
                  </button>
              </form>
          </div>


      </>

    );
}