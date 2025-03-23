const ButtonComponent = ({ text, onClick, type = "button", className = "" }) => {
    return (
        <button 
            className={`bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-xl py-3 px-6 mt-4 
                        shadow-md hover:shadow-lg transition-all hover:from-gray-700 hover:to-gray-900 
                        active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer ${className}`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;
