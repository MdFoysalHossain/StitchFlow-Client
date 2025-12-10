import React from "react";
import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../../Components/Context/AuthContext";
import Swal from 'sweetalert2'

const ManageProductsTable = ({ item, setProducts, products}) => {
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

        fetch(`${backServerUrl}/DeletePost/${item._id}`, {
            method: "DELETE"
        }).then(res => {
            const newArr = products.filter(product => product._id !== item._id)

            setProducts(newArr)
            Swal.fire({
                title: "Deleted!",
                text: "Your Product Has Been Deleted!",
                icon: "success"
            });
        })
    }

    return (
        <tr key={item._id} className="">
            <td>
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                />
            </td>
            <td>{item.title}</td>
            <td>${item.perPrice}</td>
            <td>{item.minimumOrder}</td>
            <td>{item.availableQuanity}</td>
            <td>{item.cod && "Cash On Delivery"} {item.onlinePay && item.cod ? "&" : ""} {item.onlinePay && "Online Pay"}</td>
            <td>
                <div className="flex gap-2">
                    <Link to={`/SingleProduct/${item._id}`}
                        className="btn btn-sm  theme-btn shadow p-4 "
                    >
                        View
                    </Link>
                    <Link
                        to={`/Dashboard/Manager/UpdateProduct/${item._id}`}
                        // onClick={() => onUpdate(item._id)}
                        className="btn btn-sm btn-success black-text"
                    >
                        Update
                    </Link>
                    <button
                        onClick={handleOnDelete}
                        // onClick={() => onDelete(item._id)}
                        className="btn btn-sm btn-error black-text"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ManageProductsTable;
