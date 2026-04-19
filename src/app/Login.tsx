import {Lock,EyeOff,Eye, Mail} from "lucide-react";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export function LoginSide()
{
    interface UserLoginData
    {
        userEmail:string
        password:string
    }
    const userData =
    {
        userNameAndSurname: "",
        isLogged: false
    };
    const [cookies, setCookie] = useCookies(['userData']);

    const navigate = useNavigate()
    const{register,handleSubmit} = useForm<UserLoginData>()
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


                if(userDataResponse.success)
                {
                    userData.userNameAndSurname = userDataResponse.userName
                    userData.isLogged = true
                    setCookie('userData', userData, { path: '/', maxAge: 604800 });
                    alert("Zalogowano" + cookies.userData.userNameAndSurname + cookies.userData.isLogged)
                    navigate("/")
                }
                else
                {
                    alert("Hasło nie poprawne")
                }
            }
        } catch (error) {
            console.error("Błąd połączenia:", error);
        }


    }
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    return(
      <>
          <div className="p-8 md:p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="mb-8">
                  <h1 className="text-3xl mb-2 text-yellow-600">Witaj ponownie!</h1>
                  <p className="text-gray-600">Zaloguj się do swojego konta</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <label className="block mb-2 text-gray-700">Email</label>
                      <div className="relative">
                          <Mail
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                          <input
                              type="email"
                              placeholder="twój@email.com"
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                              {...register("userEmail")}
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
                              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                              {...register("password")}
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
                                 className="w-4 h-4 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"/>
                          <span className="text-sm text-gray-600">Zapamiętaj mnie</span>
                      </label>
                      <a href="#"
                         className="text-sm text-yellow-600 hover:text-yellow-700 transition">
                          Zapomniałeś hasła?
                      </a>
                  </div>

                  <button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors"
                  >
                      Zaloguj się
                  </button>
              </form>
          </div>


      </>

    );
}