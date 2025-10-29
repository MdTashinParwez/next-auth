// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, {useState} from "react";
// import {toast} from "react-hot-toast";
// import {useRouter} from "next/navigation";


// export default function ProfilePage() {
//     const router = useRouter()
//     const [data, setData] = useState("nothing")
//     const logout = async () => {
//         try {
//             await axios.get('/api/users/logout')
//             toast.success('Logout successful')
//             router.push('/login')
//         } catch (error:any) {
//             console.log(error.message);
//             toast.error(error.message)
//         }
//     }

//     const getUserDetails = async () => {
//         const res = await axios.get('/api/users/me')
//         console.log(res.data);
//         setData(res.data.data._id)
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Profile</h1>
//             <hr />
//             <p>Profile page</p>
//             <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
//             </Link>}</h2>
//         <hr />
//         <button
//         onClick={logout}
//         className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >Logout</button>

//         <button
//         onClick={getUserDetails}
//         className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >GetUser Details</button>


//             </div>
//     )
// }

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to fetch user details");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4 text-indigo-700">Profile</h1>
                <p className="text-gray-600 mb-4">Welcome to your profile page</p>

                <div className="mb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">User ID:</h2>
                    <p className="p-2 rounded bg-green-500 text-white break-words">
                        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`} className="underline hover:text-yellow-200">{data}</Link>}
                    </p>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Get User Details
                    </button>
                </div>
            </div>
        </div>
    );
}
