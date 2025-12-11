import React from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import { use } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const SingleOrder = ({ item, setProducts, products}) => {
    const { backServerUrl } = use(AuthContext)


    // console.log("Single Product:", item)

    const handleOnDelete = async() => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!"
        });

        if (!result.isConfirmed) {
            console.log("User cancelled");
            return;
        }

        fetch(`${backServerUrl}/DeleteMyOrder/${item._id}`, {
            method: "DELETE"
        }).then(res => {
            const newArr = products.filter(product => product._id !== item._id)

            setProducts(newArr)
            Swal.fire({
                title: "Canceled!",
                text: "Your order Has Been canceld!",
                icon: "success"
            });
        })
    }

    return (
        <tr key={item._id} className="">
            <td>{item._id}</td>
            <td>{item.title}</td>
            <td>{item.minimumOrder}</td>
            <td>{item.status}</td>
            <td>{item.paymentStatus === "Paid" ? "Paid" : "Cash on Delivery"}</td>
            <td>
                <div className="flex gap-2">
                    <Link to={`/TrackOrder/${item._id}`}
                        className="btn btn-sm  theme-btn shadow p-4 "
                    >
                        View
                    </Link>
                    <button
                        onClick={handleOnDelete}
                        // onClick={() => onDelete(item._id)}
                        className="btn btn-sm btn-error black-text"
                    >
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default SingleOrder;