import IMask from 'imask';
import { useRef, useEffect } from 'react';

export default function InputTelefone({ value, onChange }) {
  const inputRef = useRef();

  useEffect(() => {
    const mask = IMask(inputRef.current, {
      mask: '(00) 00000-0000',
    });

    mask.on('accept', () => {
      onChange(mask.value);
    });

    return () => mask.destroy();
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      defaultValue={value}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
      required
    />
  );
}