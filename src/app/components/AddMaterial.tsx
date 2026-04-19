import {NewspaperIcon,Bold,Italic,List,Upload,File,ChevronDown,X} from "lucide-react";
import {useState} from "react";




export function AddMaterial() {
    interface FormData {
        title: string;
        description: string;
        files?: File;
        degree:string;
        category: string;
        materialDegree: string;
        cost: number;
        tags: string[];
    }
    const [formData,setFormData] = useState<FormData>({
        title: "",
        description: "",
        degree:"",
        category: "",
        materialDegree: "",
        cost: 0,
        tags: []
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
    const handleFinalSubmit = (e:any) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            tags: tags
        };
        alert(dataToSend.cost);
        setFormData(dataToSend);
    }




    const categories = [
        // NAUKI ŚCISŁE
        { id: 1, name: "Matematyka", group: "Nauki Ścisłe" },
        { id: 2, name: "Fizyka", group: "Nauki Ścisłe" },
        { id: 3, name: "Chemia", group: "Nauki Ścisłe" },
        { id: 4, name: "Astronomia", group: "Nauki Ścisłe" },
        { id: 5, name: "Logika", group: "Nauki Ścisłe" },

        // NAUKI PRZYRODNICZE
        { id: 6, name: "Biologia", group: "Przyrodnicze" },
        { id: 7, name: "Geografia", group: "Przyrodnicze" },
        { id: 8, name: "Ekologia", group: "Przyrodnicze" },
        { id: 9, name: "Anatomia", group: "Przyrodnicze" },

        // NAUKI HUMANISTYCZNE
        { id: 10, name: "Język Polski", group: "Humanistyczne" },
        { id: 11, name: "Historia", group: "Humanistyczne" },
        { id: 12, name: "Filozofia", group: "Humanistyczne" },
        { id: 13, name: "Wiedza o Kulturze", group: "Humanistyczne" },
        { id: 14, name: "Historia Sztuki", group: "Humanistyczne" },

        // JĘZYKI OBCE
        { id: 15, name: "Angielski", group: "Języki Obce" },
        { id: 16, name: "Niemiecki", group: "Języki Obce" },
        { id: 17, name: "Hiszpański", group: "Języki Obce" },
        { id: 18, name: "Francuski", group: "Języki Obce" },

        // INFORMATYKA I TECHNOLOGIA
        { id: 19, name: "Programowanie", group: "Informatyka" },
        { id: 20, name: "Bazy Danych", group: "Informatyka" },
        { id: 21, name: "Cyberbezpieczeństwo", group: "Informatyka" },
        { id: 22, name: "Robotyka", group: "Informatyka" },

        // SPOŁECZNE I EKONOMICZNE
        { id: 23, name: "WOS", group: "Społeczne" },
        { id: 24, name: "Psychologia", group: "Społeczne" },
        { id: 25, name: "Socjologia", group: "Społeczne" },
        { id: 26, name: "Przedsiębiorczość", group: "Ekonomia" },
        { id: 27, name: "Marketing", group: "Ekonomia" }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData(prev =>({...prev, [name]: value}));
    }

    return (<div>

        <div className="flex pt-16 bg-gradient-to-b from-gray-50 to-gray-100">

            <main className="flex-1 lg:ml-64 p-8 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 flex justify-between items-end">
                        <div>

                            <h1 className="text-4xl text-on-surface">Stwórz swój materiał naukowy</h1>
                            <p className="text-on-surface-variant mt-2 text-lg">Opublikuj swoją wiedze aby dzielić się nią z innymi!</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-8 py-2.5 text-sm font-bold bg-gradient-to-br from-yellow-700 to-yellow-900 text-white rounded-xl shadow-sm active:scale-95 transition-all po" onClick={handleFinalSubmit}>Opublikuj swój materiał!</button>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        <div className="lg:col-span-2 space-y-8  rounded-lg">
                            <section className="bg-white bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-white/40">
                                <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                                    <div className="text-yellow-900">
                                        <NewspaperIcon />
                                    </div>
                                   Głowne Informacje
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Tytuł</label>
                                        <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20
                                        focus:bg-white transition-all" name="title" value={formData.title}  onChange={handleChange} placeholder="n.p Pochodna funkcji złożonej zadania maturalne"  type="text"/>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1 py-15 ">Opis</label>
                                        <div className=" bg-surface-container-low rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
                                            <div className="flex items-center gap-1 p-2 border-b border-surface-container-high bg-surface-container-high/30">
                                                <button className="p-1.5 hover:bg-white rounded"><span className="material-symbols-outlined text-sm" data-icon="format_bold"><Bold className={"size-2/3"}></Bold></span></button>
                                                <button className="p-1.5 hover:bg-white rounded"><span className="material-symbols-outlined text-sm" data-icon="format_italic"><Italic className={"size-2/3"}></Italic></span></button>
                                                <button className="p-1.5 hover:bg-white rounded"><span className="material-symbols-outlined text-sm" data-icon="format_list_bulleted"><List className={"size-2/3"}></List></span></button>
                                                <div className="w-px h-4 bg-outline-variant mx-1"></div>
                                            </div>
                                            <textarea className="w-full bg-transparent border-none px-4 py-3 text-on-surface placeholder:text-outline focus:ring-0" name="description" value={formData.description} onChange={handleChange} placeholder="Opisz najważniesjze rzeczy jakie będzie zawierać twój materiał"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-white bg-surface-container-lowest p-8  rounded-lg shadow-sm border border-white/40">
                                <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary" data-icon="cloud_upload"><Upload></Upload></span>
                                    Pliki do załączenia
                                </h2>
                                <div className="relative group">
                                    <div className="border-2 border-dashed border-outline-variant/30 bg-surface-container-low rounded-[1.5rem] p-12 text-center hover:border-primary/50 hover:bg-primary-fixed/20 transition-all group-hover:scale-[1.01]">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <span className="material-symbols-outlined text-3xl text-primary" data-icon="upload_file"><File></File></span>
                                        </div>
                                        <h4 className="text-lg font-bold text-on-surface">Przesuń &amp; Upuść Materiał</h4>
                                        <p className="text-on-surface-variant text-sm mt-1 mb-6">Obsługiwane formaty PDF, DOCX, i Zdjęcia (Max 50MB)</p>
                                        <button className="px-6 py-2.5 bg-white text-primary border border-primary/20 rounded-xl font-bold text-sm hover:bg-primary-fixed transition-colors">Przeglądaj swoje urządzenie</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="space-y-8 bg-white rounded-lg">
                            <section className="bg-surface-container-low p-6 rounded-[2rem]">
                                <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Klasyfikacja</h3>
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Category</label>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-white border-none rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 transition-all"

                                                    name="category" onChange={handleChange}>
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
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Poziom Materiału</label>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-white border-none rounded-xl px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" name="degree" value={formData.degree} onChange={handleChange}>
                                                <option>Studia</option>
                                                <option>Liceum/Technikum</option>
                                                <option>Podstawówka</option>
                                                <option>Poziom Własny</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="expand_more"><ChevronDown></ChevronDown></span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Tagi</label>
                                        <div className="bg-white rounded-xl p-2 flex flex-wrap gap-2 min-h-[46px] items-center">

                                            <form onSubmit={handleSubmit}>
                                                <input className="border-1 rounded-xs focus:ring-0 text-sm flex-1 min-w-[80px] bg-gray-100 border-1 border-gray-200 p-1" placeholder="" type="text" name="tagInput"/>

                                                <button type="submit" className={"text-gray-500  p-1 px-3 border-1 border-gray-300 bg-gray-100 hover:bg-gray-400 my-2 text-xs" }>Dodaj tag</button>
                                            </form>
                                            {tags.map((tag) => (
                                                <button className={"bg-yellow-400 text-gray-50 rounded-lg p-1 px-2  hover:bg-red-700 transition-all flex text-sm italic"} onClick={()=>deleteTag(tag)}><X size={18}></X>{tag}</button>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-surface-container-low p-6 rounded-[2rem]">
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-sm font-semibold text-on-surface">Załącz Monetyzacje</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input className="sr-only peer" type="checkbox" value=""/>
                                            <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Koszt (PLN)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">$</span>
                                            <input className="w-full bg-white border-none rounded-xl pl-8 pr-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" min={0} placeholder="0.00" name="cost" value={formData.cost} onChange={handleChange} type="number"/>

                                        </div>
                                        <p className="text-[10px] text-tertiary font-medium ml-1">Do sprzedaży pobierana jest prowizja atelier w wysokości 5%.</p>
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