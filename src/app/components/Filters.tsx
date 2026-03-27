import { SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedExperience: string;
  onExperienceChange: (experience: string) => void;
  onReset: () => void;
}

const subjects = [
  'Wszystkie',
  'Matematyka',
  'Język angielski',
  'Fizyka',
  'Chemia',
  'Informatyka',
  'Język polski',
  'Biologia',
  'Historia',
  'Geografia'
];

const experienceLevels = [
  'Wszystkie',
  'Poniżej 1 roku',
  '1-3 lata',
  '3-5 lat',
  'Powyżej 5 lat'
];

export function Filters({
  selectedSubject,
  onSubjectChange,
  priceRange,
  onPriceRangeChange,
  selectedExperience,
  onExperienceChange,
  onReset
}: FiltersProps) {
  const hasActiveFilters = selectedSubject !== 'Wszystkie' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 300 ||
    selectedExperience !== 'Wszystkie';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Filtry</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Wyczyść
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Przedmiot
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cena za godzinę: {priceRange[0]} - {priceRange[1]} zł
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-indigo-600"
            />
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-900"
                placeholder="Min"
              />
              <input
                type="number"
                min={priceRange[0]}
                max="300"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 300])}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-900"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doświadczenie
          </label>
          <select
            value={selectedExperience}
            onChange={(e) => onExperienceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
