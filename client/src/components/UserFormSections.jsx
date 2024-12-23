import { useState, useContext } from 'react';
import { MyContext } from '../context/myContext';
export default function UserFormSections({ id }) {
  const { userDetails, setUserDetails } = useContext(MyContext);

  return (
    <div className="flex flex-col gap-5">
      {id === 'profile' && (
        <>
          {/* Profile includes Name,email */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Name:</span>
            <input
              value={userDetails?.profile?.name}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profile: { ...userDetails.profile, name: e.target.value },
                })
              }
              type="text"
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Position:</span>
            <input
              value={userDetails?.profile?.position}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profile: { ...userDetails.profile, position: e.target.value },
                })
              }
              type="text"
              className="p-2 border rounded-md"
            />
          </div>
        </>
      )}

      {id === 'contact' && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Email:</span>
            <input
              value={userDetails?.contact?.email}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contact: { ...userDetails.contact, email: e.target.value },
                })
              }
              type="text"
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Phone:</span>
            <input
              value={userDetails?.contact?.phone}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contact: { ...userDetails.contact, phone: e.target.value },
                })
              }
              type="text"
              className="p-2 border rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
}
