import React from 'react';
import { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Components/Context/AuthContext';
import { Link } from 'react-router';
import { useState } from 'react';


const AdminSingleOrder = ({item, setUpdateEffect}) => {

    const { backServerUrl, dbUserInfo } = use(AuthContext);
    const postedAt = item.approvedTime && item.approvedTime.split("T")[0];
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sellerUpdate, setSellerUpdate] = useState(false);
    const [stageData, setStageData] = useState([{}])

    console.log(item)

    const hangleStageData = (e) => {
        const stage = e.target.value;

        const keyMap = {
            "Preparing": "started",
            "Cutting Completed": "cutting",
            "Sewing Started": "sewing",
            "Packed": "packed",
            "Shipped": "shipped",
            "Out for Delivery": "delivery",
            "QC Checked": "qc",
            "Finishing": "finishing"
        };

        const key = keyMap[stage];
        if (!key) return;

        const data = [{
            stage: stage,
            startedAt: selectedOrder[`${key}Time`] || stage === "Preparing" && selectedOrder.approvedTime || "Not Set",
            startedLocation: selectedOrder[`${key}Location`] || "Factory",
            note: selectedOrder[`${key}Note`] || "No Note Provided"
        }];

        setStageData(data);
    };


    const handleUpdateDetails = (e) => {
        e.preventDefault();

        const isoTime = new Date().toISOString();
        const stage = e.target.stage.value;
        const location = e.target.location.value;
        const note = e.target.note.value;

        const keyMap = {
            "Cutting Completed": "cutting",
            "Sewing Started": "sewing",
            "Packed": "packed",
            "Shipped": "shipped",
            "Out for Delivery": "delivery",
            "QC Checked": "qc",
            "Finishing": "finishing",
        };

        const baseKey = keyMap[stage];

        if (!baseKey) {
            return;
        }

        const data = [{
            stage: stage,
            // refId: item._id,
            [`${baseKey}Time`]: isoTime,
            [`${baseKey}Location`]: location,
            [`${baseKey}Note`]: note
        }];

        // setDataUpdate(data);
        console.log(data[0]);

        fetch(`${backServerUrl}/ManagerUpdateApprovedProduct/${item._id}`, {
            method: "PATCH",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setUpdateEffect(true)
                setSellerUpdate(null)
                Swal.fire({
                    icon: "success",
                    title: "Details Updated",
                    text: "Selected details was updated successfully",
                });

            })
    };


    return (
        <>
            <tr key={item._id} >
                <td>{item._id}</td>
                <td className='capitalize'>{item.firstName} {item.lastName}</td>
                <td className='capitalize'>{item.title}</td>
                <td>{item.minimumOrder}</td>
                <td className='capitalize'>{item.status}</td>
                <td>{postedAt || "Not Approved Yet"}</td>
                <td>
                    <div className="flex gap-2">

                        {/* 🔥 Opens the modal */}
                        <button
                            onClick={() => setSelectedOrder(item)}
                            className="btn btn-sm theme-btn shadow p-4"
                        >
                            View Details
                        </button>

                    </div>

                    {sellerUpdate && (
                        <>
                            <input type="checkbox" id="orderModal" className="modal-toggle" checked readOnly />

                            <div className="modal" role="dialog">
                                <div className="modal-box">

                                    <h3 className="font-bold text-2xl">Seller Details</h3>
                                    <div className="f">

                                        <div className="space-y-1 mt-2 flex flex-col  w-full gap-2">
                                            <p><b>Order Id:</b> {item?._id}</p>
                                            <p><b>Current Stage:</b> {item?.stage}</p>

                                            <form onSubmit={handleUpdateDetails} className='w-full  flex flex-col'>
                                                <label className='label black-text font-semibold'>Set Stage</label>
                                                <select name='stage' className="select mb-2 w-full">
                                                    <option disabled selected>Select  Stage</option>
                                                    <option>Cutting Completed</option>
                                                    <option>Sewing Started</option>
                                                    <option>Finishing</option>
                                                    <option>QC Checked</option>
                                                    <option>Packed</option>
                                                    <option>Shipped</option>
                                                    <option>Out for Delivery</option>
                                                </select>

                                                <label className='label black-text font-semibold'>Set Location</label>
                                                <input type="text" className='input w-full' name='location' placeholder='location' />

                                                <label className='label black-text font-semibold mt-2'>Set Short Location</label>
                                                <textarea name='note' className="textarea w-full" placeholder="Short Note"></textarea>
                                                <button
                                                    className="btn btn-sm theme-btn mt-2"
                                                >
                                                    Update Stage Details
                                                </button>
                                            </form>
                                        </div>
                                    </div>





                                    <div className="modal-action flex justify-end">


                                        <button
                                            className="btn btn-sm"
                                            onClick={() => setSellerUpdate(null)}
                                        >
                                            Close
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}


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
                                <div className="modal-box max-w-4xl p-8 rounded-2xl">

                                    <h3 className="font-bold text-3xl mb-6 text-gray-800">
                                        Order Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                        {/* Buyer Details */}
                                        <div className="space-y-3">
                                            <h2 className="text-xl font-semibold mb-2">Buyer Details</h2>

                                            <div className="space-y-1 text-gray-700">
                                                <p><b>Title:</b> <Link to={`/SingleProduct/${item.productId}`} className="underline text-blue-600">{item.title}</Link></p>
                                                <p><b>Ordered Id:</b> {selectedOrder._id}</p>
                                                <p><b>Ordered By:</b> {selectedOrder.firstName} {selectedOrder.lastName}</p>
                                                <p><b>Contact:</b> {selectedOrder.contact}</p>
                                                <p><b>Address:</b> {selectedOrder.address}</p>
                                                <p><b>Email:</b> {selectedOrder.email}</p>

                                                <p><b>Price:</b> ${selectedOrder.perPrice}</p>
                                                <p><b>Total Order:</b> {selectedOrder.minimumOrder} Piece</p>
                                                <p><b>Total Paid:</b> ${selectedOrder.total}</p>

                                                <p><b>Status:</b> {selectedOrder.paymentStatus}</p>

                                                <p>
                                                    <b>Payment Method:</b>{" "}
                                                    {selectedOrder.paymentStatus === "Paid"
                                                        ? "Online Payment"
                                                        : "Cash On Delivery"}
                                                </p>

                                                <p><b>Current Stage:</b> {selectedOrder.stage}</p>
                                            </div>
                                        </div>

                                        {/* Seller Update */}
                                        <div className="space-y-4">
                                            <h2 className="text-xl font-semibold">Seller Update</h2>

                                            <div className="bg-gray-50 p-4 rounded-xl  space-y-2 shadow-sm">
                                                <p><b>Stage:</b> {selectedOrder.stage}</p>

                                                {selectedOrder.approvedTime && (
                                                    <p><b>Approved Time:</b> <br /> {selectedOrder.approvedTime}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="label font-semibold mb-1">Select Stage</label>
                                                <select className="select select-bordered w-full mb-4" onChange={hangleStageData}>
                                                    <option disabled selected>Select Stage</option>
                                                    <option>Preparing</option>
                                                    <option>Cutting Completed</option>
                                                    <option>Sewing Started</option>
                                                    <option>Finishing</option>
                                                    <option>QC Checked</option>
                                                    <option>Packed</option>
                                                    <option>Shipped</option>
                                                    <option>Out for Delivery</option>
                                                </select>
                                            </div>

                                            {stageData[0] && (
                                                <div className="bg-gray-50 p-4 rounded-xl  shadow-sm space-y-2">
                                                    <p><b>{stageData[0]?.stage} At:</b> <br /> {stageData[0]?.startedAt}</p>
                                                    <p><b>Location:</b> <br /> {stageData[0]?.startedLocation}</p>
                                                    <p><b>Note:</b> <br /> {stageData[0]?.note}</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* Modal Actions */}
                                    <div className="modal-action mt-8 flex justify-between">
                                        {/* <button
                                            onClick={() => {
                                                setSelectedOrder(null);
                                                setSellerUpdate(selectedOrder);
                                            }}
                                            className="btn theme-btn btn-sm px-6"
                                        >
                                            Update Details
                                        </button> */}

                                        <button
                                            className="btn btn-sm"
                                            onClick={() => setSelectedOrder(null)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </td>

            </tr>
        </>
    );
};


export default AdminSingleOrder;