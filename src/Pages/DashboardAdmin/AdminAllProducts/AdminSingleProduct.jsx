import React, { use } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const AdminSingleProduct = ({item, setAllProducts, allProducts}) => {

    const { userInfo, backServerUrl } = use(AuthContext)


    const handleOnDelete = async () => {
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
            const newArr = allProducts.filter(product => product._id !== item._id)

            setAllProducts(newArr)
            Swal.fire({
                title: "Deleted!",
                text: "Your Product Has Been Deleted!",
                icon: "success"
            });
        })
    }

    {
        console.log(item)
    }

    const handleOnCheck = (e) => {
        const check = e.target.checked;
        console.log("Check:", check)

        const productData = {
            id: item._id,
            showHome: check
        }

        fetch(`${backServerUrl}/AdminShowHomeChange`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(productData)
        }) .then(res => res.json())
            .then(data => console.log("Updated"))
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
            <td>{item.category}</td>
            <td>{item.createdBy}</td>
            <td>
                <div className="flex gap-4">
                    <div className=" flex gap-2 items-center">
                        <input onChange={handleOnCheck} className='checkbox' defaultChecked={item.showHome} type="checkbox" name="" id="" /> 
                        Show At Home
                    </div>
                    <Link to={`/SingleProduct/${item._id}`}
                        className="btn btn-sm  theme-btn shadow p-4 "
                    >
                        View
                    </Link>
                    <Link
                        to={`/Dashboard/Manager/UpdateProduct/${item._id}`}
                        className="btn btn-sm btn-success black-text"
                    >
                        Update
                    </Link>
                    <button
                        onClick={handleOnDelete}
                        className="btn btn-sm btn-error black-text"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default AdminSingleProduct;