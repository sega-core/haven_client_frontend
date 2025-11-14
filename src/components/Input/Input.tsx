export const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative w-80">
      <input
        type="text"
        id="comment"
        placeholder=""
        className="
      peer w-full rounded-xl border border-gray-300 px-3 pt-5 pb-2
      text-gray-900 placeholder-transparent
      focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none
      transition-all duration-300 ease-in-out
    "
      />
      <label
        htmlFor="comment"
        className="
      absolute left-3 top-4 text-gray-500 text-base
      transition-all duration-300 ease-in-out origin-[0]
      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
      peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-sky-600
      peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:text-gray-700
    "
      >
        {placeholder}
      </label>
    </div>
  );
};
