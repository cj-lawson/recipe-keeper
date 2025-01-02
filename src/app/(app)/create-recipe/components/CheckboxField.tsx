interface CheckboxFieldProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  id,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label
        htmlFor={id}
        className="ml-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
}
