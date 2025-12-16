import React from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import { useContext } from 'react';

const MyProfile = () => {
    const { userInfo, dbUserInfo, userSignOut } = useContext(AuthContext);
    console.log("User Info", userInfo)
    console.log("DB User Info", dbUserInfo)


    if (!dbUserInfo) {
        return (
            <div className='w-full h-[50vh] flex justify-center items-center'><span className="loading scale-150 loading-spinner text-purple-600"></span></div>
        )
    }

    return (
        <div className="w-full  max-w-lg mx-auto mt-10 p-4">
            <title>My Profile</title>
            <div className="rounded-2xl theme-div shadow-md border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex flex-col items-center text-center gap-4">
                    <img
                        src={dbUserInfo.image}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover shadow-md"
                    />


                    <div>
                        <h2 className="text-2xl font-semibold">{dbUserInfo.name}</h2>
                        <h2 className="text-gray-500 text-lg font-semibold">#{dbUserInfo._id}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{dbUserInfo.email}</p>
                    </div>


                    <div className="flex flex-col gap-4 w-full text-sm mt-4">
                        <div className="flex gap-5">
                            <div className="p-4 flex-1 rounded-xl border border-gray-200 dark:border-gray-700">
                                <p className="font-medium ">Account Type</p>
                                <p className="text-lg font-semibold">{dbUserInfo.accountType}</p>
                            </div>


                            <div className="p-4 flex-1 rounded-xl border border-gray-200 dark:border-gray-700">
                                <p className="font-medium ">Status</p>
                                <p className="text-lg font-semibold capitalize">{dbUserInfo.status}</p>
                            </div></div>

                        {
                            dbUserInfo.status === "suspended" && <div className="p-4 text-left w-full rounded-xl border border-gray-200 dark:border-gray-700">
                                <p className="font-medium mb-2">Feedback</p>
                                <p className="text-lg font-semibold capitalize">{dbUserInfo.suspendedFeedback}</p>
                            </div>
                        }

                    </div>


                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Registered on: {new Date(dbUserInfo.registrationTime).toLocaleString()}
                    </p>


                    <button
                        onClick={userSignOut}
                        className="mt-4 w-full btn border-0 shadow-none flex theme-btn py-2.5 font-semibold transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;