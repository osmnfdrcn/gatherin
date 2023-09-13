type SelectProps = {
  label: string;
  value?: string;
  options: { id: string; name: string; slug?: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isError?: string;
  errorMessage: string;
  name: string;
};
const Select = ({ value, options, onChange, name }: SelectProps) => {
  return (
    <div className=" w-full flex flex-col items-start   ">
      <select
        name={name}
        value={value}
        defaultValue={30}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
        className="block w-full px-4 py-4  text-gray-700 bg-white  rounded-lg border-none focus:border-slate-500  focus:outline-none focus:ring text-xl font-bold"
      >
        <option className="text-xs">Duration</option>
        {options.map((option) => (
          <option key={option.id} className="text-xs" value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
