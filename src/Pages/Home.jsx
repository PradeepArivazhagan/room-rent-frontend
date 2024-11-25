import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-screen font-[Gabarito] flex flex-col items-center justify-center bg-blue-950">
      <h1 className="text-white text-5xl font-medium">Room Rents Check</h1>
      <button
        onClick={onClickLogin}
        className="py-2 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-sm mt-6"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
