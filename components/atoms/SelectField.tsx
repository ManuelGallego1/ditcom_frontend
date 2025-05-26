import { UseFormRegister, FieldValues } from 'react-hook-form';
import tokens from '@/utils/Token';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  register: UseFormRegister<T>;
  error?: { message?: string };
  options: (string | Option)[];
  valueAsNumber?: boolean;
  readOnly?: boolean;
}

export default function SelectField<T extends FieldValues>({
  name,
  label,
  register,
  error,
  options,
  valueAsNumber = false,
  readOnly = false
}: SelectFieldProps<T>) {
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel} htmlFor={String(name)}>
        {label}
      </label>
      <select
        id={String(name)}
        {...register(name as any, valueAsNumber ? { valueAsNumber: true } : {})}
        className={tokens.input}
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
