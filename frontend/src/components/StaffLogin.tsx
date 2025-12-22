// // src/pages/StaffLogin.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRoleFromToken } from "../utils/auth";

// const StaffLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const res = await fetch("/api/auth/staff/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (!res.ok) {
//                 const text = await res.text();
//                 throw new Error(text || "Login failed");
//             }

//             const data = await res.json(); // { token, email, username, role }
//             const token = data.token as string;

//             localStorage.setItem("authToken", token);

//             const role = getRoleFromToken(token);

//             if (role === "admin") {
//                 navigate("/admin");
//             } else if (role === "staff") {
//                 navigate("/admin"); // same page, but limit UI inside
//             } else {
//                 // fallback
//                 navigate("/");
//             }
//         } catch (err: any) {
//             setError(err.message || "Error logging in");
//         }
//     };

//     return (
//         <div>
//             <h1>Staff / Admin Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default StaffLogin;
