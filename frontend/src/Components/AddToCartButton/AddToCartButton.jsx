import { useState } from "react";

const AddToCartButton = ({ callback }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = async () => {
        setIsAdded(true);

        await callback();

        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <button
            className={`relative w-full bg-[#016533] text-white font-bold rounded-lg py-5 mt-2 transition duration-300 ease-in-out overflow-hidden focus:outline-none`}
            onClick={handleClick}
        >
            <span
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg ${isAdded ? "opacity-0 animate-txt1" : "opacity-100"
                    }`}
            >
                Add to cart
            </span>
            <span
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg ${isAdded ? "opacity-100 animate-txt2" : "opacity-0"
                    }`}
            >
                Added
            </span>
            <i
                className={`fas fa-shopping-cart absolute text-2xl top-1/2 left-[-10%] transform -translate-y-1/2 ${isAdded ? "animate-cart" : ""
                    }`}
            ></i>
            <i
                className={`fas fa-box absolute text-xl top-[-50%] left-[54%] transform -translate-x-1/2 ${isAdded ? "animate-box" : ""
                    }`}
            ></i>
        </button>
    );
};

export default AddToCartButton;
