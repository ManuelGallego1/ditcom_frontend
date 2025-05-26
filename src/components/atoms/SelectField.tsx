import { UseFormRegister, FieldValues } from 'react-hook-form';
import tokens from '@/src/utils/Token';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  register?: UseFormRegister<T>;
  error?: { message?: string };
  options: (string | Option)[];
  valueAsNumber?: boolean;
  readOnly?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectField<T extends FieldValues>({
  name,
  label,
  register,
  error,
  options,
  value,
  valueAsNumber = false,
  readOnly = false,
  onChange
}: SelectFieldProps<T>) {
  const id = String(name);

  const registerProps = register
    ? register(name as any, valueAsNumber ? { valueAsNumber: true } : {})
    : {};

  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        {...registerProps}
        className={tokens.input}
        name={id}
        value={value}
        onChange={onChange}
        disabled={readOnly}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt, i) =>
          typeof opt === 'string' ? (
            <option key={i} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}
