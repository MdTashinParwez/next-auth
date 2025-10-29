// "use client";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";


// export default function VerifyEmailPage() {

//     const [token, setToken] = useState("");
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);

//     const verifyUserEmail = async () => {
//         try {
//             await axios.post('/api/users/verifyemail', {token})
//             setVerified(true);
//         } catch (error:any) {
//             setError(true);
//             console.log(error.reponse.data);
            
//         }

//     }

//     useEffect(() => {
//         const urlToken = window.location.search.split("=")[1];
//         setToken(urlToken || "");
//     }, []);


//     useEffect(() => {
//         if(token.length > 0) {
//             verifyUserEmail();
//         }
//     }, [token]);

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">

//             <h1 className="text-4xl">Verify Email</h1>
//             <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

//             {verified && (
//                 <div>
//                     <h2 className="text-2xl">Email Verified</h2>
//                     <Link href="/login">
//                         Login
//                     </Link>
//                 </div>
//             )}
//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
//                 </div>
//             )}
//         </div>
//     )

// }


"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen 0 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <h1 className="text-4xl font-bold mb-4 text-indigo-700">Verify Email</h1>

                <p className="mb-4 text-gray-600">
                    {token ? `Your token: ${token}` : "No token found."}
                </p>

                {verified && (
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold text-green-600 mb-2">
                            Email Verified Successfully ✅
                        </h2>
                        <Link
                            href="/login"
                            className="inline-block mt-2 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold text-red-600">
                            Error verifying email ❌
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Please try again or check your token.
                        </p>
                    </div>
                )}

                {!verified && !error && (
                    <div className="mt-4">
                        <p className="text-gray-500">Verifying your email...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

