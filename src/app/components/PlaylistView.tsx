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


//const [isPlayed, setIsPlayed] = useState(false);

const TomeItem = ({ id, title, hymns, duration, icon: Icon, colorClass, tracks, onPlayToggle, isPlayed }: TomeItemProps) => {
    const [isTrackPlaying, setTrackPlaying] = useState<boolean[]>(() => tracks.map(() => false));
    const [isExpanded, setExpanded] = useState(id === 1);

    const [trackDuration, setTrackDuration] = useState(5);//w sekundach
    const[progression, setProgression] = useState(1);// w sekundach

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const activeTrackIdx = isTrackPlaying.findIndex(playing => playing === true);

        if (activeTrackIdx !== -1) {
            interval = setInterval(() => {
                setProgression((prev) => {
                    if (prev >= trackDuration) return 0;
                    return prev + 1;
                });
            }, 1000);
        } else {
            setProgression(0);
            //const newTracksState = isTrackPlaying.map((_, i) => i === idx ? !isTrackPlaying[idx] : false);






        }

        return () => clearInterval(interval);
    }, [isTrackPlaying]);



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














    useEffect(() => {
        if (!cookies.userData?.userNameAndSurname || !playlistID) return;
        const checkLiked = async () => {
            const resp = await fetch('http://localhost:8080/api/isLiked', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cookies.userData.userNameAndSurname, playlistId: playlistID }),
            });
            if (resp.ok) setIsLiked(await resp.json());
        };
        checkLiked();
    }, [playlistID, cookies.userData]);














    const handleLikeToggle = async () => {
        const prevStatus = isLiked;
        setIsLiked(!prevStatus);
        const endpoint = !prevStatus ? 'like-playlist' : 'unlike-playlist';
        await fetch(`http://localhost:8080/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: cookies.userData.userNameAndSurname, playlistId: playlistID }),
        });
    };













    const onPlayToggle = (playlistId: number) => {
        setActiveTomeId(prev => prev === playlistId ? null : playlistId);
















    };














    return (
        <div className="bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 mt-20">
            <main className="max-w-7xl mx-auto px-6 pt-12">
                <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
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