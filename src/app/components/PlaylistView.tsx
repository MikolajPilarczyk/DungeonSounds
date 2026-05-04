import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    Castle,
    Lock,
    ChevronDown,
    Play,
    LucideStar,


} from 'lucide-react';
import {useCookies} from "react-cookie";



const TomeItem = ({ id, title, hymns, duration, icon: Icon, colorClass, isLocked, tracks }) => {
    const [isExpanded, setIsExpanded] = useState(id === 1);

    return (
        <div className={`group bg-[#1c1b1b] transition-all duration-300 hover:bg-[#2a2a2a] border-l-0 ${!isLocked && 'hover:border-l-4'} ${colorClass} overflow-hidden ${isLocked ? 'opacity-80' : ''}`}>
            <div
                className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={() => !isLocked && setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-[#353534] flex items-center justify-center border-2 border-[#5b403d] group-hover:border-current transition-colors ${colorClass.replace('border-', 'text-')}`}>
                        <Icon size={36} fill="currentColor" fillOpacity={0.2} />
                    </div>
                    <div>
                            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#e5e2e1] uppercase">{title}</h2>
                            <p className="font-sans text-xs uppercase tracking-widest text-[#c7c6c6] opacity-60">{hymns} HYMNS • {duration} MINUTES</p>

                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {isLocked ? (
                        <Lock size={28} className="text-[#c7c6c6]" />
                    ) : (
                        <ChevronDown size={28} className={`text-[#c7c6c6] transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                </div>
            </div>

            {isExpanded && !isLocked && (
                <div className="bg-[#0e0e0e] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border-t-2 border-[#5b403d]/20 p-8 space-y-4">
                    <div className="grid grid-cols-12 gap-4 font-sans text-[10px] uppercase tracking-widest text-[#ffb59c] mb-4 px-4">
                        <div className="col-span-1">#</div>
                        <div className="col-span-8">INCANTATION</div>
                        <div className="col-span-2 text-right">DURATION</div>
                        <div className="col-span-1 text-right">ACTION</div>
                    </div>
                    {tracks.map((track:any, idx:any) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#ffb59c]/5 transition-colors border-b border-[#5b403d]/10">
                            <div className="col-span-1 font-sans text-[#c7c6c6] opacity-40">{String(idx + 1).padStart(2, '0')}</div>
                            <div className="col-span-8 font-sans font-bold text-[#e5e2e1]">{track.title}</div>
                            <div className="col-span-2 text-right font-sans text-xs text-[#c7c6c6] tracking-widest">{track.time}</div>
                            <div className="col-span-1 text-right">
                                <button className="text-[#ffb59c] hover:scale-110 transition-transform">
                                    <Play size={18} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function PlaylistSets() {





    const { id } = useParams();
    const playlistID = Number(id);
    const[userPlaylistSets, setUserPlaylistSets] = useState<any[]>([]);
    const [playlistLenght,setPlaylistLenght] = useState();


    useEffect(() => {
        const getUserPlaylists = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/get-playlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ playlistId: playlistID }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserPlaylistSets(data);
                    setPlaylistLenght(data[0].playlists.length)
                    console.log("Pobrane playlisty:",data);
                } else {
                    console.error("Błąd serwera:", response.status);
                }
            } catch (error) {
                console.log("Błąd sieci:", error);
            }
        };

        if (playlistID) {
            getUserPlaylists();
        }

    }, [playlistID]);


    const [cookies] = useCookies(['userData']);
    const [isLiked, setIsLiked] = useState(false);
    const [getDataToLike] = useState({
        username: cookies?.userData?.userNameAndSurname,
        playlistId: playlistID
    });


    useEffect(() => {
        if (!getDataToLike || !getDataToLike.username || !getDataToLike.playlistId) {
            return;
        }

        const getLikedPlaylists = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/isLiked', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(getDataToLike),
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLiked(data);
                } else {
                    console.error("Błąd pobierania stanu polubienia");
                }
            } catch (error) {
                console.error("Błąd sieci:", error);
            }
        };

        getLikedPlaylists();

    }, [getDataToLike?.username, getDataToLike?.playlistId]);







    const changeLike = async () =>
    {



        setIsLiked(!isLiked);
        if(getDataToLike)
        {
            if(!isLiked){
                console.log(getDataToLike);
                try {
                    const response = await fetch('http://localhost:8080/api/like-playlist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(getDataToLike),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        alert(data)
                    }


                }
                catch (error) {

                }

            }
            else
            {
                try {
                    const response = await fetch('http://localhost:8080/api/unlike-playlist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(getDataToLike),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        alert(data)
                    }


                }
                catch (error) {

                }
            }

        }

    }

    return (
        <div className="bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 font-sans selection:bg-[#ffb59c]/30 selection:text-[#ffb59c] mt-20">

            <main className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20">
                <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter mb-4 font-serif">
                            {userPlaylistSets[0]?.title}
                        </h1>
                        <p className="text-xl text-[#c7c6c6] max-w-md">
                            {userPlaylistSets[0]?.description}
                        </p>
                    </div>

                    <div className="flex lg:justify-end">
                        {isLiked ? (
                            <button className="scale-190 p-4 text-[#ffb59c] transition-all duration-150 ease-in-out  hover:scale-220  text-5xl lg:text-6xl" onClick={() => changeLike()}>
                                <LucideStar />
                            </button>



                        ):(
                            <button className="scale-190 text-gray-200 p-4 transition-all duration-150 ease-in-out  hover:scale-220 text-5xl lg:text-6xl" onClick={() => changeLike()}>
                                <LucideStar />
                            </button>

                        )}

                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6 mb-12">

                    {userPlaylistSets[0]?.playlists?.map((playlist:any) => (
                        <TomeItem
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.title}
                            hymns={playlistLenght}
                            duration={0}
                            icon={Castle}
                            isLocked={false}
                            tracks={playlist.songs}
                            colorClass="border-[#ffb59c]"
                        />
                    ))}
                </section>


            </main>




        </div>
    );
}