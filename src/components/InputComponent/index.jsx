import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const InputComponent = ({
  typeInput, 
  placeholderText, 
  value, 
  onChange, 
  required, 
  inputMode, 
  maxLength, 
  showEyeIcon = true,
  name 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = typeInput === 'password';

  return (
    <div className="relative w-full">
      <input 
        className="bg-[#ECF0F1] text-gray-500 w-full h-10 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none placeholder:opacity-50 pr-10 pl-4" 
        type={isPassword && showPassword ? 'text' : typeInput} 
        placeholder={placeholderText}
        value={value || ''}
        onChange={(e) => onChange && onChange(e)}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
      />
      {isPassword && showEyeIcon && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}

InputComponent.propTypes = {
  typeInput: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  maxLength: PropTypes.number,
  showEyeIcon: PropTypes.bool,
  name: PropTypes.string
};

export default InputComponent;