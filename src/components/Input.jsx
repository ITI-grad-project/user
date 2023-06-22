export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  register,
  errorMessage,
  disabled,
  editbtn,
  onChange,
}) {
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text text-base">{label}</span>
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  ${
          errorMessage ? "invalid" : "focus:border-primary focus:border-2"
        }`}
        {...register}
        {...(editbtn === 0 && (disabled = { disabled }))}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
