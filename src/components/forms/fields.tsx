import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

const inputClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 focus:outline-none aria-[invalid=true]:border-red-400'

function FieldWrapper({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: string
  hint?: string
}

export function TextField({ id, label, registration, error, hint, ...props }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        className={inputClass}
        {...props}
        {...registration}
      />
    </FieldWrapper>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  registration: UseFormRegisterReturn
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string
  hint?: string
}

export function SelectField({
  id,
  label,
  registration,
  options,
  placeholder,
  error,
  hint,
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={inputClass}
        defaultValue=""
        {...props}
        {...registration}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: string
  hint?: string
}

export function TextareaField({
  id,
  label,
  registration,
  error,
  hint,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        className={inputClass}
        rows={4}
        {...props}
        {...registration}
      />
    </FieldWrapper>
  )
}

export function CheckboxField({
  id,
  label,
  registration,
  error,
}: {
  id: string
  label: ReactNode
  registration: UseFormRegisterReturn
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-navy-900">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-navy-900"
          {...registration}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
