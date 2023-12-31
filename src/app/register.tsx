"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import styles from './page.module.css';

export default function RegPage()
{
    const [ loggedin, setLoggedin ] = useState("false");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState(" ");
    const [ error, setError ] = useState("");

    const handleReg = async(e: any) => 
    {
        e.preventDefault();
        setError("");

        if(!email)
        {
            setError("Email field is necessary.")
            return;
        }

        try 
        {
            const resUserExists = await fetch('api/weather/userExists', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const { user } = await resUserExists.json();

            if(user)
            {
                setError("User already exists. Please log in.");
                return;
            }

            const res = await fetch('api/weather/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email,}),
            });
            

            if(res.ok)
            {
                const form = e.currentTarget;
                setLoggedin("true");
            }
            else
            {
                console.log("User Registration Failed.")
            }
        } 
        catch (error) 
        {
            console.log("Error during registration: ", error)
        }
    };

    const handleLogin = async(e: any) => 
    {
        e.preventDefault();
        setError("");
/********************************* 
        Stopped here
 ********************************/ 
        try 
        {
            const res = await fetch('api/weather/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const { user } = await res.json();

            if(user)
            {
                const form = e.currentTarget;
                setLoggedin("true");
            }
            else
            {
                setError("That email doesn't exist. Please register.")
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    };

    const handleLogout = async(e: any) => 
    {
        setLoggedin("false");
        setError("");
    }
    
    if(loggedin == "true")
    {
        return(
            <div>
                <form>
                    <h1 className="text-amber-400">Welcome</h1>
                    <p>{email}</p>
 
                </form>
                <button onClick={handleLogout} className={styles.actBtn}>Logout</button>
                { error && (
                        <div className="bg-red-500">
                            {error}
                        </div>
                )}
            </div>
        );
    }
    else
    {
        return(
            <div className={styles.acct_div}>
                <form>
                    <h1>Account</h1>
                    <label>Email:</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="email" name="email" />

                    {/* <label>Password:</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="password" name="password" />  */}
                    <button onClick={handleLogin} className={styles.actBtn}>Login</button>
                    <button onClick={handleReg} className={styles.actBtn}>Register</button>
                </form>
                    
                
                { error && (
                        <div className="bg-red-500">
                            {error}
                        </div>
                )}
            </div>
        );
    }
}