import {type ElementType, useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import {
    Castle,
    ChevronDown,
    Play as PlayIcon,
    LucideStar,
    PauseIcon,
    Repeat
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
    selectedDiscord: string;
}

interface DiscordServer {
    serverId: string;
    serverName: string;
    serverIconUrl: string;
}

const TomeItem = ({ id, title, hymns, duration, icon: Icon, colorClass, tracks, onPlayToggle, isPlayed, selectedDiscord }: TomeItemProps) => {
    const [isTrackPlaying, setTrackPlaying] = useState<boolean[]>(() => tracks.map(() => false));
    const [isTrackRepeating, setTrackRepeat] = useState<boolean[]>(() => tracks.map(() => false));
    const [isExpanded, setExpanded] = useState(id === 1);
    const [trackDuration, setTrackDuration] = useState(0);
    const [trackTitle, setTrackTitle] = useState("");
    const [progression, setProgression] = useState(0);
    const [trackDurations, setTrackDurations] = useState<Record<number, number>>({}); // długość per utwór
    const [cookies] = useCookies(['userData']);
    const isPausedRef = useRef<boolean>(false);





    const [isPaused, setIsPaused] = useState(false);

    // Formatuje ms -> "4:03"
    const formatMs = (ms: number): string => {
        if (!ms || ms <= 0) return "--:--";
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const playSong = async (activeTrackIdx: number) => {
            if (!selectedDiscord) return;
            const discordUserId = cookies?.userData?.discordId || cookies?.userData?.userId || cookies?.userData?.id;
            if (!discordUserId) return;

            try {
                const response = await fetch('http://localhost:8080/api/playsong', {
                    method: 'POST',
                    body: JSON.stringify({
                        trackId: tracks[activeTrackIdx].id,
                        trackTitle: tracks[activeTrackIdx].title,
                        trackUrl: tracks[activeTrackIdx].url,
                        guildId: selectedDiscord,
                        userId: String(discordUserId)
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);

                const data = await response.json();
                const ms = parseInt(data.durationMs);

                // Zapisz długość dla konkretnego tracka
                setTrackDurations(prev => ({ ...prev, [activeTrackIdx]: ms }));
                setTrackDuration(ms);
                setTrackTitle(data.title);
                setProgression(0); // reset paska po załadowaniu

            } catch (error) {
                console.error('Błąd podczas puszczania muzyki:', error);
            }
        };

        const activeTrackIdx = isTrackPlaying.findIndex(p => p === true);

        if (activeTrackIdx !== -1 && tracks[activeTrackIdx]) {
            playSong(activeTrackIdx);
        } else {
            setProgression(0);
        }
    }, [isTrackPlaying]); // odpala tylko gdy zmieni się grający utwór

    useEffect(() => {
        const activeTrackIdx = isTrackPlaying.findIndex(p => p === true);
        if (activeTrackIdx === -1 || trackDuration <= 0) return;

        const interval = setInterval(() => {
            if (isPausedRef.current) return;

            setProgression(prev => {
                const next = prev + 1000;
                if (next >= trackDuration) {
                    if (isTrackRepeating[activeTrackIdx]) {
                        setTrackPlaying(prevStates => {
                            const newState = new Array(prevStates.length).fill(false);
                            newState[activeTrackIdx] = true;
                            return newState;
                        });
                    } else {
                        setTrackPlaying(prevStates => {
                            const newState = new Array(prevStates.length).fill(false);
                            const nextIndex = activeTrackIdx + 1;
                            if (nextIndex < prevStates.length) newState[nextIndex] = true;
                            return newState;
                        });
                    }
                    return 0;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [trackDuration, isTrackPlaying]);



    const sendPauseRequest = async (guildId: string, pause: boolean) => {
        if (!guildId) return;
        const endpoint = pause ? 'pause' : 'resume';
        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guildId })
            });
            if (response.ok) {
                setIsPaused(pause);
                isPausedRef.current = pause;
            }
        } catch (error) {
            console.error('Błąd kontroli odtwarzania:', error);
        }
    };

    const handlePlay = (idx: number) => {
        const isCurrentTrackPlaying = isTrackPlaying[idx];

        if (isCurrentTrackPlaying) {
            if (isPaused) {
                // Utwór jest zapauzowany -> wznawiamy
                sendPauseRequest(selectedDiscord, false);
            } else {
                // Utwór gra -> pauzujemy
                sendPauseRequest(selectedDiscord, true);
            }
        } else {
            // Kliknięto inny utwór -> zatrzymaj poprzedni, zacznij nowy
            setIsPaused(false);
            setTrackPlaying(isTrackPlaying.map((_, i) => i === idx));
        }

        if (!isPlayed) onPlayToggle(id);
    };

    const handleRepeat = (idx: number) => {
        setTrackRepeat(prev => prev.map((_, i) => i === idx ? !prev[idx] : false));
    };



    useEffect(() => {
        if (!isPlayed) setTrackPlaying(tracks.map(() => false));
    }, [isPlayed, tracks]);

    const activeTrackIdx = isTrackPlaying.findIndex(p => p === true);

    return (
        <div className={`bg-[#1c1b1b] border-l-4 ${colorClass} overflow-hidden transition-colors hover:bg-[#2a2a2a]`}>
            <div
                className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={() => setExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#353534] flex items-center justify-center border-2 border-[#5b403d]">
                        <Icon size={36} className={colorClass.replace('border-', 'text-')} />
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#e5e2e1] uppercase">{title}</h2>
                        <p className="font-sans text-xs uppercase tracking-widest text-[#c7c6c6] opacity-60">{hymns} PIOSENEK • {duration} MIN</p>
                        {/* Aktualnie grający utwór */}
                        {activeTrackIdx !== -1 && (
                            <p className="text-xs text-[#ffb59c] mt-1 animate-pulse">
                               {trackTitle} — {formatMs(progression)} / {formatMs(trackDuration)}
                            </p>
                        )}
                    </div>
                </div>
                <ChevronDown size={28} className={`text-[#c7c6c6] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>

            {isExpanded && (
                <div className="bg-[#0e0e0e] border-t-2 border-[#5b403d]/20 p-8 space-y-4">
                    <div className="grid grid-cols-12 gap-4 font-sans text-[10px] uppercase tracking-widest text-[#ffb59c] mb-4 px-4">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">TYTUŁ</div>
                        <div className="col-span-5 text-center">PROGRES</div>
                        <div className="col-span-2 text-right">DŁUGOŚĆ</div>
                        <div className="col-span-1 text-right">AKCJA</div>
                    </div>

                    {tracks.map((track, idx) => (
                        <div key={track.id || idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#ffb59c]/5 border-b border-[#5b403d]/10">
                            <div className="col-span-1 text-[#c7c6c6] opacity-40">{String(idx + 1).padStart(2, '0')}</div>
                            <div className={`col-span-3 ${isTrackPlaying[idx] ? "font-bold text-[#ffb59c]" : "text-[#e5e2e1]"}`}>
                                {track.title}
                            </div>
                            <div className="col-span-5 px-4">
                                {isTrackPlaying[idx] ? (
                                    <div className="space-y-1">
                                        <div className="h-1 w-full bg-[#353534] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#ffb59c] transition-all duration-1000"
                                                style={{ width: trackDuration > 0 ? `${(progression / trackDuration) * 100}%` : '0%' }}
                                            />
                                        </div>
                                        {/* Czas aktualny / całkowity */}
                                        <div className="flex justify-between text-[10px] text-[#c7c6c6] opacity-60">
                                            <span>{formatMs(progression)}</span>
                                            <span>{formatMs(trackDuration)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-1 w-full bg-[#353534] rounded-full" />
                                )}
                            </div>
                            {/* Długość z API lub pusta */}
                            <div className="col-span-2 text-right text-xs text-[#c7c6c6]">
                                {trackDurations[idx] ? formatMs(trackDurations[idx]) : track.time || ""}
                            </div>
                            <div className="col-span-1 text-right">
                                <button
                                    className="text-[#ffb59c] hover:scale-110 transition-transform"
                                    onClick={(e) => { e.stopPropagation(); handlePlay(idx); }}
                                >
                                    {isTrackPlaying[idx]
                                        ? (isPaused ? <PlayIcon size={18} /> : <PauseIcon size={18} />)
                                        : <PlayIcon size={18} />
                                    }
                                </button>
                                <button
                                    className="text-[#ffb59c] hover:scale-110 transition-transform ml-1"
                                    onClick={(e) => { e.stopPropagation(); handleRepeat(idx); }}
                                >
                                    <Repeat size={18} className={isTrackRepeating[idx] ? "opacity-100" : "opacity-30"} />
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
    const [discordServers, setDiscordServers] = useState<DiscordServer[]>([]);

    const [selectedDiscord, setSelectedDiscord] = useState("");
    const [selectedDiscordName, setSelectedDiscordName] = useState("");

    const handleData = (id: string, name: string) => {
        setSelectedDiscord(id);
        setSelectedDiscordName(name);
    };

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
    }, [playlistID, cookies.userData?.id]);

    useEffect(() => {
        const getUserGuilds = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/get/user/guilds', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: cookies?.userData?.id
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setDiscordServers(data);
                        if (data.length > 0 && !selectedDiscord) {
                            setSelectedDiscord(data[0].serverId);
                            setSelectedDiscordName(data[0].serverName);
                        }
                    }
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania gildii:', error);
            }
        };

        if (cookies?.userData?.discordId || cookies?.userData?.id) {
            getUserGuilds();
        }
    }, [cookies?.userData, selectedDiscord]);

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

    return (
        <div className="bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 mt-20 flex flex-col md:flex-row">
            <aside className="flex flex-row md:flex-col items-center p-4 bg-[#0f0f0f] md:min-h-screen border-b md:border-b-0 md:border-r border-zinc-800 self-start sticky top-20 z-10 w-full md:w-auto overflow-x-auto md:overflow-x-visible">
                {discordServers?.map((discordServer: DiscordServer, index: number) => (
                    <div className="m-2 p-1 shrink-0" key={index}>
                        {discordServer.serverId === selectedDiscord ? (
                            <img
                                src={discordServer.serverIconUrl}
                                className="w-22 h-22 rounded-full border-emerald-500 border-2 hover:scale-115 transition-all duration-150 cursor-pointer"
                                alt={discordServer.serverName}
                                onClick={() => handleData(discordServer.serverId, discordServer.serverName)}
                            />
                        ) : (
                            <img
                                src={discordServer.serverIconUrl}
                                className="w-20 h-20 rounded-full hover:border-emerald-700 border-2 hover:scale-115 transition-all duration-150 cursor-pointer"
                                alt={discordServer.serverName}
                                onClick={() => handleData(discordServer.serverId, discordServer.serverName)}
                            />
                        )}
                    </div>
                ))}
            </aside>

            <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 w-full">
                <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <h2 className="text-emerald-500 text-sm font-mono mb-2">
                            Pamiętaj aby wybrać serwer na którym aktualnie przesiadujesz
                        </h2>
                        <h2 className="text-emerald-500 text-sm font-mono mb-2">
                            {selectedDiscord ? `Wybrany serwer: ${selectedDiscordName}` : "⚠️ Wybierz serwer Discord z listy po lewej"}
                        </h2>
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
                            duration={""}
                            icon={Castle}
                            tracks={playlist.songs || []}
                            colorClass="border-[#ffb59c]"
                            onPlayToggle={onPlayToggle}
                            isPlayed={activeTomeId === playlist.id}
                            selectedDiscord={selectedDiscord}
                        />
                    ))}


                    <div className={`bg-[#1c1b1b] border-l-4  overflow-hidden transition-colors hover:bg-[#2a2a2a]`}>

                        <div className="flex items-center gap-6">

                            <div>
                                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#e5e2e1] uppercase">Dodaj Piosenke</h2>
                                <p className="font-sans text-xs uppercase tracking-widest text-[#c7c6c6] opacity-60"></p>

                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}