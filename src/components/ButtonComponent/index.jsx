const ButtonComponent = ({ 
    text, 
    onClick, 
    type = "button", 
    className = "",
    disabled = false
  }) => {
    return (
      <button 
        className={`
          relative
          bg-gradient-to-r from-[#008080] to-[#006666] 
          text-white font-medium 
          rounded-lg py-3 px-6
          shadow-md 
          transition-all duration-200
          hover:from-[#009090] hover:to-[#007777]
          active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-[#008080]/50
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="relative z-10 flex items-center justify-center">
          {text}
        </span>
        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-lg transition-opacity duration-200"></span>
      </button>
    );
  };
  
  export default ButtonComponent;