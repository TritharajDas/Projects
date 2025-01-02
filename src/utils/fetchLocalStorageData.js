export const fetchUser = () => {
    const userInfo = !localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};

    return userInfo;
};

export const fetchCart = () => {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
};
