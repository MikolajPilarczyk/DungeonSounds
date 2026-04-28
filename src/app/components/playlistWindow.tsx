import {ListMusic} from "lucide-react";


interface PlaylistWindowProps {
    title: string;  // poprawiłem literówkę z "tittle"
    vibe: string;
    tracks: number;
}


export function PlaylistWindow({title,vibe,tracks}:PlaylistWindowProps)
{

    return (
        <div
            className="group bg-[#1c1b1b] p-6 border-b-4 border-[#353534] hover:border-[#ffb59c] transition-all duration-300 relative">
            <div
                className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-[#ffb59c] transition-all duration-500"></div>
            <div
                className="aspect-square bg-[#0e0e0e] mb-4 border-4 border-[#464747] overflow-hidden">
                <ListMusic
                     className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 p-13 hover:p-10"
                    />
            </div>
            <h3 className="font-headline text-xl font-bold text-[#e5e2e1] mb-1 group-hover:text-[#ffb59c] transition-colors">{title}</h3>
            <span
                className="font-label text-[10px] tracking-widest text-[#c7c6c6] uppercase font-bold">{tracks==1?(<div>• {tracks} Playlista</div>):tracks>2&&tracks<5?(<div>• {tracks} Playlisty</div>):(<div>• {tracks} Playlist</div>)} • {vibe}</span>
        </div>
    );
}