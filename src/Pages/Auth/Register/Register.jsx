import React, { use, useState } from 'react';
import SideImage from "/Login.avif"
import { Link, useNavigate, } from 'react-router';
import { AuthContext } from '../../../Components/Context/AuthContext';

const Register = () => {
    const { createEmailAccount, backServerUrl, googleLogin, userInfo } = use(AuthContext)
    const navigate = useNavigate();

    const [error, setError] = useState("");


    const handleGoogleRegistration = () => {
        googleLogin()
            .then(res => {
                //console.log("Google Res:", res.user)
                const userData = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL,
                    accountType: "buyer",
                }

                fetch(`${backServerUrl}/createUser`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data2 => {
                        //console.log("Successfully Updated to DB:", data2)
                        navigate("/")
                    })
                    .catch(err => //console.log("Server Store Error:", err))
            })
    }

    const handelEmailRegister = (e) => {
        e.preventDefault()

        const name = e.target.name.value;
        const email = e.target.email.value;

        const image_file = new FormData();
        image_file.append("image", e.target.image_file.files[0]);


        const accountType = e.target.accountType.value;
        const password = e.target.password.value;

        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setError("");

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageBB_Creds}`, {
            method: "POST",
            body: image_file
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                const userData = {
                    name: name,
                    email: email,
                    image: data.data.url,
                    accountType: accountType,
                }

                createEmailAccount(email, password)
                    .then(data => {
                        //console.log("User Data:", data.user);

                        fetch(`${backServerUrl}/createUser`, {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(userData)
                        })
                            .then(res => res.json())
                            .then(data2 => {
                                //console.log("Successfully Updated to DB:", data2)
                                navigate("/")
                            })
                            .catch(err => //console.log("Server Store Error:", err))

                    })
                    .catch(err => {
                        //console.log("Register Error:", err);
                    });

                //console.log(userData)
            })


    }

    if(userInfo){
        navigate("/")
    }

    return (
        <div className="flex items-center">
            <title>User Register</title>
            <div className='mx-auto w-fit p-4 md:p-0 mt-10  max-w-[700px] bg-white shadow-xl flex justify-center items-center rounded-xl overflow-hidden'>
                <div className="flex">
                    <div className="flex-1 hidden md:block  h-[700px] overflow-hidden relative">
                        <img
                            src={SideImage}
                            alt=""
                            className="h-full w-auto object-cover"
                        />
                        <h1 className='text-4xl absolute bottom-4 left-5 theme-text-white text-left font-semibold'>Register New Account</h1>
                    </div>


                    <div className="flex-1 w-full flex items-center">
                        <div className="card w-full max-w-sm shrink-0 ">
                            <h1 className='text-2xl font-bold theme-text-black'>Hello There!</h1>
                            <div className="card-body">
                                <form onSubmit={handelEmailRegister}>
                                    <fieldset className="fieldset gap-2">
                                        <label className="label">Full Name</label>
                                        <input name='name' type="text" className="input theme-text-black" placeholder="Name" required />

                                        <label className="label">Photo</label>
                                        <input name='image_file' type="file" className="file-input file-input-sm theme-text-black" required />

                                        <div className="text-left">
                                            {/* <legend className="label">Account Type</legend> */}
                                            <label className="label mb-2">Account Type</label>
                                            <select name='accountType' defaultValue="buyer" className="select theme-text-black" required>
                                                {/* <option disabled={true}>Account Type</option> */}
                                                <option>Buyer</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>

                                        <label className="label">Email</label>
                                        <input name='email' type="email" className="input theme-text-black" placeholder="Email" required />

                                        <label className="label">Password</label>
                                        <input name='password' type="password" className="input theme-text-black" placeholder="Password" required />
                                        <p className='text-red-500'>{error}</p>
                                        <button className="btn theme-btn mt-0">Register</button>
                                    </fieldset>
                                </form>
                                <div><Link className="link link-hover theme-text text-md" to={"/Login"}>Already Have An Account?</Link></div>

                                <div className="">
                                    <div className="mb-2 text-lg theme-text-black">
                                        or
                                    </div>
                                    <button onClick={handleGoogleRegistration} className="btn bg-white text-black border-[#e5e5e5] mt-2">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Register with Google
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;