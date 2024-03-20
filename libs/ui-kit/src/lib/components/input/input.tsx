import { ChangeEvent, ReactNode, forwardRef, useCallback } from 'react';
import clsx from 'clsx';

type InputType = 'text' | 'email' | 'number';
type NumberOrString<T> = T extends 'number' ? number : string;
export interface AdditionalInputProps<T extends InputType> {
  inputClassName?: string;
  label?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value: NumberOrString<T> | any,
  ) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  disabled?: boolean;
  value?: string | number;
  id?: string;
  type?: T;
  className?: string;
  placeholder?: string;
  hint?: ReactNode;
  name?: string;
  autoFocus?: boolean;
  required?: boolean;
}

export const Input = forwardRef(
  <T extends InputType>(
    {
      className,
      inputClassName,
      label,
      type,
      id,
      placeholder,
      error,
      leftSlot,
      rightSlot,
      value,
      onChange,
      onBlur,
      onFocus,
      disabled,
      hint,
      name,
      required,
      autoFocus,
      ...rest
    }: AdditionalInputProps<T>,
    ref: any,
  ) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(
            event,
            type === 'number'
              ? (parseFloat(event.target.value) as T extends 'number'
                  ? number
                  : string)
              : (event.target.value as NumberOrString<T>),
          );
        }
      },
      [onChange, type],
    );

    return (
      <div
        className={clsx(
          'flex w-full flex-col gap-y-[4px]',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'text-[16px] font-[500] leading-[24px]',
              disabled && 'cursor-not-allowed',
            )}
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            'flex w-full flex-row items-center gap-x-[6px] rounded-[10px] bg-white/[8%] px-[14px] py-[8px] font-[600] transition-colors duration-150 focus-within:bg-white/[24%]',
            error && '!bg-[#360C0E]',
          )}
        >
          <input
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            id={id}
            name={name}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            ref={ref}
            autoFocus={autoFocus}
            className={clsx(
              'peer order-2 w-full flex-1 placeholder-white/50 outline-none transition-colors duration-150',
              error ? 'bg-[#360C0E] text-[#FF5454]' : 'bg-transparent',
              disabled && 'cursor-not-allowed',
              inputClassName,
            )}
            {...rest}
          />
          {leftSlot && <div className="order-1">{leftSlot}</div>}
          {rightSlot && <div className="order-3">{rightSlot}</div>}
        </div>
        {error && (
          <div className="text-[14px] leading-[20px] text-[#FF5454]">
            {error}
          </div>
        )}
        {hint && hint}
      </div>
    );
  },
);
