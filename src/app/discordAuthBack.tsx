import {useEffect} from "react";
import {useCookies} from "react-cookie";

export function DiscordAuthBack() {







    const [cookies, setCookie] = useCookies(['userData']);






    useEffect(() => {
        const handleDiscordAuth = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            console.log("Pobrany kod z URL:", code);

            if (!code) return;

            try {
                const response = await fetch('http://localhost:8080/api/auth/discord', {
                    method: 'POST',
                    body: JSON.stringify({ code: code }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Błąd serwera: ${response.status}`);
                }

                const data = await response.json();

                console.log('Zalogowano pomyślnie:', data);

                if(data)
                {
                    setCookie('userData', data, {
                        path: '/',
                        maxAge: 3600 // 1 godzina
                    });
                }

            } catch (error) {
                console.error('Wystąpił błąd podczas logowania:');
            }
        };

        // 5. Wywołujemy stworzoną funkcję
        handleDiscordAuth();

    }, []);

    return (
        <div>{}</div>
    )
}