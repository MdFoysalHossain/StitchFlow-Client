import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import AdminSingleUser from './AdminSingleUser';

const AdminAllUsers = () => {
    const { userInfo, backServerUrl } = use(AuthContext)
    const [allUsers, setAllUsers] = useState([])
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

    return (
        <div className='text-2xl text-left font-semibold mt-10'>
            <h2>All Users ({allUsers.length})</h2>


            <div className="bg-white rounded-xl mt-5 overflow-hidden">

                <table className="table w-full  text-black">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            allUsers.map((item, index) => <AdminSingleUser key={index} index={index} item={item} setAllUsers={setAllUsers} allUsers={allUsers} />)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminAllUsers;