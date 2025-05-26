import { UseFormRegister, FieldValues } from 'react-hook-form';
import tokens from '@/utils/Token';

interface FieldProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error?: { message?: string };
  type?: string;
  readOnly?: boolean;
}

export default function Field<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = 'text',
  readOnly = false,
}: FieldProps<T>) {
  const inputProps = type === 'number' ? { valueAsNumber: true } : {};
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel} htmlFor={String(name)}>
        {label}
      </label>
      <input
        id={String(name)}
        type={type}
        {...register(name as any, inputProps)}
        className={tokens.input}
        readOnly={readOnly}
      />
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}
