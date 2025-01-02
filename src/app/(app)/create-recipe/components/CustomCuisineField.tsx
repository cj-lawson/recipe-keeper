// components/CustomCuisineField.tsx
export function CustomCuisineField({
  show,
  value,
  onChange,
}: {
  show: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (!show) return null;

  return (
    <div className="mt-4">
      <label
        htmlFor="customCuisine"
        className="block text-sm font-medium text-gray-700"
      >
        Custom Cuisine
      </label>
      <input
        type="text"
        id="customCuisine"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}
