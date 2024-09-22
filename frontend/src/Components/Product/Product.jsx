import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Accordion from "../Accordion/Accordion"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addToCart, getProductById } from '../../api/cartapi';
import Dropdown from '../Dropdown/Dropdown';
import QuantitySelector from '../Dropdown/QuantitySelector';

const Product = ({ productId }) => {

    const productData = {
        "ingredients": { "title": "Ingredients", "content": ["100% Natural low-GI rice"] },
        "keyFeatures": { "title": "Product details", "content": ["Paddy Variety: Indian-RNR", "Processing Method: Boiled", "Age: 6-12 months", "Cooking Time: 15-20 minutes", "Grain Size: Medium and short", "Best Cooking Methods: Open pan, cooker", "Location: India", "Recommended For: White rice, variety rice, thali, meals", "Taste Notes: Earthy", "Texture: Soft and tender", "Cooked Rice Color: White", "Processed at: R.K. Brothers Agro Foods Private Limited, 66/2, New Ramnad Rd, Madurai, Meenakshi Nagar, Tamil Nadu 625001."] },
        "nutrition": { "title": "Nutritional Benefits", "description": "Rich in protein, essential for muscle repair and growth. High in fiber, promoting digestive health and satiety.", "content": ["no chemicals", "no nasties", "no adulterant", "no added flavours", "no artificial sweeteners"], "facts": { "title": "Nutritional Facts", "Protein": "6.5", "Fat": "1.1", "Crude Fiber": "0.4", "Carbohydrate": "81.3", "Energy": "361.5", "Moisture": "10.5", "Total Ash": "0.56" } }
    };

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [weight, setWeight] = useState(1);
    const [price, setPrice] = useState(0);
    const [selectedImage, setSelectedImage] = useState(assets.rice1);
    const [currentContent, setCurrentContent] = useState(productData["keyFeatures"]);



    const { isLoggedIn, idToken, getCartItems } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(productId);
            if (productData.success) {
                setProduct(productData.data);
                setSelectedImage(productData.data.images[0] || assets.rice1);
                setWeight(productData.data.weightPrice[0].weight.value);
            } else {
                setProduct({});
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const selectedWeightData = product.weightPrice?.find(item => item.weight.value === weight);
        if (selectedWeightData) {
            setPrice(selectedWeightData.totalPrice * quantity);
        }
    }, [weight, quantity, product.weightPrice]);

    const handleBuyNow = () => {
        if (isLoggedIn) {
            // buy now logic
        } else {
            navigate("/login");
        }
    };

    const handleAddToCart = async () => {
        if (isLoggedIn) {
            const data = await addToCart(productId, quantity, weight, idToken);
            await getCartItems();
        } else {
            navigate("/login");
        }
    };

    const handleWeightChange = (selectedWeight) => {
        setWeight(selectedWeight);
    };

    const handleQuantityChange = (selectedQuantity) => {
        setQuantity(selectedQuantity);
    };

    const handleButtonClick = (section) => {
        setCurrentContent(productData[section]);
    };

    const selectImage = (image) => {
        setSelectedImage(image);
    };

    return (
        <section>
            {product && (
                <div className="product-section">
                    <div className="product-image-container">
                        <div className="p-img-group">
                            {product.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    onClick={() => selectImage(image)}
                                />
                            ))}
                        </div>
                        <div className="p-img">
                            <img src={selectedImage} alt="Selected Product" />
                        </div>
                    </div>
                    <div className="product-content flex flex-col justify-between gap-10">
                        <h4 className="product-name text-4xl font-extrabold">{product.productName}<br />Pack of {weight}Kg</h4>

                        <div className="rating flex flex-row gap-3 items-center">
                            {/* <div className="star-icons">
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                    </div>
                    <div className="rating-number text-xl">4,345</div> */}
                        </div>
                        <div className="price-container">
                            <h5 className="price text-5xl font-extrabold text-[#016533]">{'\u20B9'} {price}</h5>
                            <p className='text-xl'>(inclusive of all taxes)</p>
                        </div>
                        <div className="quantity-section">
                            <div className="quantity-button-group flex flex-col gap-2 md:w-4/6">
                                <Dropdown
                                    options={product.weightPrice?.map(item => item.weight.value)}
                                    selected={weight}
                                    onSelect={handleWeightChange}
                                />
                                <QuantitySelector
                                    quantity={quantity}
                                    onQuantityChange={handleQuantityChange}
                                />
                                <button
                                    className="add-to-cart-button bg-[#016533] text-white font-bold rounded-lg py-2 mt-2"
                                    onClick={handleAddToCart}
                                >
                                    ADD TO CART
                                </button>
                                <button
                                    className="add-to-cart-button bg-[#016533] text-white font-bold rounded-lg py-2 mt-2"
                                    onClick={handleBuyNow}
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {/* <div className="description-section mx-auto my-12 w-[87%]">
                <h4 className='font-bold text-2xl mb-4'>This Kind low-GI rice is completely natural. </h4>
                <p className='text-xl w-full md:w-[50%]'>We pick only the finest 'RNR' variety (native to Telangana). Then, we slowly process it using our signature method, in extremely small batches, to perfection!</p>
            </div>
            <div className='flex flex-col md:w-[87%] mx-auto items-center md:items-start'>
                <h1 className='font-bold text-2xl mb-4'>What’s Inside</h1>
             <img src={assets.ShopBowl} alt='' className='w-[40%] md:w-[15%] h-auto my-4'/>
                 <p className='text-xl w-[80%] mt-4'>Ingredients - 100 percent natural low-gi rice</p>
            </div> */}
            <div className="ikn-switch-section w-[87%] my-12 mx-auto">
                <div className="btn-groups font-bold flex flex-row gap-2">
                    <button
                        className={`p-2 w-full lg:w-[15%]  rounded-lg text-xl ${currentContent.title === 'Ingredients' ? 'bg-[#016533] text-[#F2E098]' : 'bg-[#F2E098] text-black'
                            }`}
                        onClick={() => handleButtonClick('ingredients')}
                    >
                        Ingredients
                    </button>
                    <button
                        className={`p-2 w-full lg:w-[15%]  rounded-lg text-xl ${currentContent.title === 'Product details' ? 'bg-[#016533] text-[#F2E098]' : 'bg-[#F2E098] text-black'
                            }`}
                        onClick={() => handleButtonClick('keyFeatures')}
                    >
                        Product details
                    </button>
                    <button
                        className={`p-2 w-full lg:w-[15%] rounded-lg text-xl ${currentContent.title === 'Nutritional Benefits' ? 'bg-[#016533] text-[#F2E098]' : 'bg-[#F2E098] text-black'}`}
                        onClick={() => handleButtonClick('nutrition')}
                    >
                        Nutrition
                    </button>
                </div>

                <div className="ikn-content">
                    <h2 className="font-bold text-3xl my-4">{currentContent.title}</h2>
                    <p className="text-xl my-4 lg:w-2/3">{currentContent.description}</p>

                    {/* Benefits List */}
                    <ul className="list-disc ml-4 text-xl mb-4">
                        {currentContent.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    {currentContent.facts && (
                        <div className="w-1/3">
                            <h2 className="font-bold text-3xl my-4">{currentContent.facts.title}</h2>
                            <ul className="list-disc ml-4 text-xl mb-4">
                                {Object.entries(currentContent.facts).map(([key, value], index) => {
                                    if (key === 'title') return null;

                                    // Calculate the length of the longest string (key + value)
                                    let longestLength = Math.max(key.length + value.length, 10); // Minimum of 10 dots

                                    // Generate dots based on the longest length
                                    let dots = '.'.repeat(longestLength - key.length - value.length + 10);

                                    return (
                                        <li key={index} className="flex">
                                            <span>{key}</span>
                                            <span>{dots}</span>
                                            <span>{value}</span>
                                        </li>
                                    );
                                })}

                            </ul>
                        </div>
                    )}


                </div>
            </div>
            {/* <div className="review-section w-[87%] my-12 mx-auto">
                <h2 className="font-bold text-3xl my-4">Reviews</h2>
                <div className="reviews-container flex flex-col gap-7">
                    <div className="review flex flex-col gap-2">
                        <div className="star-icons">
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                        </div>
                        <div className="name-image-container flex flex-row gap-2 items-center">
                            <img src={assets.profileImg} className='w-10' alt="" />
                            <h4 className='text-2xl font-bold'>Asha</h4>
                        </div>
                        <h4 className="comment text-xl font-bold">
                            Very Nice
                        </h4>
                        <p>Reviewed in Chennai 26 July 2024</p>
                    </div>
                    <div className="review flex flex-col gap-2">
                        <div className="star-icons">
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "15px" }} />
                        </div>
                        <div className="name-image-container flex flex-row gap-2 items-center">
                            <img src={assets.profileImg} className='w-10' alt="" />
                            <h4 className='text-2xl font-bold'>Asha</h4>
                        </div>
                        <h4 className="comment text-xl font-bold">
                            Very Nice
                        </h4>
                        <p>Reviewed in Chennai 26 July 2024</p>
                    </div>
                </div>
            </div> */}

            {/* <div className='faq-section w-[87%] my-12 mx-auto bg-[#016533] text-white rounded-2xl p-4'>
                <h1 className='text-center font-bold text-2xl'>Got any Questions</h1>
                <p className='text-center underline italic'>Let's dive in!</p>
                <div className="faq-inner-container bg-inherit text-black  rounded-2xl">
                    <div className='mt-8'>
                        {accordions.map((accordion) => (
                            <Accordion
                                key={accordion.key}
                                title={accordion.title}
                                data={accordion.data}
                                isOpen={accordion.isOpen}
                                toggleAccordion={() => toggleAccordion(accordion.key)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="comparison-seciton w-[87%] my-12 mx-auto bg-[#016533] text-white rounded-2xl p-4">
                <h1 className='text-center font-bold text-2xl'>Comparison of Low GI Rice vs. Normal Rice</h1>
                <div className="inner-c-section flex flex-col gap-4 md:gap-1 md:flex-row p-2 text-center pt-16">
                    <div className="c-column-1 flex flex-col items-center gap-2 flex-1">
                        <div className="c-image-container w-[50%] h-[50%] mb-12">
                            <img className='aspect-square bg-contain h-full' src={assets.LowGiRice} alt="" />
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Gi Score below 55
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Helps maintain stable blood sugar levels.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            High in fiber, supporting better digestion.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Keeps you fuller for longer, aiding in weight control.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Can help reduce the risk of heart disease.
                        </div>
                    </div>
                    <h1 className='font-bold text-8xl flex-[0]'>VS</h1>
                    <div className="c-column-1 flex flex-col items-center gap-2 flex-1">
                        <div className="c-image-container w-[50%] h-[50%] mb-12">
                            <img className='aspect-square bg-contain h-full' src={assets.normalRice} alt="" />
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Gi Score below 55
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Helps maintain stable blood sugar levels.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            High in fiber, supporting better digestion.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Keeps you fuller for longer, aiding in weight control.
                        </div>
                        <div className="point-tab p-4 rounded-xl bg-white text-black w-2/3">
                            Can help reduce the risk of heart disease.
                        </div>
                    </div>
                </div>
            </div> */}
        </section>
    )
}

export default Product