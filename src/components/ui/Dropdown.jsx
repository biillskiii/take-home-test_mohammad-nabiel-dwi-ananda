import { useState, useRef, useEffect } from "react";

const Dropdown = ({
  label = "Choose an option",
  items = [],
  onSelect,
  leftIcon,
  rightIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);
  //
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-32 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-32  flex items-center justify-between rounded-md px-3 py-2 bg-transparent text-white hover:bg-white/10 transition"
      >
        <div className="flex items-center gap-2">
          {leftIcon && <span>{leftIcon}</span>}
          <span>{selected || label}</span>
        </div>
        {rightIcon && <span>{rightIcon}</span>}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 italic">
              (Kosong)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
