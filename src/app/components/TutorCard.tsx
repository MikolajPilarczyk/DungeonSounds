import { Star, BookOpen, Clock, MapPin } from 'lucide-react';

interface TutorCardProps {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviewCount: number;
  price: number;
  experience: number;
  location: string;
  avatar: string;
  description: string;
  lessons: number;
}

export function TutorCard({
  name,
  subject,
  rating,
  reviewCount,
  price,
  experience,
  location,
  avatar,
  description,
  lessons
}: TutorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
                <p className="text-indigo-600 font-medium text-sm">{subject}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{price} zł</div>
                <div className="text-sm text-gray-500">za godzinę</div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({reviewCount} opinii)</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{experience} lat doświadczenia</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lessons} lekcji</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors duration-200">
          Zobacz profil
        </button>
      </div>
    </div>
  );
}
