import { type ElementType, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
    Castle,
    ChevronDown,
    Play as PlayIcon,
    LucideStar,
    PauseIcon
} from 'lucide-react';
import { useCookies } from "react-cookie";
import type {Cookie} from "react-router";

interface Track {
    id: number;
    title: string;
    url: string;
    time?: string;
}

interface TomeItemProps {
    id: number;
    title: string;
    hymns: number;
    duration: string;
    icon: ElementType;
    colorClass: string;
    tracks: Track[];
    onPlayToggle: (id: number) => void;
    isPlayed: boolean;
}

interface DiscordServer
{
    serverId: string;
    serverName: string;
    serverIconUrl: string;
}


//const [isPlayed, setIsPlayed] = useState(false);

const TomeItem = ({ id, title, hymns, duration, icon: Icon, colorClass, tracks, onPlayToggle, isPlayed }: TomeItemProps) => {
    const [isTrackPlaying, setTrackPlaying] = useState<boolean[]>(() => tracks.map(() => false));
    const [isExpanded, setExpanded] = useState(id === 1);



    const [trackDuration, setTrackDuration] = useState(5);//w sekundach
    const[progression, setProgression] = useState(1);// w sekundach

    const [cookies] = useCookies(['userData']);






    useEffect(() => {
        const playSong = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/playsong', {
                    method: 'POST',
                    body: JSON.stringify({
                        trackId: tracks[activeTrackIdx].id,
                        trackTitle: tracks[activeTrackIdx].title,
                        trackUrl: tracks[activeTrackIdx].url,
                        discordId: cookies?.userData?.discordId
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });


                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }



            } catch (error) {
                console.error('Wystąpił błąd podczas puszczania muzyki:', error);
            }
        };










        let interval: ReturnType<typeof setInterval>;




        const activeTrackIdx = isTrackPlaying.findIndex(playing => playing === true);




        if(tracks[activeTrackIdx] && cookies?.userData.discordId)
        {
            console.log("playing", tracks[activeTrackIdx].title);
            console.log("user dc id", cookies?.userData.discordId)
            playSong();
        }







        setProgression(0)

        if (activeTrackIdx !== -1) {
            interval = setInterval(() => {

                setProgression((prev) => {


                    if (prev >= trackDuration) {

                        setTrackPlaying((prevStates) => {

                            const nextIndex = activeTrackIdx + 1;
                            const newState = new Array(prevStates.length).fill(false);

                            if (nextIndex < prevStates.length) {
                                newState[nextIndex] = true;
                            }

                            return newState;
                        });
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            setProgression(0);
        }










        return () => clearInterval(interval);
    }, [isTrackPlaying, trackDuration]);


    const handlePlay = (idx: number) => {
        const newTracksState = isTrackPlaying.map((_, i) => i === idx ? !isTrackPlaying[idx] : false);
        setTrackPlaying(newTracksState);
        if (!isPlayed) {
            onPlayToggle(id);
        }

        const playSong = async () => {
            try {
                await fetch('http://localhost:8080/api/playsong', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: tracks[idx].id, playing: !isTrackPlaying[idx] }),
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (tracks) playSong();
    };

    useEffect(() => {
        if (!isPlayed) {
            setTrackPlaying(tracks.map(() => false));
        }
    }, [isPlayed, tracks]);

    return (
        <div className={`bg-[#1c1b1b] border-l-4 ${colorClass} overflow-hidden transition-colors hover:bg-[#2a2a2a]`}>
            <div
                className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={() => setExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-[#353534] flex items-center justify-center border-2 border-[#5b403d]`}>
                        <Icon size={36} className={colorClass.replace('border-', 'text-')} />
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#e5e2e1] uppercase">{title}</h2>
                        <p className="font-sans text-xs uppercase tracking-widest text-[#c7c6c6] opacity-60">{hymns} PIOSENEK • {duration} MIN</p>
                    </div>
                </div>
                <ChevronDown size={28} className={`text-[#c7c6c6] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>

            {isExpanded && (
                <div className="bg-[#0e0e0e] border-t-2 border-[#5b403d]/20 p-8 space-y-4">
                    {/* Header tabeli z nową kolumną na Progress */}
                    <div className="grid grid-cols-12 gap-4 font-sans text-[10px] uppercase tracking-widest text-[#ffb59c] mb-4 px-4">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">TYTUŁ</div>
                        <div className="col-span-5 text-center">CZAS TRWANIA</div>
                        <div className="col-span-2 text-right">DŁUGOŚĆ</div>
                        <div className="col-span-1 text-right">AKCJA</div>
                    </div>

                    {tracks.map((track, idx) => (
                        <div key={track.id || idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#ffb59c]/5 border-b border-[#5b403d]/10">
                            <div className="col-span-1 text-[#c7c6c6] opacity-40">{String(idx + 1).padStart(2, '0')}</div>

                            <div className={`col-span-3 ${isTrackPlaying[idx] ? "font-bold text-[#ffb59c]" : "text-[#e5e2e1]"}`}>
                                {track.title}
                            </div>

                            {/* ProgressBar imitujący postęp */}
                            <div className="col-span-5 px-4">
                                <div className="h-1 w-full bg-[#353534] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${isTrackPlaying[idx] ? "bg-[#ffb59c]" : "bg-transparent"}`}
                                        style={{ width: isTrackPlaying[idx] ? `${(progression / trackDuration) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>

                            <div className="col-span-2 text-right text-xs text-[#c7c6c6]">{track.time || "3:00"}</div>

                            <div className="col-span-1 text-right">
                                <button
                                    className="text-[#ffb59c] hover:scale-110 transition-transform"
                                    onClick={(e) => { e.stopPropagation(); handlePlay(idx); }}
                                >
                                    {isTrackPlaying[idx] ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
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
    const [userPlaylistSets, setUserPlaylistSets] = useState<any[]>([]);
    const [activeTomeId, setActiveTomeId] = useState<number | null>(null);
    const [cookies] = useCookies(['userData']);
    const [isLiked, setIsLiked] = useState(false);










    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/get-playlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ playlistId: playlistID }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserPlaylistSets(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (playlistID) fetchData();
    }, [playlistID]);













// coś tu śmierdzi napraw to
    useEffect(() => {
        if (!cookies.userData?.id || !playlistID) return;
        const checkLiked = async () => {
            const resp = await fetch('http://localhost:8080/api/isLiked', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: cookies?.userData.id, playlistId: playlistID }),
            });
            if (resp.ok) setIsLiked(await resp.json());
        };
        checkLiked();
    }, [playlistID, cookies.userData.id]);














    const handleLikeToggle = async () => {
        const prevStatus = isLiked;
        setIsLiked(!prevStatus);
        const endpoint = !prevStatus ? 'like-playlist' : 'unlike-playlist';
        await fetch(`http://localhost:8080/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: cookies?.userData.id, playlistId: playlistID }),
        });
    };













    const onPlayToggle = (playlistId: number) => {
        setActiveTomeId(prev => prev === playlistId ? null : playlistId);
















    };









    const [discordServers,setDiscordServers] = useState<DiscordServer[]>([]);

    const getUserGuilds = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/get/user/guilds', {
                method: 'POST',
                body: JSON.stringify({
                    userId: cookies?.userData?.id
                }),
                headers: { 'Content-Type': 'application/json' }
            });


            if (response.ok)
            {
                const data = await response.json();
                if(data)
                {
                    setDiscordServers(data)
                    console.log(data)

                }
            }
            else{
                throw new Error(`Błąd HTTP: ${response.status}`);
            }



        } catch (error) {
            console.error('Wystąpił błąd podczas puszczania muzyki:', error);
        }
    };

    const [selectedDiscord,setSelectedDiscord] = useState("")
    const [selectedDiscordName,setSelectedDiscordName] = useState("")

    const handleData = (id:string,name:string) =>
    {
        setSelectedDiscord(id);
        setSelectedDiscordName(name);
    }

    if(cookies?.userData.discordId)
    {
        getUserGuilds();
    }

    // dodaj polubianie discordów i wyboru do przesłania do backendu
    return (
        <div className="bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 mt-20 flex flex-col md:flex-row">
            {/* Boczny pasek z serwerami Discord */}
            <aside className="flex flex-row md:flex-col items-center p-4 bg-[#0f0f0f] md:min-h-screen border-b md:border-b-0 md:border-r border-zinc-800 self-start sticky top-20 z-10 w-full md:w-auto overflow-x-auto md:overflow-x-visible">
                {discordServers?.map((discordServer: DiscordServer, index: number) => (
                    <div className="m-2 p-1 shrink-0" key={index}>
                        {

                            (discordServer.serverId ==selectedDiscord) ?(

                                    <img
                                        src={discordServer.serverIconUrl}
                                        className="w-22 h-22 rounded-full border-emerald-500 border-2 hover:scale-115 transition-all duration-150 cursor-pointer"
                                        alt={discordServer.serverName}
                                        onClick={() => handleData(discordServer.serverId,discordServer.serverName)}
                                    />
                            ):
                                (
                                <img
                                    src={discordServer.serverIconUrl}
                                    className="w-20 h-20 rounded-full hover:border-emerald-700 border-2 hover:scale-115 transition-all duration-150 cursor-pointer"
                                    alt={discordServer.serverName}
                                    onClick={() => handleData(discordServer.serverId,discordServer.serverName)}
                                />
                                )
                        }

                    </div>
                ))}
            </aside>

            {/* Główna zawartość strony */}
            <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 w-full">
                <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <h2>{selectedDiscord},{selectedDiscordName}</h2>
                        <h1 className="text-6xl lg:text-8xl font-black mb-4 font-serif">{userPlaylistSets[0]?.title}</h1>
                        <p className="text-xl text-[#c7c6c6]">{userPlaylistSets[0]?.description}</p>
                    </div>
                    <div className="flex lg:justify-end">
                        <button
                            className={`scale-150 p-4 transition-transform hover:scale-175 ${isLiked ? 'text-[#ffb59c]' : 'text-gray-500'}`}
                            onClick={handleLikeToggle}
                        >
                            <LucideStar fill={isLiked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6">
                    {userPlaylistSets[0]?.playlists?.map((playlist: any) => (
                        <TomeItem
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.title}
                            hymns={playlist.songs?.length || 0}
                            duration={"2:00"}
                            icon={Castle}
                            tracks={playlist.songs || []}
                            colorClass="border-[#ffb59c]"
                            onPlayToggle={onPlayToggle}
                            isPlayed={activeTomeId === playlist.id}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}