import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
const UserForm = () => {
  const { userDetails, setUserDetails } = useContext(MyContext);
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl font-bold">Enter Your Details:</h1>
      {/* Inputs Divs */}
      {/* Name */}
      <div className="flex flex-col gap-2 ">
        <span className="text-lg font-semibold ">Name:</span>
        <input
          className=" text-[14px] outline-none border border-black rounded-md"
          type="text"
          value={userDetails.name}
          placeholder="Enter your name"
          onChange={e =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />
      </div>
      {/* Position */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">Position:</span>
        <input
          value={userDetails.position}
          placeholder="Enter your position"
          onChange={e =>
            setUserDetails({ ...userDetails, position: e.target.value })
          }
          className=" text-[14px] outline-none border border-black rounded-md"
          type="text"
        />
      </div>
      {/* Email */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">Email:</span>
        <input
          value={userDetails.email}
          placeholder="Enter your email"
          onChange={e =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          className=" text-[14px] outline-none border border-black rounded-md"
          type="text"
        />
      </div>
      {/* Phone */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">Phone:</span>
        <input
          value={userDetails.phone}
          placeholder="Enter your phone"
          onChange={e =>
            setUserDetails({ ...userDetails, phone: e.target.value })
          }
          className=" text-[14px] outline-none border border-black rounded-md"
          type="text"
        />
      </div>
      {/* Address */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">Address:</span>
        <input
          value={userDetails.address}
          placeholder="Enter your address"
          onChange={e =>
            setUserDetails({ ...userDetails, address: e.target.value })
          }
          className=" text-[14px] outline-none border border-black rounded-md"
          type="text"
        />
      </div>
      {/* Summary */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">Summary:</span>
        <textarea
          value={userDetails.summary}
          placeholder="Enter your summary"
          onChange={e =>
            setUserDetails({ ...userDetails, summary: e.target.value })
          }
          rows={7}
          className="w-full text-[14px] outline-none border border-black rounded-md"
          type="text"
        />
      </div>
      {/*Professional Experience */}
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Time:</span>
        <input
          type="text"
          className="w-full text-[14px] outline-none border border-black rounded-md"
        />
        <span className="text-lg font-semibold">Position:</span>
        <input
          type="text"
          className="w-full text-[14px] outline-none border border-black rounded-md"
        />
      </div>
    </div>
  );
};

export default UserForm;
