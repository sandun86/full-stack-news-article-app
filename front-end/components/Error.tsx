const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="error-container">
      <p>{message}</p>
    </div>
  );
};

export default Error;