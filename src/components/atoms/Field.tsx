import { UseFormRegister, FieldValues } from 'react-hook-form';
import tokens from '@/src/utils/Token';

interface FieldProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  register?: UseFormRegister<T>;
  error?: { message?: string };
  type?: string;
  value?: string | number;
  readOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

export default function Field<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = 'text',
  value,
  readOnly = false,
  onChange,
  required = false,
}: FieldProps<T>) {
  const id = String(name);

  const registerProps = register
    ? register(name as any, type === 'number' ? { valueAsNumber: true } : {})
    : {};

  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        className={tokens.input}
        {...registerProps}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
      />
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}
