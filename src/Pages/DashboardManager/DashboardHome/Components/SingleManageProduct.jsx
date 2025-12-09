import React from "react";
import { Link } from "react-router";

const ManageProductsTable = ({ item, }) => {

    console.log("Single Product:", item)
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
                        className="btn btn-sm  theme-btn shadow"
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
