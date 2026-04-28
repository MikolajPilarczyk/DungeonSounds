import {NewspaperIcon,ChevronDown,X,BookAudio,AudioLines,Trash} from "lucide-react";
import {useState} from "react";

import {MainButton} from "./components.tsx";
import {useCookies} from "react-cookie";


export function AddMaterial() {
   const [cookies] = useCookies(["userData"]);

    interface Song
    {
        title: string,
        url: string,
    }


    interface Playlist
    {
        title: string,
        songs: Song[]
    }

    const[playlists, setPlaylists] = useState<Playlist[]>([]);
    const [tempTitle, setTempTitle] = useState<string>("");

    interface FormData {
        username: string;
        title: string;
        category: string;
        tags: string[];
        playlists: Playlist[]
    }
    const [formData,setFormData] = useState<FormData>({
        username: cookies.userData.userNameAndSurname,
        title: "",
        category: "Karczma i Miasto",
        tags: [],
        playlists: []
    });


    const [tags,setTags] = useState<string[]>([]);
    const deleteTag = (tagToRemove:any) =>
    {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        const form = e.currentTarget;
        const input = form.elements.namedItem("tagInput") as HTMLInputElement;
        const value = input.value.trim();

        if (value) {
            setTags([value, ...tags]);
            form.reset();
        }

    }
    const handleFinalSubmit = async (e:any) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            tags: tags,
            playlists: playlists
        };
        setFormData(dataToSend);
        console.log(formData.username);

        try {
            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            console.log(JSON.stringify(dataToSend));
            if(response.ok){
                alert("Dodano pomyślnie")

            }

        } catch (error) {
            console.error("Błąd połączenia:", error);
        }


    }
    const addPlaylist = (e:any) => {
        e.preventDefault();
        const tempPlaylist: Playlist= {
            title: tempTitle,
            songs: []
        }
        setPlaylists([tempPlaylist,...playlists])
        setTempTitle("");
    }


    const deletePlaylist = (titleToRemove:any) =>
    {
        setPlaylists(playlists.filter(playlists => playlists.title !== titleToRemove));
    }

    const deleteSong = (titleToRemove:any) =>
    {
        setPlaylists(prevPlaylists =>
            prevPlaylists.map(playlist => ({
                ...playlist,
                songs: playlist.songs.filter(song => song.title !== titleToRemove)
            }))
        );
    }

    const checkNull = (e) =>
    {
       //dodaj walidacje
    }

    const [tempSongTitle,setTempSongTitle] = useState<string>("");
    const [tempSongUrl,setTempSongUrl] = useState<string>("");

    const AddSong = (playlistTitle:string) => {
        setPlaylists(prevList => {
            return prevList.map(item => {
                if (item.title == playlistTitle) {
                        const newSong: Song = {
                            title: tempSongTitle,
                            url: tempSongUrl
                        }

                        const updatedItem:Playlist = {
                            title: item.title,
                            songs: [...item.songs,newSong]

                        }
                        return updatedItem;
                }
                else
                {
                    return item;
                }

            });
        });
    }

    const categories = [
        // EKSPLORACJA I MIASTO
        { id: 1, name: "Karczma i Miasto", group: "Eksploracja" },
        { id: 2, name: "Trakt i Podróż", group: "Eksploracja" },
        { id: 3, name: "Magiczny Las", group: "Eksploracja" },
        { id: 4, name: "Mroczne Lochy", group: "Eksploracja" },
        { id: 5, name: "Świątynia / Katedra", group: "Eksploracja" },

        // WALKA (COMBAT)
        { id: 6, name: "Potyczka", group: "Walka" },
        { id: 7, name: "Epickie Starcie", group: "Walka" },
        { id: 8, name: "Ucieczka i Pościg", group: "Walka" },
        { id: 9, name: "Walka z Bossem", group: "Walka" },
        { id: 10, name: "Oblężenie", group: "Walka" },

        // KLIMAT I NAPIĘCIE (ATMOSPHERE)
        { id: 11, name: "Tajemnica / Śledztwo", group: "Klimat" },
        { id: 12, name: "Groza i Horror", group: "Klimat" },
        { id: 13, name: "Smutek / Melancholia", group: "Klimat" },
        { id: 14, name: "Napięcie (Stealth)", group: "Klimat" },
        { id: 15, name: "Odpoczynek (Campfire)", group: "Klimat" },

        // SCI-FI / CYBERPUNK (Jeśli gracie w inne systemy)
        { id: 16, name: "Neonowe Miasto", group: "Sci-Fi" },
        { id: 17, name: "Wnętrze Statku", group: "Sci-Fi" },
        { id: 18, name: "Hacking / Matrix", group: "Sci-Fi" },
        { id: 19, name: "Pustkowia (Wasteland)", group: "Sci-Fi" },

        // SPECJALNE / EFEKTY
        { id: 20, name: "Odgłosy Otoczenia (Ambient)", group: "Inne" },
        { id: 21, name: "Magiczne Rytuały", group: "Inne" },
        { id: 22, name: "Pogoda (Deszcz/Burza)", group: "Inne" }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData(prev =>({...prev, [name]: value}));
    }

    return (<div>

        <div className="flex pt-25 bg-gradient-to-b from-[#131313] to-[#0e0e0e] min-w-screen max-w-full min-h-screen max-h-full ">

            <main className="flex-1 lg:ml-64 p-8 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl text-[#ffb59c] ">Bardowskie Słuchowskio</h1>
                            <p className="text-on-surface-variant mt-2 text-lg text-[#c7c6c6]">Stwórz playliste która ułatwi innym trase na szlaku</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleFinalSubmit}>
                                <MainButton text={"Opublikuj swoją pieśń"} ></MainButton>
                            </button>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        <div className="lg:col-span-2 space-y-8  rounded-lg">
                            <section className="bg-[#1c1b1b] text-[#c7c6c6] p-8 ">
                                <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                                    <div className="text-[#ffb59c]">
                                        <NewspaperIcon />
                                    </div>
                                   Głowne Informacje
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Tytuł</label>
                                        <input className="w-full bg-surface-container-low border-none  px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20
                                        bg-[#353534] transition-all " name="title" value={formData.title}   onChange={handleChange} placeholder="n.p Eksploracja szlaków grórskich"  type="text"/>
                                    </div>

                                    {/*Dodawanie utworów*/}
                                    <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                                        <div className="text-[#ffb59c]">
                                            <BookAudio />
                                        </div>
                                        Dodaj playliste
                                    </h2>
                                    <div>
                                        <form>
                                            <input className="w-full bg-surface-container-low border-none  px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20
                                        bg-[#353534] transition-all " name="playlistTitle" value={tempTitle}  onChange={(e)=> setTempTitle(e.target.value) }
                                                   placeholder="Nadaj nazwe swojej playliście"  type="text"/>
                                            <button className={"text-[#c7c6c6]  p-1 px-3 border-1  bg-[#353534] hover:bg-gray-400 my-2 text-xs"}  onClick={addPlaylist}>Dodaj Playliste</button>
                                        </form>

                                    </div>
                                    {
                                        playlists.map((playlist,index) => (
                                            <div>

                                                <div key={index} className={"flex justify-between items-end"}>
                                                    <h2 className={"flex p-3"}>
                                                      {playlist.title}</h2>
                                                    <button  className={"p-3 hover:text-red-300 transition-all duration-75"} onClick={()=>deletePlaylist(playlist.title)}>
                                                        <Trash></Trash>


                                                    </button>
                                                </div>

                                                <input className="w-full bg-surface-container-low border-none  px-2 py-2.5  text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20
                                                     bg-[#353534] transition-all " name="playlistTitle"  placeholder="Dodaj tytuł wyświetlany piosenki"
                                                       onChange={(e)=>setTempSongTitle(e.target.value)}
                                                       type="text"/>

                                                <input className="w-full bg-surface-container-low border-none  px-2 py-2.5 text-on-surface mt-2 placeholder:text-outline focus:ring-2 focus:ring-primary/20
                                                     bg-[#353534] transition-all " name="playlistTitle"  placeholder="Dodaj url piosenki (soundcloud)"
                                                       onChange={(e)=>setTempSongUrl(e.target.value)} type="text"/>

                                                <button className={"text-[#c7c6c6]  p-1 px-3 border-1  bg-[#353534] hover:bg-gray-400 my-2 text-xs"} onClick={()=>AddSong(playlist.title)}>Dodaj utwór</button>

                                                {playlist.songs.map((song,index) => (
                                                    <div key={index}>
                                                        <div className={"p-3 bg-[#303030] opacity-85 rounded-full flex flex-row mt-2 justify-between items-end"}>
                                                            <div className="flex ">
                                                                <AudioLines></AudioLines>
                                                                <p className={"px-3"}>{song.title}</p>
                                                            </div>
                                                            <button className={"pr-3 hover:text-red-300 transition-all duration-75"} onClick={()=> deleteSong(song.title)}>
                                                                <Trash></Trash>

                                                            </button>
                                                        </div>
                                                    </div>

                                                ))}
                                            </div>


                                        ))
                                    }
                                </div>
                            </section>

                        </div>
                        <div className="space-y-8 bg-[#1c1b1b] text-[#c7c6c6]">
                            <section className="bg-surface-container-low p-6 rounded-[2rem]">
                                <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Klasyfikacja</h3>
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Kategoria</label>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-[#353534] border-none  px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 transition-all"

                                                    name="category"  onChange={handleChange}>
                                                {[...new Set(categories.map(c => c.group))].map(groupName => (
                                                    <optgroup key={groupName} label={groupName} >
                                                        {categories
                                                            .filter(c => c.group === groupName)
                                                            .map(cat => (
                                                                <option key={cat.id} value={cat.name}>
                                                                    {cat.name}
                                                                </option>
                                                            ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="expand_more"><ChevronDown></ChevronDown></span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Tagi</label>
                                        <div className="bg-[#1c1b1b]   p-2 flex flex-wrap gap-2 min-h-[46px] items-center">

                                            <form onSubmit={handleSubmit}>
                                                <input className="border-1 rounded-xs focus:ring-0 text-sm flex-1 min-w-[80px] bg-[#353534] border-1  p-1" placeholder="" type="text" name="tagInput"/>

                                                <button type="submit" className={"text-[#c7c6c6]  p-1 px-3 border-1  bg-[#353534] hover:bg-gray-400 my-2 text-xs" }>Dodaj tag</button>
                                            </form>
                                            {tags.map((tag) => (
                                                <button className={"bg-[#a93500] text-gray-50 rounded-lg p-1 px-2  hover:bg-[#93000b] transition-all flex text-sm italic"} onClick={()=>deleteTag(tag)}><X size={18}></X>{tag}</button>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="p-1 bg-gradient-to-br from-primary-fixed to-tertiary-fixed rounded-[2rem]">
                            </div>
                        </div>
                    </div>
                    <div className="h-24"></div>
                </div>
            </main>
        </div>

    </div>)
}