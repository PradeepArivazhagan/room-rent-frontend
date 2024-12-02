import Cookies from "js-cookie";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { OrbitProgress } from "react-loading-indicators";

const RentalDashboard = () => {
  const currentRoomNumber = useSelector((state) => state.user.roomNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [months, setMonths] = useState([]);
  const [rents, setRents] = useState([]);
  const [ebBills, setEbBills] = useState([]);
  const [totals, setTotals] = useState([]);
  const [payment, setPayment] = useState([]);

  const params = useParams();
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/";
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchedRentDetails = async () => {
      await Axios.get(`http://localhost:4000/rentalDashboard/${params.id}`)
        .then((response) => {
          const rentDetails = response.data.response;
          setMonths(rentDetails.months);
          setRents(rentDetails.rents);
          setEbBills(rentDetails.electricityCharges);
          setTotals(rentDetails.totals);
          setPayment(rentDetails.paymentStatuses);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    fetchedRentDetails();
  }, [params.id]);

  return (
    <div className="font-[Gabarito] h-screen bg-slate-100">
      <div className="bg-blue-950 fixed w-full px-8 py-3 md:py-4 md:px-20 lg:px-40 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1 text-base md:text-lg text-white">
          <h1>Year: </h1>
          <h1>2024</h1>
        </div>
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-white hidden md:block">{`Room Number: ${params.id}`}</h1>
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
        {isLoading ? (
          <OrbitProgress color="#00228f" size="medium" text="" textColor="" />
        ) : (
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
                {months[0]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[0]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[0]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[0]}
              </td>
              <td className="border-b border-slate-50">
                {payment[0] === "Paid" && (
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
                )}
                {payment[0] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[0] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[1]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[1]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[1]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[1]}
              </td>
              <td className="border-b border-slate-50">
                {payment[1] === "Paid" && (
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
                )}
                {payment[1] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[1] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[2]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[2]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[2]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[2]}
              </td>
              <td className="border-b border-slate-50">
                {payment[2] === "Paid" && (
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
                )}
                {payment[2] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[2] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[3]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[3]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[3]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[3]}
              </td>
              <td className="border-b border-slate-50">
                {payment[3] === "Paid" && (
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
                )}
                {payment[3] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[3] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[4]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[4]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[4]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[4]}
              </td>
              <td className="border-b border-slate-50">
                {payment[4] === "Paid" && (
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
                )}
                {payment[4] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[4] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[5]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[5]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[5]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[5]}
              </td>
              <td className="border-b border-slate-50">
                {payment[5] === "Paid" && (
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
                )}
                {payment[5] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[5] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[6]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[6]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[6]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[6]}
              </td>
              <td className="border-b border-slate-50">
                {payment[6] === "Paid" && (
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
                )}
                {payment[6] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[6] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[7]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[7]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[7]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[7]}
              </td>
              <td className="border-b border-slate-50">
                {payment[7] === "Paid" && (
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
                )}
                {payment[7] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[7] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[8]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[8]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[8]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[8]}
              </td>
              <td className="border-b border-slate-50">
                {payment[8] === "Paid" && (
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
                )}
                {payment[8] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[8] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[9]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[9]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[9]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[9]}
              </td>
              <td className="border-b border-slate-50">
                {payment[9] === "Paid" && (
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
                )}
                {payment[9] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[9] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[10]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[10]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[10]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[10]}
              </td>
              <td className="border-b border-slate-50">
                {payment[10] === "Paid" && (
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
                )}
                {payment[10] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[10] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
            <tr className="text-white text-center">
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {months[11]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {rents[11]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {ebBills[11]}
              </td>
              <td className="py-2 border-b border-r border-slate-50 text-sm md:text-base">
                {totals[11]}
              </td>
              <td className="border-b border-slate-50">
                {payment[11] === "Paid" && (
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
                )}
                {payment[11] === "Pending" && (
                  <div className="text-red-500 rounded-sm py-1 px-4 flex flex-row items-center justify-center gap-1 text-sm md:text-base">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>Pending</span>
                  </div>
                )}
                {payment[11] === "Pay Now" && (
                  <button className="text-white bg-yellow-500 w-fit rounded-sm py-1 px-4 text-sm md:text-base">
                   Pay Now
                  </button>
                )}
              </td>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
};

export default RentalDashboard;
