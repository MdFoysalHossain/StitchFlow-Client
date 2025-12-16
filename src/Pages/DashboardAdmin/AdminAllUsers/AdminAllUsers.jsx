import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import AdminSingleUser from './AdminSingleUser';

const AdminAllUsers = () => {
    const { userInfo, backServerUrl } = use(AuthContext)
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [prodLoading, setProdLoading] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/AdminAllUsers`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllUsers(data)
                setProdLoading(false)
                console.log("All Users:", data)
            })
    }, [])

    const handleFilter = (e) => {
        const filterBy = e.target.value;
        console.log("Changed To:", filterBy)
        if (filterBy === "all") {
            setFilteredUsers([])
        }
        if (filterBy === "Buyer") {
            const filterData = allUsers.filter(user => user.accountType === "Buyer")
            setFilteredUsers(filterData)
        }
        if (filterBy === "Manager") {
            const filterData = allUsers.filter(user => user.accountType === "Manager")
            setFilteredUsers(filterData)
        }
        if (filterBy === "Admin") {
            const filterData = allUsers.filter(user => user.accountType === "Admin")
            setFilteredUsers(filterData)
        }
        // const filterData = allUsers.filter(user => user.accountType === e)
        // setFilteredUsers(filterData)
    }

    return (
        <div className='text-2xl text-left font-semibold mt-10'>
            <title>Admin - All Users</title>
            <div className="flex justify-between items-center">
                <h2>All Users ({allUsers.length})</h2>


                <div className="w-[150px]">

                    <p className='text-sm font-normal'>Filter By</p>
                    <select onChange={handleFilter} className="select font-normal text-black">
                        <option value="all">All</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-xl mt-5 overflow-x-auto xl:overflow-x-visible">

                <table className="table w-full  text-black ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th >Actions</th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            filteredUsers.length > 0 ? filteredUsers.map((item, index) => <AdminSingleUser key={index} index={index} item={item} setAllUsers={setAllUsers} allUsers={allUsers} />)
                                : allUsers.map((item, index) => <AdminSingleUser key={index} index={index} item={item} setAllUsers={setAllUsers} allUsers={allUsers} />)
                        }
                    </tbody>

                </table>
            </div>


            {/* <div className="bg-white rounded-xl mt-5">
                <div className="overflow-x-auto md:overflow-x-visible">
                    <table className="table w-full text-black min-w-[700px]">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filteredUsers.length > 0
                                    ? filteredUsers.map((item, index) => (
                                        <AdminSingleUser key={item._id} index={index} item={item}/>))
                                    : allUsers.map((item, index) => (
                                        <AdminSingleUser key={item._id} index={index} item={item}/>))
                            }
                        </tbody>
                    </table>
                </div>
            </div> */}

        </div>
    );
};

export default AdminAllUsers;