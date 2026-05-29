import { useCookies } from "react-cookie";
import { Disc, Shield, Swords } from "lucide-react";

export function MainLoginPage() {
    const [cookie] = useCookies(["userData"]);

    if (!cookie?.userData?.isLogged)
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 text-[#e0e0e0]">
                <div className="w-full max-w-md mx-auto">
                    {/* Panel Logowania */}
                    <div className="bg-[#1f1f1f] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-2 border-[#2e2e2e] p-8 md:p-10 flex flex-col justify-center space-y-8">

                        <div className="space-y-2 text-center">
                            <div className="flex items-center justify-center gap-2 text-[#ffb59c]">
                                <Swords className="w-5 h-5 animate-pulse" />
                                <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#8b8b8b]">Brama Wyborna</span>
                            </div>
                            <h2 className="text-3xl text-[#ffb59c] font-serif tracking-wide">Dołącz do Drużyny</h2>
                            <p className="text-[#8b8b8b] text-sm font-sans">Zaloguj się, aby zarządzać dźwiękami swoich lochów.</p>
                        </div>

                        {/* Przycisk Discorda */}
                        <div>
                            <a
                                href="https://discord.com/oauth2/authorize?client_id=1497965024046747879&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=guilds+identify+connections"
                                className="flex items-center justify-center gap-3 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-sans font-medium py-4 px-6 tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(88,101,242,0.3)] hover:shadow-[0_4px_25px_rgba(88,101,242,0.5)] group"
                            >
                                <Disc className="w-6 h-6 transition-transform duration-500 group-hover:rotate-[360deg]" />
                                <span>Wejdź przez Discord</span>
                            </a>

                        </div>


                    </div>
                </div>
            </div>
        );
    else return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 text-[#e0e0e0]">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-[#1a1a1a] shadow-2xl border-2 border-[#2e2e2e] p-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-[#252525] text-[#ffb59c] border border-[#333] flex items-center justify-center mx-auto animate-bounce">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif text-[#ffb59c]">Wartownik Cię rozpoznaje</h2>
                    <p className="text-[#8b8b8b] text-sm font-sans">
                        Jesteś już zalogowany. Twoja drużyna czeka w panelu głównym.
                    </p>
                </div>
            </div>
        </div>
    );
}