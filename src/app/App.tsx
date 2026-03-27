import { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import { TutorCard } from './components/TutorCard';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';

interface Tutor {
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
// tutaj dane z bazy
const mockTutors: Tutor[] = [
  {
    id: 1,
    name: 'Anna Kowalska',
    subject: 'Matematyka',
    rating: 4.9,
    reviewCount: 127,
    price: 80,
    experience: 7,
    location: 'Warszawa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    description: 'Specjalizuję się w przygotowaniu do matury i egzaminów ósmoklasisty. Indywidualne podejście do każdego ucznia.',
    lessons: 543
  },
  {
    id: 2,
    name: 'Michał Nowak',
    subject: 'Język angielski',
    rating: 5.0,
    reviewCount: 89,
    price: 90,
    experience: 5,
    location: 'Kraków',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    description: 'Native speaker z USA. Pomagam w rozmowach biznesowych i przygotowaniu do certyfikatów.',
    lessons: 412
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    subject: 'Fizyka',
    rating: 4.8,
    reviewCount: 156,
    price: 75,
    experience: 10,
    location: 'Wrocław',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    description: 'Doktor fizyki z pasją do nauczania. Pomogę zrozumieć najtrudniejsze zagadnienia.',
    lessons: 678
  },
  {
    id: 4,
    name: 'Piotr Zieliński',
    subject: 'Informatyka',
    rating: 4.9,
    reviewCount: 203,
    price: 100,
    experience: 8,
    location: 'Gdańsk',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    description: 'Programista full-stack. Uczę programowania od podstaw: Python, JavaScript, React.',
    lessons: 789
  },
  {
    id: 5,
    name: 'Magdalena Lewandowska',
    subject: 'Chemia',
    rating: 4.7,
    reviewCount: 92,
    price: 70,
    experience: 4,
    location: 'Poznań',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    description: 'Chemik analityk. Sprawdzam się w przygotowaniu do matury i olimpiad chemicznych.',
    lessons: 321
  },
  {
    id: 6,
    name: 'Tomasz Kamiński',
    subject: 'Język polski',
    rating: 4.8,
    reviewCount: 134,
    price: 65,
    experience: 6,
    location: 'Łódź',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    description: 'Polonista z pasją. Pomogę w interpretacji lektur i przygotowaniu do matury pisemnej.',
    lessons: 456
  },
  {
    id: 7,
    name: 'Joanna Dąbrowska',
    subject: 'Biologia',
    rating: 4.9,
    reviewCount: 178,
    price: 75,
    experience: 9,
    location: 'Katowice',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    description: 'Biolog molekularny. Łączę teorię z praktyką, dzięki czemu nauka jest ciekawsza.',
    lessons: 612
  },
  {
    id: 8,
    name: 'Adam Mazur',
    subject: 'Historia',
    rating: 4.6,
    reviewCount: 67,
    price: 60,
    experience: 3,
    location: 'Szczecin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    description: 'Pasjonat historii. Sprawiam, że historia staje się żywą opowieścią, nie suchymi faktami.',
    lessons: 234
  },
  {
    id: 9,
    name: 'Ewa Piotrkowska',
    subject: 'Geografia',
    rating: 4.8,
    reviewCount: 101,
    price: 65,
    experience: 5,
    location: 'Lublin',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    description: 'Geograf i podróżniczka. Uczę geografii w oparciu o prawdziwe doświadczenia z podróży.',
    lessons: 378
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Wszystkie');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedExperience, setSelectedExperience] = useState('Wszystkie');

  const filteredTutors = useMemo(() => {
    return mockTutors.filter(tutor => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === 'Wszystkie' || tutor.subject === selectedSubject;

      const matchesPrice = tutor.price >= priceRange[0] && tutor.price <= priceRange[1];

      let matchesExperience = true;
      if (selectedExperience === 'Poniżej 1 roku') matchesExperience = tutor.experience < 1;
      else if (selectedExperience === '1-3 lata') matchesExperience = tutor.experience >= 1 && tutor.experience <= 3;
      else if (selectedExperience === '3-5 lat') matchesExperience = tutor.experience >= 3 && tutor.experience <= 5;
      else if (selectedExperience === 'Powyżej 5 lat') matchesExperience = tutor.experience > 5;

      return matchesSearch && matchesSubject && matchesPrice && matchesExperience;
    });
  }, [searchQuery, selectedSubject, priceRange, selectedExperience]);

  const resetFilters = () => {
    setSelectedSubject('Wszystkie');
    setPriceRange([0, 300]);
    setSelectedExperience('Wszystkie');
  };

  const sortedTutors = useMemo(() => {
    return [...filteredTutors].sort((a, b) => {
      const scoreA = a.rating * a.reviewCount;
      const scoreB = b.rating * b.reviewCount;
      return scoreB - scoreA;
    });
  }, [filteredTutors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Learnly
                </h1>
                <p className="text-sm text-gray-500">Znajdź idealnego korepetytora</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200">
              Zaloguj się
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedExperience={selectedExperience}
              onExperienceChange={setSelectedExperience}
              onReset={resetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery ? 'Wyniki wyszukiwania' : 'Najpopularniejsi korepetytorzy'}
              </h2>
              <p className="text-gray-600">
                Znaleziono {sortedTutors.length} {sortedTutors.length === 1 ? 'korepetytor' : 'korepetytorów'}
              </p>
            </div>

            {sortedTutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedTutors.map((tutor) => (
                  <TutorCard key={tutor.id} {...tutor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <div className="text-gray-400 mb-4">
                  <GraduationCap className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nie znaleziono korepetytorów
                </h3>
                <p className="text-gray-600 mb-4">
                  Spróbuj zmienić kryteria wyszukiwania lub filtry
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    resetFilters();
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Wyczyść wszystkie filtry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 Learnly. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">O nas</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Regulamin</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Prywatność</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
