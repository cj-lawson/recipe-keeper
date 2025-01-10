import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface DirectionsFieldProps {
  directions: { instruction: string }[];
  setDirections: React.Dispatch<
    React.SetStateAction<{ instruction: string }[]>
  >;
}

export function DirectionsField({
  directions,
  setDirections,
}: DirectionsFieldProps) {
  const handleDirectionChange = (index: number, value: string) => {
    const updatedDirections = [...directions];
    updatedDirections[index].instruction = value;
    setDirections(updatedDirections);
  };

  const addNewStep = () => {
    setDirections([...directions, { instruction: '' }]);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Directions
      </label>
      {directions.map((direction, index) => (
        <div key={index} className="flex gap-4 mt-2">
          <textarea
            placeholder={`Step ${index + 1}`}
            value={direction.instruction}
            onChange={(e) => handleDirectionChange(index, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addNewStep}
        className="mt-4 text-emerald-700 hover:text-emerald-500 flex items-center font-semibold gap-1"
      >
        <PlusCircleIcon className="w-8" />
        Add Step
      </button>
    </div>
  );
}
