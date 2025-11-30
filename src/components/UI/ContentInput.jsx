const ContentInput = ({ value, onChange, label, max, placeholder, type, required, maxLength, rows = 4 }) => {
  const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const isTextarea = type === "textarea";
  const remainingChars = maxLength ? maxLength - (value?.length || 0) : null;
  const isNearLimit = remainingChars !== null && remainingChars <= 50;

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={inputId} className="mb-1 font-medium">{label}</label>
      {isTextarea ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          rows={rows}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px] max-h-[400px] overflow-y-auto"
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          max={max}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
      {isTextarea && maxLength && (
        <div className={`text-xs mt-1 text-right ${isNearLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {value?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
};
export default ContentInput;
