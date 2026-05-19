import {type SubmitHandler, useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {toast} from "sonner";
import {useRef, useState} from "react";
import { Upload, Trash2, User } from "lucide-react"; // Dodano User dla lepszej ikony

export function EditProfile()
{

    const[cookies,setCookie] = useCookies(['userData']);
    interface UsernameForm
    {
        username: string;
        newUserName: string;
    };
    interface BioFormData
    {

        id:number;
        bio: string;
    };






    const {
        register: registerBio,
        handleSubmit: handleSubmitBio
    } = useForm<BioFormData>();




    const onBioChangeSubmit:SubmitHandler<BioFormData> = async (data)=>
    {


        data.id = cookies?.userData.id;
        try {
            const response = await fetch('http://localhost:8080/api/edit-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const message = await response.text()

            if (response.ok) {
                alert("Zmieniono dane pomyślnie!");
                toast.success(message);
            }

        }
        catch (error)
        {
            console.error("Błąd połączenia:", error);
            toast.error("Wystąpił błąd podczas zmiany bio.");
        }


    }





    if(cookies.userData?.isLogged)
    {
        return (

            // Tło strony: Ciemny motyw Fantasy (z palety)
            <div className="min-h-screen bg-[#1c1c1c] py-20 font-sans text-[#e0e0e0]">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="mb-10 border-b border-[#3a3a3a] pb-6">

                        <h1 className="text-[2.5rem] mb-2 font-serif text-[#ffb59c] tracking-tight">Krypta Profilu</h1>

                    </div>


                    <div className="bg-[#2a2a2a]  shadow-xl p-10 border border-[#3a3a3a]">
                        <form onSubmit={handleSubmitBio(onBioChangeSubmit)} className="space-y-10">
                            {/* Avatar Section */}
                            <div>
                                <h3 className="text-[1.25rem] mb-1 font-semibold text-[#ffb59c]">Wizerunek</h3>
                                <p className="text-[#8b8b8b] text-[0.9rem] mb-6">Zmień runiczny znak swego oblicza</p>


                            </div>

                            {/* Bio Section */}
                            <div>
                                <label htmlFor="bio" className="block text-[1rem] font-medium mb-3 text-[#e0e0e0]">
                                    Runiczne podanie o sobie
                                </label>
                                <textarea
                                    id="bio"
                                    rows={5}
                                    {...registerBio("bio")}
                                    placeholder="Opowiedz swoją przygode..."
                                    className="w-full px-5 py-4 bg-[#1c1c1c] border border-[#3a3a3a]  text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-[#ffb59c] resize-none transition-all"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    // Przycisk Primary
                                    className="px-10 py-3.5 bg-[#ffb59c] text-[#1c1c1c] font-bold  hover:bg-[#ffbfa0] transition-all duration-300 shadow-lg text-[1rem]"
                                >
                                    Wyryj swe bio
                                </button>
                            </div>
                        </form>


                        {/* Personal Info Section */}

                    </div>
                </div>
            </div>
        );
    }
    else return
    (
        // Ekran błędu również w mrocznym stylu
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center font-sans text-[#8b8b8b]">
            <div className="bg-[#2a2a2a] p-10 -xl border border-[#3a3a3a] shadow-xl text-center">
                <User className="size-16 mx-auto mb-6 text-[#ffb59c] opacity-50" />
                <h2 className="text-2xl font-serif text-[#ffb59c] mb-4">Dostęp Wzbroniony</h2>
                <p className="mb-8">Przejdź przez portal logowania, aby uzyskać dostęp do tej komnaty.</p>
                <a href="/login" className="px-8 py-3 bg-[#3a3a3a] text-[#ffb59c]  hover:bg-[#4a4a4a] transition-all">
                    Przejdź do Portalu
                </a>
            </div>
        </div>
    );


}