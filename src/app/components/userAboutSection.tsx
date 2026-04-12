import { Heart, BookOpen, Crown } from 'lucide-react';

interface UserProfileProps {
    name: string | undefined;
    avatar: string;
    bio: string;
    totalLikes: number;
    totalMaterials: number;
    premiumMaterials: number;
}

export function UserAboutSection({ name, avatar, bio, totalLikes, totalMaterials, premiumMaterials }: UserProfileProps) {
    return (
        <div className="border-b border-border pb-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                    <h1 className="mb-3">{name}</h1>
                    <p className="text-muted-foreground mb-8 max-w-2xl">{bio}</p>

                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground">{totalLikes.toLocaleString()}</span>
                            <span className="text-muted-foreground">polubień profilu</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground">{totalMaterials}</span>
                            <span className="text-muted-foreground">materiałów</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Crown className="w-5 h-5 text-amber-500" />
                            <span className="text-foreground">{premiumMaterials}</span>
                            <span className="text-muted-foreground">premium</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
