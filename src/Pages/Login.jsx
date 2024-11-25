import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { roomNumberChange } from "../redux/reducer/reducer.js";

const Login = () => {
  const roomNumber = useSelector((state) => state.user.roomNumber);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectRoomNumber = (e) => {
    dispatch(roomNumberChange(e.target.value));
  };

  const onTypeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (roomNumber === "") {
      setErrorMessage("Please Select room number");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }
    if (mobileNumber === "") {
      setErrorMessage("Please enter mobile number");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }
    if (mobileNumber.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }

    if (mobileNumber.length === 10 && roomNumber !== "") {
      setIsError(false);
      setErrorMessage("");
      setIsLoading(true);
      await Axios.post("https://room-rent-backend.onrender.com/login", {
        roomNumber,
        mobileNumber,
      })
        .then((response) => {
          setIsLoading(false);
          const jwtToken = response.data.jwtToken;
          Cookies.set("jwt_token", jwtToken, { expires: 30 });
          if (response.status === 200) {
            navigate("/rentalDashboard");
          } else {
            setIsError(true);
            setErrorMessage(response.data.message);
            setTimeout(() => {
              setIsError(false);
              setErrorMessage("");
            }, 3000);
          }
        })
        .catch((error) => {
          setIsError(true);
          setErrorMessage(error.response.statusText);
          setTimeout(() => {
            setIsError(false);
            setErrorMessage("");
          }, 3000);
        });
    }
  };

  return (
    <div className="font-[Gabarito] h-screen bg-slate-50 flex flex-row items-center justify-center">
      <div className="bg-blue-950 w-80 rounded-md py-6 px-10 shadow-md">
        <form onSubmit={onSubmitLogin} className="flex flex-col items-start">
          <label htmlFor="roomNumber" className="text-white text-lg">
            Room Number
          </label>
          <select
            onChange={onSelectRoomNumber}
            value={roomNumber}
            name="roomNumber"
            required={true}
            id="roomNumber"
            className="w-full py-2 px-4 rounded-sm mt-1 focus:outline-none"
          >
            <option>Select Room Number</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
          </select>
          <label htmlFor="mobileNumber" className="text-white text-lg mt-4">
            Mobile Number
          </label>
          <input
            onChange={onTypeMobileNumber}
            value={mobileNumber}
            required={true}
            type="text"
            id="mobileNumber"
            placeholder="Enter Mobile Number"
            maxLength={10}
            className="w-full py-2 px-4 rounded-sm mt-1 focus:outline-none"
          />
          {isError && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="py-2 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-sm mt-6 mx-auto"
          >
            {isLoading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass="px-3"
              />
            ) : (
              <h1>Log In</h1>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
