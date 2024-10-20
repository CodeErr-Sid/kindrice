import React, { useContext, useState } from 'react';
import { auth, signInWithGooglePopup, registerWithEmailPassword, loginWithEmailPassword } from "../../config/firebase";
import { assets } from '../../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '../../api/userapi';
import { AuthContext } from '../../context/AuthContext';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { url } = useContext(AuthContext);
    const { redirectToCheckout } = location.state;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const redirectToCheckoutMethod = () => {
        if (redirectToCheckout) {
            navigate('/checkout', {
                state: {
                    items: location.state?.items,
                    price: location.state?.price,
                    weightQuantity: location.state?.weightQuantity,
                    singleProduct: location.state?.singleProduct,
                }
            });
        } else {
            navigate(-1)
        }
    }

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const isNewUser = response._tokenResponse.isNewUser;
        const user = response.user;
        if (isNewUser) {
            if (user) {
                await registerUser(user.uid, user.email, user.name, url);
                redirectToCheckoutMethod();
            } else {
                toast.error("Registration failed");
            }
        } else {
            if (user) {
                redirectToCheckoutMethod();
            } else {
                toast.error('Login failed. Please check your email and password.');
            }
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = await loginWithEmailPassword(email, password);

        if (user) {
            redirectToCheckoutMethod();

        } else {
            toast.error('Login failed. Please check your email and password.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const user = await registerWithEmailPassword(name, email, password);

        if (user) {
            await registerUser(user.uid, user.email, user.name, url);
        } else {
            toast.error("Registration failed");
        }

        toggleForm();
    };

    const toggleForm = () => {
        setShowLogin(!showLogin);
        setName('');
        setEmail('');
        setPassword('');
    };

    const goToPreviousPage = () => {
        navigate(-1);
    };

    return (
        <section className='bg-gray-300 rounded-lg py-5'>
            <div className="container flex flex-col mx-auto bg-white rounded-lg">
                <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full">
                        <div className="flex items-center xl:p-10">
                            {showLogin ? (
                                <form
                                    className="flex flex-col mx-auto my-0 w-full sm:w-1/2 h-full pb-6 text-center bg-white rounded-3xl"
                                    onSubmit={handleSignIn}
                                >
                                    <p className='cursor-pointer mb-5 absolute left-4 text-grey-700' onClick={goToPreviousPage}>
                                        <FontAwesomeIcon icon={faArrowLeft} /> Go back
                                    </p>
                                    <span className="mb-3 w-1/2 self-center">
                                        <img src={assets.kindl} className='object-contain' alt="Kind Logo" />
                                    </span>
                                    <p className="mb-5 text-grey-700">Enter your email and password</p>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                                        onClick={logGoogleUser}
                                    >
                                        <img
                                            className="h-5 mr-2"
                                            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                            alt="Google Logo"
                                        />
                                        Sign in with Google
                                    </button>

                                    <div className="flex items-center mb-3">
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                        <p className="mx-4 text-grey-600">or</p>
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="mail@loopple.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                        required
                                    />
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                        required
                                    />
                                    <div className="flex flex-row justify-between mb-8">
                                        <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                                                <img
                                                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                                                    alt="tick"
                                                />
                                            </div>
                                            <span className="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span>
                                        </label>
                                        <a href="#!" className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl hover:bg-[#026635] focus:ring-4 focus:ring-purple-blue-100 bg-[#026635]"
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-sm leading-relaxed text-grey-900">
                                        Not registered yet? <a href="#!" className="font-bold text-grey-700" onClick={toggleForm}>Create an Account</a>
                                    </p>
                                </form>
                            ) : (
                                <form
                                    className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                                    onSubmit={handleSignUp}
                                >
                                    <span className="mb-5 w-1/4 self-center">
                                        <img src={assets.kindl} alt="Kind Logo" />
                                    </span>
                                    <p className="mb-4 text-grey-700">Enter your email and password</p>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                                        onClick={logGoogleUser}
                                    >
                                        <img
                                            className="h-5 mr-2"
                                            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                            alt="Google Logo"
                                        />
                                        Sign in with Google
                                    </button>
                                    <p className='cursor-pointer mb-5' onClick={goToPreviousPage}>
                                        <FontAwesomeIcon icon={faArrowLeft} /> Go back to website
                                    </p>
                                    <div className="flex items-center mb-3">
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                        <p className="mx-4 text-grey-600">or</p>
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>
                                    <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Name*</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                        required
                                    />
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="mail@loopple.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                        required
                                    />
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl hover:bg-[#026635] focus:ring-4 focus:ring-purple-blue-100 bg-[#026635]"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-sm leading-relaxed text-grey-900">
                                        Already registered? <a href="#!" className="font-bold text-grey-700" onClick={toggleForm}>Sign In</a>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
