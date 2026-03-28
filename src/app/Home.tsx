import {Header} from "./Header.tsx";
import {SearchBar} from "./SearchBar.tsx";
import {useState} from "react";

export function Home()
{
    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div>
        <Header/>
        <SearchBar value={searchQuery} onChange={setSearchQuery}/>
            <p>{searchQuery}</p>
        </div>

    )
}