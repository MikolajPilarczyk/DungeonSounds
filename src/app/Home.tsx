import {SearchBar} from "./SearchBar.tsx";
import {useState} from "react";

export function Home()
{
    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div>
        <SearchBar value={searchQuery} onChange={setSearchQuery}/>
            <p>{searchQuery}</p>
        </div>

    )
}