import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export function DiscordAuthBack() {







    const [, setCookie] = useCookies(['userData']);
    const [isLoading, setIsLoading] = useState(true);







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
                    setIsLoading(false);
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
        <div className="min-h-screen w-full bg-[#121212] flex items-center justify-center p-4">
            <div className="bg-[#1e1e1e] w-full max-w-md p-8 border-2 border-[#2e2e2e] text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-3 min-h-[150px]">
                        {/* Animowany kręciołek (spinner) */}
                        <div className="w-8 h-8 border-2 border-[#ffb59c] border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-[#8b8b8b] text-sm font-sans tracking-wide">Wczytywanie lochów...</div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[150px]">
                        <a
                            href="/"
                            className="text-[#ffb59c] hover:text-[#ff9d7d] font-serif text-lg tracking-wide underline underline-offset-4 transition-colors duration-200"
                        >
                            Przejdź do strony głównej
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}