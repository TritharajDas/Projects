import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo_eu.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setisMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        } else {
            setisMenu(!isMenu);
        }
    };

    const logout = () => {
        setisMenu(false);

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    // console.log("cartItems -->", cartItems);

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md-px-16 bg-primary">
            {/*desktop and tablet*/}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img
                        src={Logo}
                        className="object-cover w-14 h-4"
                        alt="logo"
                    />
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-16"
                    >
                        <li
                            className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                            onClick={() => setisMenu(false)}
                        >
                            <Link to={"/"}>Home </Link>
                        </li>
                        <li
                            className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                            onClick={() => setisMenu(false)}
                        >
                            Menu
                        </li>
                        <li
                            className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                            onClick={() => setisMenu(false)}
                        >
                            About Us
                        </li>
                        <li
                            className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                            onClick={() => setisMenu(false)}
                        >
                            Service
                        </li>
                    </motion.ul>
                    <div
                        className="relative flex items-center justify-center"
                        onClick={showCart}
                    >
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.reduce(
                                        (previousValue, currentValue) =>
                                            previousValue + currentValue.qty,
                                        0
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] min-h-[40px] h-10 cursor-pointer drop-shadow-xl rounded-full"
                            onClick={login}
                            alt="user profile"
                        />
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                            >
                                {user &&
                                    user.email === "rjtirtharaj@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p
                                                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                                onClick={() => setisMenu(false)}
                                            >
                                                New Item <MdAdd />
                                            </p>
                                        </Link>
                                    )}
                                <p
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/*mobile*/}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <div
                    className="relative flex items-center justify-center"
                    onClick={showCart}
                >
                    <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                {cartItems.length}
                            </p>
                        </div>
                    )}
                </div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img
                        src={Logo}
                        className="w-14 h-4 object-cover"
                        alt="logo"
                    />
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-10 min-w-[40px] min-h-[40px] h-10 cursor-pointer drop-shadow-xl rounded-full"
                        onClick={login}
                        alt="user profile"
                    />
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                        >
                            {user && user.email === "rjtirtharaj@gmail.com" && (
                                <Link to={"/createItem"}>
                                    <p
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={() => setisMenu(false)}
                                    >
                                        New Item <MdAdd />
                                    </p>
                                </Link>
                            )}

                            <ul className="flex flex-col">
                                <li
                                    className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setisMenu(false)}
                                >
                                    <Link to={"/"}>Home </Link>
                                </li>
                                <li
                                    className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setisMenu(false)}
                                >
                                    Menu
                                </li>
                                <li
                                    className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setisMenu(false)}
                                >
                                    About Us
                                </li>
                                <li
                                    className="text-base text-textColor hover: text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setisMenu(false)}
                                >
                                    Service
                                </li>
                            </ul>
                            <p
                                className="m-2 rounded-md shadow-md p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor justify-center bg-gray-200 text-base"
                                onClick={logout}
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
