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

        userNameAndSurname:string;
        bio: string;
    };


    const {
        register: registerUser,
        handleSubmit: handleSubmitUser
    } = useForm<UsernameForm>();

    const {
        register: registerBio,
        handleSubmit: handleSubmitBio
    } = useForm<BioFormData>();






    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const onUserNameChangeSubmit:SubmitHandler<UsernameForm> = async (data)=>
    {
        data.username = cookies.userData.userNameAndSurname;
        if(data.username!=data.newUserName)
        {
            try {
                const response = await fetch('http://localhost:8080/api/edit-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const message = await response.text()

                if (response.ok) {
                    console.log("Zmieniono dane pomyślnie!");
                    toast.success(message); // Zmieniono alert na toast dla spójności
                    setCookie('userData', data.newUserName, {
                        path: '/',
                        maxAge: 3600 // 1 godzina
                    });
                }
            } catch (error) {
                console.error("Błąd połączenia:", error);
                toast.error("Wystąpił błąd podczas zmiany nazwy.");
            }
        }
        else
        {
            toast.error("Nowa nazwa użytkownika nie może być taka sama jak stara");
        }

    }

    const onBioChangeSubmit:SubmitHandler<BioFormData> = async (data)=>
    {
        data.userNameAndSurname = cookies.userData.userNameAndSurname;
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
                console.log("Zmieniono dane pomyślnie!");
                toast.success(message); // Zmieniono alert na toast
            }

        }
        catch (error)
        {
            console.error("Błąd połączenia:", error);
            toast.error("Wystąpił błąd podczas zmiany bio.");
        }


    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
                toast.success("Magiczny zwój ze zdjęciem został wybrany");
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveAvatar = () => {
        setAvatarUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.info("Wizerunek profilowy został usunięty z kronik");
    };

    // Poprawiono literówkę 'urzytkownika' na 'użytkownika' w renderowaniu

    if(cookies.userData?.isLogged)
    {
        return (

            // Tło strony: Ciemny motyw Fantasy (z palety)
            <div className="min-h-screen bg-[#1c1c1c] py-20 font-sans text-[#e0e0e0]">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="mb-10 border-b border-[#3a3a3a] pb-6">
                        {/* Nagłówek: Kolor Primary (jasny róż) z palety */}
                        <h1 className="text-[2.5rem] mb-2 font-serif text-[#ffb59c] tracking-tight">Krypta Profilu</h1>
                        {/* Podtytuł: Kolor Secondary (szary) z palety */}
                    </div>

                    {/* Główny kontener: Nieco jaśniejszy szary z palety, subtelne obramowanie Secondary */}
                    <div className="bg-[#2a2a2a]  shadow-xl p-10 border border-[#3a3a3a]">
                        <form onSubmit={handleSubmitBio(onBioChangeSubmit)} className="space-y-10">
                            {/* Avatar Section */}
                            <div>
                                <h3 className="text-[1.25rem] mb-1 font-semibold text-[#ffb59c]">Wizerunek</h3>
                                <p className="text-[#8b8b8b] text-[0.9rem] mb-6">Zmień runiczny znak swego oblicza</p>

                                <div className="flex items-center gap-8 border border-[#3a3a3a] p-6 bg-[#212121]">
                                    <div className="size-24  bg-[#1c1c1c] flex items-center justify-center overflow-hidden border-2 border-[#8b8b8b] shadow-inner">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
                                        ) : (
                                            // Ikona domyślna w kolorze Secondary
                                            <User className="size-12 text-[#8b8b8b]" />
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                            id="avatar-upload"
                                        />
                                        <label htmlFor="avatar-upload">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                // Przycisk Primary: Jasny róż, ciemny tekst
                                                className="flex items-center gap-2.5 px-6 py-3 bg-[#ffb59c] text-[#1c1c1c] font-bold hover:bg-[#ffbfa0] transition-all duration-300 shadow-md"
                                            >
                                                <Upload className="size-5" />
                                                Wybierz wizerunek
                                            </button>
                                        </label>
                                        {avatarUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                // Przycisk Outlined: Obramowanie Secondary
                                                className="flex items-center gap-2.5 px-6 py-3 border border-[#8b8b8b] text-[#8b8b8b]  hover:bg-[#3a3a3a] hover:text-[#ffb59c] transition-all duration-300"
                                            >
                                                <Trash2 className="size-5" />
                                                Porzuć wizerunek
                                            </button>
                                        )}
                                    </div>
                                </div>
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
                                    // Pole tekstowe: Ciemne tło, obramowanie Secondary, focus Primary
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

                        <div className="my-12 border-t border-[#3a3a3a]"></div>

                        {/* Personal Info Section */}
                        <form onSubmit={handleSubmitUser(onUserNameChangeSubmit)} className="space-y-10">

                            <div>
                                <h3 className="text-[1.25rem] mb-6 font-semibold text-[#ffb59c]">Miano Wywoławcze</h3>

                                <div className="space-y-6">
                                    <div >
                                        <div>
                                            <label htmlFor="firstName" className="block text-[1rem] font-medium mb-3 text-[#e0e0e0]">
                                                Nazwa użytkownika
                                            </label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="Wpisz swe nowe miano..."
                                                {...registerUser("newUserName" )}
                                                // Pole tekstowe
                                                className="w-full px-5 py-3.5 bg-[#1c1c1c] border border-[#3a3a3a] -lg text-[#e0e0e0] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ffb59c] focus:border-[#ffb59c] transition-all"
                                            />

                                        </div>
                                    </div>


                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    // Przycisk Primary
                                    className="px-10 py-3.5 bg-[#ffb59c] text-[#1c1c1c] font-bold  hover:bg-[#ffbfa0] transition-all duration-300 shadow-lg text-[1rem]"
                                >
                                    Zmień swe miano
                                </button>
                            </div>
                        </form>
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