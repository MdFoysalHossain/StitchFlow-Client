import React from 'react';
import { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Components/Context/AuthContext';
import { Link } from 'react-router';
import { useState } from 'react';

const SinglePending = ({ item, setProducts, products }) => {

    const { backServerUrl, dbUserInfo, userInfo } = use(AuthContext);
    const postedAt = item.postedAt && item.postedAt.split("T")[0];
    const [selectedOrder, setSelectedOrder] = useState(null);

    {
        console.log(item)
    }

    const approveOrder = () => {
        setSelectedOrder(null)
        fetch(`${backServerUrl}/ProductOrderApprove/${item._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then(res => {
                const newProducts = products.filter(item2 => item2._id !== item._id)
                console.log([newProducts])
                setProducts([...newProducts])

                const message = `Order  #${item.productId} was approved successfully`
                Swal.fire({
                    icon: "success",
                    title: "Order Was Approved",
                    text: message,
                });

            })
    }

    const rejectOrder = () => {
        setSelectedOrder(null)
        fetch(`${backServerUrl}/ProductOrderReject/${item._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
        })
            .then(res => {
                const newProducts = products.filter(item2 => item2._id !== item._id)
                console.log([newProducts])
                setProducts([...newProducts])

                const message = `Order  #${item.productId} was rejected successfully`
                Swal.fire({
                    icon: "error",
                    title: "Order Was rejected",
                    text: message,
                });

            })
    }


    const handleSuspended = () => {
        Swal.fire({
            title: "Account Suspended!",
            text: "Users account is suspended and can not accept or rejct new orders!",
            icon: "error"
        });
    }

    return (
        <>
            <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.firstName} {item.lastName}</td>
                <td>{item.title}</td>
                <td>{item.minimumOrder}</td>
                <td>{postedAt || "Date Not Set"}</td>
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

                    {selectedOrder && (
                        <>
                            <input type="checkbox" id="orderModal" className="modal-toggle" checked readOnly />

                            <div className="modal" role="dialog">
                                <div className="modal-box">

                                    <h3 className="font-bold text-lg">Order Details</h3>

                                    <div className="space-y-1 mt-2">
                                        <p><b>Title:</b> <Link to={`/SingleProduct/${item.productId}`} className='underline'>{selectedOrder.title} </Link></p>
                                        <p><b>Ordered By:</b> {selectedOrder.firstName} {selectedOrder.lastName}</p>
                                        <p><b>Contact:</b> {selectedOrder.contact}</p>
                                        <p><b>Address:</b> {selectedOrder.address}</p>
                                        <p><b>Email:</b> {selectedOrder.email}</p>
                                        <p><b>Price:</b> ${selectedOrder.perPrice}</p>
                                        <p><b>Total Order:</b> {selectedOrder.minimumOrder} Peice</p>
                                        <p><b>Total Paid:</b> {selectedOrder.total}$</p>
                                        <p><b>Status:</b> {selectedOrder.paymentStatus}</p>
                                        <p><b>Payment Methode:</b> {selectedOrder.paymentStatus === "Paid" ? "Online Paymnet" : "Cash On Delivery"}</p>
                                    </div>





                                    <div className="modal-action flex justify-between">
                                        <div className="">
                                            <button
                                                onClick={dbUserInfo.status === "suspended" ? handleSuspended : approveOrder}
                                                className="btn btn-sm theme-btn shadow p-4 mr-5"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={dbUserInfo.status === "suspended" ? handleSuspended : rejectOrder}
                                                className="btn btn-sm bg-red-500  p-4 text-white shadow"
                                            >
                                                Reject
                                            </button>
                                        </div>
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

export default SinglePending;
