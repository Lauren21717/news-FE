const FormError = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className="text-red-500 text-lg mr-2">⚠️</span>
        <h3 className="text-red-800 font-semibold">
          Please fix the following:
        </h3>
      </div>
      <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormError;
