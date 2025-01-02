interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  conditionallyRender?: JSX.Element | null;
}

export function SelectField({
  label,
  id,
  value,
  options,
  onChange,
  conditionallyRender = null,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {conditionallyRender}
    </div>
  );
}
