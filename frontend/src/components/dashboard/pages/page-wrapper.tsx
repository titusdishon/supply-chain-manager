import Sidebar from "../sidebar";

interface IProps {
  title: string;
  children: React.ReactNode;
  createNewOnclick: () => void;
}
const PageWrapper = ({ title, children, createNewOnclick }: IProps) => {
  return (
    <div className="flex w-full  h-screen overflow-auto">
      <Sidebar />
      <div className="p-1 w-full overflow-auto">
        <div className=" w-full">
          <h1 className="text-2xl font-semibold float-left">{title}</h1>
          <button
            type="submit"
            onClick={createNewOnclick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 float-right "
          >
            Create New
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
