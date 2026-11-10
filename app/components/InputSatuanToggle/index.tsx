interface InputSatuanToggleProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  satuan: string;
  onSatuanChange: (satuan: string) => void;
  pilihanSatuan: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function InputSatuanToggle({
  id,
  value,
  onChange,
  satuan,
  onSatuanChange,
  pilihanSatuan,
  placeholder,
  min = 0.1,
  max,
  step = 0.1,
  disabled = false,
}: InputSatuanToggleProps) {
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
        placeholder={placeholder ?? `Masukkan nilai dalam ${satuan}`}
        className="no-spinner min-w-0 flex-1 bg-transparent p-2 text-white placeholder:text-gray-500 outline-none disabled:cursor-not-allowed disabled:bg-gray-900 disabled:text-gray-500 disabled:opacity-50"
      />

      <div
        className={`flex items-center gap-1 border-l p-1 ${
          disabled
            ? "border-gray-700 bg-gray-900 opacity-50"
            : "border-gray-600"
        }`}
      >
        {pilihanSatuan.map((item) => (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => onSatuanChange(item)}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold transition-all disabled:cursor-not-allowed ${
              satuan === item
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
