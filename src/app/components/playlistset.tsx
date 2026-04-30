import {useEffect, useState} from 'react';
import {
    Shield,
    Flame,
    Castle,
    Lock,
    ChevronDown,
    Play,

} from 'lucide-react';
import {useParams} from "react-router-dom";














// --- Sub-komponent: Pojedyncza Playlista (Tome) ---
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
                    <div className="grid grid-cols-12 gap-4 font-sans text-[10px] uppercase tracking-widest text-[#5b403d] mb-4 px-4">
                        <div className="col-span-1">#</div>
                        <div className="col-span-8">INCANTATION</div>
                        <div className="col-span-2 text-right">DURATION</div>
                        <div className="col-span-1 text-right">ACTION</div>
                    </div>
                    {tracks.map((track, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#ffb59c]/5 transition-colors border-b border-[#5b403d]/10">
                            <div className="col-span-1 font-sans text-[#c7c6c6] opacity-40">{String(idx + 1).padStart(2, '0')}</div>
                            <div className="col-span-8 font-sans font-bold text-[#e5e2e1]">{track.name}</div>
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
    const tomes = [
        {
            id: 1,
            title: "Echoes of the Deep Mine",
            hymns: 12,
            duration: 48,
            icon: Shield,
            colorClass: "border-[#ffb59c]",
            isLocked: false,
            tracks: [
                { name: "HEART OF THE MOUNTAIN", time: "04:32" },
                { name: "FORGE-FIRE RITUAL", time: "05:15" },
                { name: "SHATTERED ANVIL HYMN", time: "03:48" }
            ]
        },
        {
            id: 2,
            title: "Dragon's Hoard",
            hymns: 24,
            duration: 122,
            icon: Flame,
            colorClass: "border-[#ffb4ab]",
            isLocked: false,
            tracks: []
        },
        {
            id: 3,
            title: "The King Under the Hill",
            hymns: 8,
            duration: 34,
            icon: Castle,
            colorClass: "border-[#ffb59c]",
            isLocked: true,
            tracks: []
        }
    ];

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



    return (
        <div className="bg-[#131313] text-[#e5e2e1] min-h-screen pb-32 font-sans selection:bg-[#ffb59c]/30 selection:text-[#ffb59c] mt-20">

            <main className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20">
                <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter mb-4 font-serif">{userPlaylistSets[0]?.title}</h1>
                        <p className="text-xl text-[#c7c6c6] max-w-md">Ancient echoes bound in digital obsidian. Select your vault and awaken the forge.</p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className="bg-[#1c1b1b] border-2 border-[#ab8985] px-8 py-3 text-sm font-bold tracking-widest uppercase text-[#ffb59c] hover:bg-[#ffb59c]/10 transition-all duration-300">
                            Sort by Rune
                        </button>
                        <button className="bg-gradient-to-tr from-[#a93500] to-[#ffb59c] px-8 py-3 text-sm font-bold tracking-widest uppercase text-[#5c1900] hover:opacity-90 transition-all duration-300">
                            New Vault
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6 mb-12">

                    {userPlaylistSets[0]?.playlists?.map((playlist) => (
                        <TomeItem
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.title}
                            hymns={playlistLenght}
                            duration={0}
                            icon={Shield}
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