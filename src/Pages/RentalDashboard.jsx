import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const RentalDashboard = () => {
  const currentRoomNumber = useSelector((state) => state.user.roomNumber);
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  };

  return (
    <div className="font-[Gabarito] h-screen bg-slate-50">
      <div className="bg-blue-950 fixed w-full px-8 py-3 md:py-4 md:px-20 lg:px-40 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1 text-base md:text-lg">
          <label htmlFor="year" className="text-white">
            Year:{" "}
          </label>
          <select
            name="year"
            id="year"
            className="bg-transparent text-white focus:outline-none"
          >
            <option value={2024}>2024</option>
            <option value={2024}>2023</option>
            <option value={2024}>2022</option>
            <option value={2024}>2021</option>
            <option value={2024}>2020</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-white hidden md:block">{`Room Number: ${currentRoomNumber}`}</h1>
          <div className="block md:hidden my-auto bg-black text-white font-semibold py-1 px-2 rounded-full">
            {currentRoomNumber}
          </div>
          <button
            onClick={handleLogout}
            className="py-1 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-sm text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="pt-14 md:pt-16 h-full flex flex-col items-center justify-center">
        <table className="bg-blue-950 rounded-md shadow-md w-[95%] md:w-[80%] lg:w-[60%]">
          <tr className="text-orange-600">
            <th className="py-3 border-b border-r border-slate-50 font-medium w-[20%] text-sm md:text-base">
              Month
            </th>
            <th className="py-3 border-b border-r border-slate-50 font-medium w-[20%] text-sm md:text-base">
              Rent
            </th>
            <th className="py-3 border-b border-r border-slate-50 font-medium w-[20%] text-sm md:text-base">
              EB Bill
            </th>
            <th className="py-3 border-b border-r border-slate-50 font-medium w-[20%] text-sm md:text-base">
              Total
            </th>
            <th className="py-3 border-b border-slate-50 font-medium text-sm md:text-base">
              Payment
            </th>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              January
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <div className="text-green-400 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>Completed</span>
              </div>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              February
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-yellow-600 hover:bg-yellow-500 rounded-sm py-1 px-4 text-sm md:text-base">
                Pending
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              March
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4  text-sm md:text-base">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              April
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              May
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              June
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              July
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              August
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              September
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              October
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              November
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base ">
                Pay Now
              </button>
            </td>
          </tr>
          <tr className="text-white text-center">
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              December
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1500
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              350
            </td>
            <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
              1850
            </td>
            <td className="border-b border-slate-50">
              <button className="bg-orange-600 hover:bg-orange-500 rounded-sm py-1 px-4 text-sm md:text-base">
                Pay Now
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RentalDashboard;
