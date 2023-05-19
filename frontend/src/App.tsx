import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} className="border" />

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
