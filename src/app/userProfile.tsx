import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {PlaylistWindow} from "./components/playlistWindow.tsx";


export function UserProfile() {
    const {username} = useParams();

    const [pageLiked, setPageLiked] = useState(true);

    const UsernameToSend= {
        usernameToFind: username
    }
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
    const [userProfile, setUserProfile] = useState({
        name: username || "Ładowanie...",
        avatar: "",
        bio: "Ładowanie opisu...",
        totalLikes: 0,
        totalMaterials: 0,
        premiumMaterials: 0
    });

    useEffect(() => {
        const sendUsername = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/find/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(UsernameToSend),
                });
                if(response.ok)
                {
                    const result = await response.json();
                    setNumberOfUsers(result);
                }
            }
            catch (error) {
                console.error("Błąd połączenia:", error);
            }


            const dataToSend = { userNameAndSurname: username };
            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Serwer odpowiedział:", result);
                    setUserProfile(prevState => ({
                        ...prevState,
                        bio: result.bio || "Brak bio",
                        totalLikes: result.likes ,
                        totalMaterials: result.materials ,
                    }));
                }
            } catch (error) {
                console.error("Błąd połączenia:", error);
            }
        };

        if (username) {
            sendUsername();
        }






    }, [username]);

    /*Sekcja z pobieraniem playlist z bazy danych*/



    const[userPlaylistSets, setUserPlaylistSets] = useState([]);
    const[userLikedPlaylistSets, setUserLikedPlaylistSets] = useState([]);

    useEffect(() => {
        const getUserPlaylists = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/playlists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usernameToFind: username }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserPlaylistSets(data);
                    console.log("Pobrane playlisty:",data);
                } else {
                    console.error("Błąd serwera:", response.status);
                }
            } catch (error) {
                console.log("Błąd sieci:", error);
            }
        };

        if (username) {
            getUserPlaylists();
        }

    }, [username]);



    useEffect(() => {
        const getUserLikePlaylists = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/get-liked-playlists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usernameToFind: username }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserLikedPlaylistSets(data);
                    console.log("Pobrane playlisty:",data);
                } else {
                    console.error("Błąd serwera:", response.status);
                }
            } catch (error) {
                console.log("Błąd sieci:", error);
            }
        };

        if (username) {
            getUserLikePlaylists();
        }

    }, [username]);




    if (numberOfUsers) {
        return (
            <div className={"min-w-screen max-w-full min-h-screen max-h-full bg-gradient-to-b from-[#131313] to-[#0e0e0e]"}>
                {userProfile?(
                    <div>
                        <main
                            className="pt-24 pb-32 px-6 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 min-h-screen">
                            <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                                <div
                                    className="bg-[#1c1b1b] p-8 border-l-8 border-[#ffb59c] relative overflow-hidden">
                                    <div className="absolute inset-0 grain-overlay"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div
                                            className="w-48 h-48 rounded-full border-4 border-[#ffb59c] p-1 bg-[#0e0e0e] mb-6">
                                            <div
                                                className="w-full h-full rounded-full overflow-hidden bg-[#353534]">
                                                <img alt="Character avatar" className="w-full h-full object-cover"
                                                     data-alt="Intense close up portrait of an elderly dwarven master bard with braided gray beard and ornate copper jewelry"
                                                src={"awatar"}
                                                />
                                            </div>
                                        </div>
                                        <h1 className="font-headline text-3xl font-bold tracking-tight text-[#ffb59c] uppercase text-center leading-tight mb-2">{userProfile?.name}</h1>
                                        <p className="font-label text-[10px] tracking-[0.2em] text-[#c7c6c6] uppercase mb-6 font-bold">Master of the Deep Echoes</p>
                                        <div className="w-full space-y-4 mb-8">
                                            <p className="text-[#e4beb9] text-sm text-center italic leading-relaxed">
                                                {/*Wpis w bio*/}
                                                <p>{userProfile?.bio}</p>
                                            </p>
                                        </div>
                                        <div
                                            className="w-full grid grid-cols-1 gap-2 border-t-4 border-[#353534] pt-6">
                                            <div
                                                className="flex justify-between items-center bg-[#353534] p-3 metallic-chamfer">
                                                <span
                                                    className="font-label text-[10px] text-[#c7c6c6] uppercase font-bold tracking-widest">Wykute Playlisty</span>
                                                <span
                                                    className="font-headline text-xl text-[#ffb59c] font-bold">{userPlaylistSets?.length}</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center bg-[#353534] p-3 metallic-chamfer">
                                                <span
                                                    className="font-label text-[10px] text-[#c7c6c6] uppercase font-bold tracking-widest">Monety rzucone dla barda</span>
                                                <span
                                                    className="font-headline text-xl text-[#ffb4ab] font-bold">
                                                    {userProfile?.totalLikes}

                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <button
                                        className="bg-gradient-to-r from-[#ffb59c] to-[#a93500] text-[#5c1900] font-label font-black uppercase py-4 tracking-widest active:scale-95 transition-transform">
                                        <Link to={"/dodaj-wpis"}>
                                            Wykuj nową ballade

                                        </Link>
                                    </button>
                                    <button
                                        className="border-2 border-[#ab8985] text-[#c7c6c6] hover:bg-[#ffb59c]/10 font-label font-bold uppercase py-4 tracking-widest active:scale-95 transition-transform">
                                        SUMMON ARMORY
                                    </button>
                                </div>
                            </aside>
                            <section className="md:col-span-8 lg:col-span-9">
                                <div className="flex gap-1 mb-8 bg-[#0e0e0e] p-1 max-w-fit">
                                    {pageLiked?(
                                        <div>
                                            <button
                                            className="px-8 py-3 font-headline font-bold text-[#ffb59c] border-b-2 border-[#ffb59c] bg-[#2a2a2a] uppercase tracking-tighter"
                                            onClick={()=> setPageLiked(true)}>
                                                Polubione
                                        </button>
                                            <button
                                                className="px-8 py-3 font-headline font-bold text-[#c7c6c6] hover:text-[#ffb59c] transition-colors uppercase tracking-tighter"
                                                onClick={()=> setPageLiked(false)}>



                                                Udostępnione
                                            </button></div>



                                    ):(
                                        <div>
                                            <button
                                                className="px-8 py-3 font-headline font-bold text-[#c7c6c6] hover:text-[#ffb59c] transition-colors uppercase tracking-tighter"
                                                onClick={()=> setPageLiked(true)}>
                                                Polubione
                                            </button>
                                            <button
                                                className="px-8 py-3 font-headline font-bold text-[#ffb59c] border-b-2 border-[#ffb59c] bg-[#2a2a2a] uppercase tracking-tighter"

                                                onClick={()=> setPageLiked(false)}>

                                                Udostępnione
                                            </button>
                                        </div>



                                    )}

                                </div>
                                <div >
                                    {/*Miejsce na playlisty*/}
                                    {pageLiked?(
                                        <div className="grid grid-cols-3 gap-4 p-4">


                                            {
                                                userLikedPlaylistSets.map((playlist:any) =>
                                                    <Link to={`/grymuar/${playlist.id}`}>
                                                        <PlaylistWindow title={playlist.title} vibe={playlist.category} tracks={playlist.playlists.length} />
                                                    </Link>

                                                )
                                            }





                                        </div>
                                    ):(
                                        <div>
                                            {
                                                userPlaylistSets?.length>0?(
                                                    <div className="grid grid-cols-3 gap-4 p-4">

                                                    {
                                                            userPlaylistSets.map((playlist:any) =>
                                                                <Link to={`/grymuar/${playlist.id}`}>
                                                                    <PlaylistWindow title={playlist.title} vibe={playlist.category} tracks={playlist.playlists.length} />
                                                                </Link>

                                                            )
                                                        }
                                                    </div>


                                                ):(
                                                    <div>Nie jest</div>
                                                )
                                            }

                                        </div>

                                    )}


                                </div>
                            </section>
                        </main>

                    </div>


                ) : (
                    <div className={"relative flex flex-col items-center gap-8"}>Ładowanie...</div>
                )}
            </div>
        );
    } else
        return ("Nie ma takiego użytkownika")

}