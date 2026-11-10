interface InputSatuanProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  satuan?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function InputSatuan({
  id,
  value,
  onChange,
  placeholder = "Masukkan nilai",
  satuan = "%",
  min = 0,
  max,
  step = 0.1,
  disabled = false,
}: InputSatuanProps) {
  return (
    <div className="flex w-full overflow-hidden rounded-lg border border-gray-600 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-900 disabled:text-gray-500 disabled:opacity-50 no-spinner min-w-0 flex-1 bg-transparent p-2 text-white placeholder:text-gray-500 outline-none"
      />

      <span
        className={`flex items-center border-l px-4 font-medium ${
          disabled
            ? "border-gray-700 bg-gray-900 text-gray-500 opacity-50"
            : "border-gray-600 text-gray-400"
        }`}
      >
        {satuan}
      </span>
    </div>
  );
}
