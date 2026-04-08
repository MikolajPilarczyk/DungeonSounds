import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function UserProfile() {
    const { username } = useParams();

    useEffect(() => {
        const sendUsername = async () => {
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
                }
            } catch (error) {
                console.error("Błąd połączenia:", error);
            }
        };

        if (username) {
            sendUsername();
        }
    }, [username]);

    return (
        <>
            <h1 className={"relative max-w-2xl mx-auto m-5"}>Profil użytkownika: {username}</h1>
        </>
    );
}