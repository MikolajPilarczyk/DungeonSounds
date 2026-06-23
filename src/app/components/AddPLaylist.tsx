import { BookAudio, AudioLines, Trash } from "lucide-react";
import { useState } from "react";

export function AddPLaylist(playlistSetId:any) {
    interface Song {
        title: string;
        url: string;
    }

    interface PlaylistData {
        title: string;
        songs: Song[];
    }

    const [playlist, setPlaylist] = useState<PlaylistData>({
        title: "",
        songs: []
    });

    const [urlError, setUrlError] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist(prev => ({ ...prev, title: e.target.value }));
    };

    const isValidSoundCloudUrl = (url: string) => {
        const soundCloudRegex = /^(https?:\/\/)?(www\.)?(m\.)?(soundcloud\.com|on\.soundcloud\.com)\/[\w\-]+(\/[\w\-]+)*\/?(\?.*)?$/;
        return soundCloudRegex.test(url);
    };

    const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (urlError) setUrlError(null);
    };

    const addSong = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const titleInput = form.elements.namedItem("songTitle") as HTMLInputElement;
        const urlInput = form.elements.namedItem("songUrl") as HTMLInputElement;

        const title = titleInput?.value.trim();
        const url = urlInput?.value.trim();

        if (!title || !url) {
            alert("Wpisz zarówno nazwę utworu, jak i link!");
            return;
        }

        if (!isValidSoundCloudUrl(url)) {
            setUrlError("To nie jest prawidłowy link do SoundCloud!");
            return;
        }

        setPlaylist(prev => ({
            ...prev,
            songs: [...prev.songs, { title, url }]
        }));

        setUrlError(null);
        form.reset();
    };

    const deleteSong = (indexToRemove: number) => {
        setPlaylist(prev => ({
            ...prev,
            songs: prev.songs.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Wysyłanie gotowej playlisty na serwer
    const handleFinalSubmit = async () => {
        if (!playlist.title.trim()) {
            alert("Musisz podać nazwę playlisty!");
            return;
        }

        if (playlist.songs.length === 0) {
            alert("Dodaj przynajmniej jedną piosenkę!");
            return;
        }

        console.log("Wysyłam playlistę:", playlist,"id:", playlistSetId);

        try {
            const response = await fetch('http://localhost:8080/api/upload/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlist,playlistSetId),
            });

            if (response.ok) {
                alert("Playlista została pomyślnie dodana!");
                setPlaylist({ title: "", songs: [] }); // Reset po sukcesie
            } else {
                alert("Wystąpił błąd podczas zapisywania playlisty.");
            }
        } catch (error) {
            console.error("Błąd połączenia z API:", error);
        }
    };

    return (
        <div className="w-full max-w-2xl pl-6  p-2 rounded-lg  self-start">




            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Nazwa Playlisty</h2>
                    <input
                        className="w-full bg-[#353534] border-none px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#ffb59c]/50 transition-all rounded-sm"
                        value={playlist.title}
                        onChange={handleTitleChange}
                        placeholder="np. Moja epicka playlista RPG"
                        type="text"
                    />
                </div>

                <div className=" p-4 rounded-md border border-gray-800 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#ffb59c]">
                        <BookAudio size={18} /> Dodaj utwór
                    </h2>

                    <form onSubmit={addSong} className="space-y-3">
                        <div>
                            <input
                                className="w-full bg-[#353534] border-none px-3 py-2 text-white placeholder:text-gray-500 text-sm rounded-sm"
                                name="songTitle"
                                placeholder="Nazwa utworu / piosenki"
                                type="text"
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="w-full bg-[#353534] border-none px-3 py-2 text-white placeholder:text-gray-500 text-sm rounded-sm"
                                name="songUrl"
                                placeholder="Link do utworu SoundCloud"
                                type="text"
                                onChange={handleUrlInputChange}
                                required
                            />
                            {urlError && (
                                <p className="text-red-400 text-xs mt-1.5 font-medium pl-1">
                                    {urlError}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto text-[#c7c6c6] p-2 px-4 border border-gray-600 bg-[#353534] hover:bg-gray-600 transition-all text-xs font-semibold rounded-sm"
                        >
                            + Wgraj na listę
                        </button>
                    </form>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Utwory na liście ({playlist.songs.length})
                    </h3>

                    {playlist.songs.length === 0 ? (
                        <p className="text-sm text-gray-600 italic py-2">Lista jest jeszcze pusta. Dodaj utwór powyżej.</p>
                    ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                            {playlist.songs.map((song, index) => (
                                <div key={index} className="p-3 bg-[#303030] rounded-md flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3 truncate">
                                        <AudioLines size={18} className="text-[#ffb59c] shrink-0" />
                                        <div className="truncate">
                                            <p className="font-semibold text-sm text-white truncate">{song.title}</p>
                                            <p className="text-xs text-gray-400 truncate">{song.url}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="p-1 hover:text-red-400 transition-all shrink-0"
                                        onClick={() => deleteSong(index)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-8 flex justify-between items-center border-b border-gray-800 pb-4">
                    <button onClick={handleFinalSubmit} className="hover:text-[#ffb59c] ">
                        Zapisz
                    </button>
                </div>
            </div>

        </div>
    );
}