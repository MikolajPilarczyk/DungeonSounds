import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { UserAboutSection } from "./components/userAboutSection.tsx";

export function UserProfile() {
    const {username} = useParams();

    const UsernameToSend= {
    usernameToFind: username
}
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
    const [userProfile, setUserProfile] = useState({
        name: username || "Ładowanie...",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Ładowanie opisu...",
        totalLikes: 0,
        totalMaterials: 0,
        premiumMaterials: 0
    });

    useEffect(() => {
        const sendUsername = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/find/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(UsernameToSend),
                });
                if(response.ok)
                {
                    const result = await response.json();
                    setNumberOfUsers(result);
                }
            }
            catch (error) {
                console.error("Błąd połączenia:", error);
            }


            const dataToSend = { userNameAndSurname: username };
            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Serwer odpowiedział:", result);
                    setUserProfile(prevState => ({
                        ...prevState,
                        bio: result.bio || "Brak bio",
                        totalLikes: result.likes ,
                        totalMaterials: result.materials ,
                    }));
                }
            } catch (error) {
                console.error("Błąd połączenia:", error);
            }
        };

        if (username) {
            sendUsername();
        }
    }, [username]);
    if (numberOfUsers) {
        return (
            <div className={"relative max-w-2xl mx-auto m-5"}>
                <UserAboutSection {...userProfile} />
            </div>
        );
    }
    else
        return ("Nie ma takiego urzytkownika")

}