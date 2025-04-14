const MyInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full border rounded p-1 border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 transition-all duration-150"
      {...props}
    />
  );
};

export default MyInput;
