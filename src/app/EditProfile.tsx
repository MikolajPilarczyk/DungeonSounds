import {type SubmitHandler, useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import {toast} from "sonner";
import {useRef, useState} from "react";
import { Upload, Trash2 } from "lucide-react";

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
                    console.log("Zmieniono dane pomyślnie pomyślnie!");
                    alert(message)
                    setCookie('userData', data.newUserName, {
                        path: '/',
                        maxAge: 3600 // 1 godzina
                    });
                }
            } catch (error) {
                console.error("Błąd połączenia:", error);
            }
        }
        else
        {
            alert("Nowa nazwa urzytkownika nie może być taka sama jak stara")
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
                    console.log("Zmieniono dane pomyślnie pomyślnie!");
                    alert(message)
                }

            }
            catch (error)
            {
                console.error("Błąd połączenia:", error);
            }


    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
                toast.success("Zdjęcie zostało wybrane");
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveAvatar = () => {
        setAvatarUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.info("Zdjęcie profilowe zostało usunięte");
    };

    if(cookies.userData.isLogged)
    {
        return (

            <div className="min-h-screen bg-[#f5f7fa]">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="mb-10">
                        <h1 className="text-[2rem] mb-2">Ustawienia profilu</h1>
                        <p className="text-[#6b7280] text-[0.9375rem]">Dodaj kilka informacji o sobie</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <form onSubmit={handleSubmitBio(onBioChangeSubmit)} className="space-y-8">
                            {/* Avatar Section */}
                            <div>
                                <h3 className="text-[1.125rem] mb-1">Zdjęcie Profilowe</h3>
                                <p className="text-[#6b7280] text-[0.875rem] mb-6">Zmień swoje zdjęcie profilowe</p>

                                <div className="flex items-center gap-6">
                                    <div className="size-20 rounded-lg bg-[#e5e7eb] flex items-center justify-center overflow-hidden">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
                                        ) : (
                                            <div className="text-[#9ca3af] text-[2rem]">👤</div>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
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
                                                className="flex items-center gap-2 px-5 py-2.5 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                                            >
                                                <Upload className="size-4" />
                                                Wybierz zdjęcie
                                            </button>
                                        </label>
                                        {avatarUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="flex items-center gap-2 px-5 py-2.5 border border-[#d1d5db] text-[#374151] rounded-lg hover:bg-[#f9fafb] transition-colors"
                                            >
                                                <Trash2 className="size-4" />
                                                Usuń profilowe
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div>
                                <label htmlFor="bio" className="block text-[0.9375rem] mb-2">
                                    Napisz coś o sobie
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    {...registerBio("bio")}
                                    placeholder="Opowiedz coś o sobie..."
                                    className="w-full px-4 py-3 border border-[#3b82f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                                >
                                    Zmień swoje bio
                                </button>
                            </div>
                        </form>

                            {/* Personal Info Section */}
                            <form onSubmit={handleSubmitUser(onUserNameChangeSubmit)} className="space-y-8">

                            <div>

                                <div className="space-y-5 my-15">
                                    <div >
                                        <div>
                                            <label htmlFor="firstName" className="block text-[0.875rem] mb-2 text-[#374151]">
                                                Nazwa urzytkownika
                                            </label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="Zmień swoją nazwe urzytkownika"
                                                {...registerUser("newUserName" )}
                                                className="w-full px-4 py-2.5 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                                            />

                                        </div>
                                    </div>


                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                                >
                                    Zmień nazwe urzytkownika
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
        <div>
            Zaloguj się aby mieć dostęp do tej podstrony
        </div>
            );


}