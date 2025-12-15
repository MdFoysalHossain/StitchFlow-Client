import React, { use } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { useState } from 'react';

const AdminSingleUser = ({ item,}) => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [userSuspended, setUserSuspended] = useState(false)
    const [statusChange, setStatusChange] = useState("")

    // {
    //     console.log("Single User:", item)
    // }

    const handleSubmission = (e) => {
        e.preventDefault()
        const status = e.target.status.value;
        const statusReason = userSuspended && e.target.suspendedReason.value;
        const statusFeedback = userSuspended && e.target.suspendedFeedback.value;

        const update = {
            status: status,
            suspendedReason: statusReason ? statusReason : "",
            suspendedFeedback: statusFeedback ? statusFeedback : ""
        }

        fetch(`${backServerUrl}/AdminAccountStatusChange/${item._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            },
            body: JSON.stringify(update)
        }).then(res => {

            setStatusChange(status)
            setUserSuspended(false)
            setSelectedOrder(false)
            Swal.fire({
                title: "Status Updated!",
                text: "Users Status Has Been Updated!",
                icon: "success"
            });

        })

    }



    const checkSuspended = (e) => {
        const isSuspended = e.target.value === "suspended";
        isSuspended ? setUserSuspended(true) : setUserSuspended(false)
    }

    return (
        <tr key={item._id} className=''>

            <td className='capitalize'>{item.name}</td>
            <td className='lowercase'>{item.email}</td>
            <td className='capitalize'>{item.accountType}</td>
            <td className='capitalize'>{statusChange ? statusChange : item.status}</td>
            <td>
                <div className="flex gap-4">
                    {/* <div className=" flex gap-2 items-center">
                        <input onChange={handleOnCheck} className='checkbox' defaultChecked={item.showHome} type="checkbox" name="" id="" />
                        Show At Home
                    </div> */}
                    <button
                        // onClick={handleOnDelete}
                        onClick={() => {
                            setSelectedOrder(true)
                            setUserSuspended(false)
                        }}
                        className="btn btn-sm theme-btn"
                    >
                        Update
                    </button>
                </div>

                {selectedOrder && (
                    <>
                        <input
                            type="checkbox"
                            id="orderModal"
                            className="modal-toggle"
                            checked
                            readOnly
                        />

                        <div className="modal" role="dialog">
                            <div className="modal-box max-w-[400px] p-8 rounded-2xl">

                                <h3 className="font-bold text-xl mb-6 text-gray-800">
                                    Update User Status
                                </h3>

                                <div className="">

                                    <div className="space-y-4">
                                        <div>
                                            <form onSubmit={handleSubmission}>

                                                <label className="label font-semibold mb-1">Change Status: ({item.status})</label>
                                                <select onChange={checkSuspended} defaultValue={item.status} name='status' className="select select-bordered w-full mb-4" >
                                                    <option disabled className=''>{item.status}</option>
                                                    <option value="normal">Normal</option>
                                                    <option value="suspended">Suspended</option>
                                                </select>

                                                {
                                                    userSuspended && <div className='flex flex-col gap-2'>
                                                        <label className='label'>Suspended Reason</label>
                                                        <input name='suspendedReason' type="text" className='input w-full mb-2' placeholder='Reason for Suspended' />
                                                        <label className='label'>Suspended feedback</label>
                                                        <textarea name='suspendedFeedback' className="textarea w-full" placeholder="Feedback"></textarea>
                                                    </div>
                                                }


                                                <div className="modal-action mt-2 flex justify-between">

                                                    <button
                                                        className="btn btn-sm theme-btn"
                                                    >
                                                        Update
                                                    </button>

                                                    <span
                                                        onClick={() => setSelectedOrder(false)}
                                                        className="btn btn-sm text-black"
                                                    >
                                                        Close
                                                    </span>

                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                )}
            </td>


        </tr>
    );
};
export default AdminSingleUser;