import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Accordion from "../Accordion/Accordion"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../api/cartapi';

const Product = ({ productId }) => {

    const { isLoggedIn, idToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [weight, setWeight] = useState(1);

    const handleBuyNow = () => {
        if (isLoggedIn) {
            console.log("yes you can buy this product")
        }
        else {
            navigate("/")
        }
    }

    const handleAddToCart = async () => {

            if (isLoggedIn) {
                const data = await addToCart(productId, quantity, weight, idToken);
                console.log(data);
            } else {
                navigate("/login")
            }
    }


    const productData = {
        "ingredients": {
            "title": "Ingredients",
            "content": [
                "100% low-GI rice"
            ]
        },
        "keyFeatures": {
            "title": "Key Features",
            "content": [
                "Paddy Variety: Indian-RNR",
                "Processing Method: Boiled",
                "Age: 6-12 months",
                "Cooking Time: 15-20 minutes",
                "Grain Size: Medium and short",
                "Best Cooking Methods: Open pan, cooker",
                "Location: India",
                "Recommended For: White rice, variety rice, thali, meals",
                "Taste Notes: Earthy",
                "Texture: Soft and tender",
                "Cooked Rice Color: White"
            ]
        },
        "nutritions": {
            "title": "Nutritional Benefits",
            "content": [
                "Rich in protein, essential for muscle repair and growth.",
                "High in fiber, promoting digestive health and satiety.",
                "Packed with essential vitamins and minerals for overall well-being.",
                "Aids in detoxification and the elimination of toxins.",
                "Provides a feeling of fullness and satisfaction."
            ]
        }
    }
    const [accordions, setAccordion] = useState([
        {
            key: 1,
            title: 'How do I cook Kind Low GI Rice?',
            data: `Cooking Kind Low GI Rice is straightforward. First, rinse the rice under cold water until the water runs clear. Use a ratio of 1 cup of rice to 2 cups of water or broth. Bring it to a boil, reduce the heat to low, cover, and simmer for 40-45 minutes or until the water is absorbed.`,
            isOpen: false
        },
        {
            key: 2,
            title: 'What recipes are best suited for Kind Low GI Rice?',
            data: `Kind Low GI Rice is versatile and pairs well with a variety of dishes. It's great for stir-fries, curries, salads, and as a side dish with grilled meats or vegetables. You can also use it in rice bowls, pilafs, and as a base for hearty soups.`,
            isOpen: false
        },
        {
            key: 3,
            title: 'Do I need to soak Kind Low GI Rice before cooking?',
            data: `Soaking Kind Low GI Rice is optional. While soaking can reduce cooking time slightly and make the grains fluffier, it's not necessary. If you choose to soak it, 30 minutes should be sufficient.`,
            isOpen: false
        },
        {
            key: 4,
            title: 'What is the recommended ratio for cooking Kind Low GI Rice?',
            data: `The recommended ratio for cooking Kind Low GI Rice is 1 cup of rice to 2 cups of water or broth. This ratio ensures the rice cooks evenly and absorbs the right amount of liquid.`,
            isOpen: false
        },
        {
            key: 5,
            title: 'How should I store Kind Low GI Rice?',
            data: `Store Kind Low GI Rice in an airtight container in a cool, dry place. If you want to keep it fresh for longer, you can store it in the refrigerator or freezer.`,
            isOpen: false
        },
        {
            key: 6,
            title: 'Can I boil Kind Low GI Rice, or is it best suited for other cooking methods?',
            data: `Yes, you can boil Kind Low GI Rice. It's suitable for boiling, steaming, or cooking in a rice cooker. The texture will remain consistent across different methods.`,
            isOpen: false
        },
        {
            key: 7,
            title: 'Is Kind Low GI Rice organic?',
            data: `Kind Low GI Rice is not necessarily organic, but it's specifically processed to maintain a low glycemic index, making it a healthier choice. Check the packaging to see if a specific batch is organic.`,
            isOpen: false
        },
        {
            key: 8,
            title: 'Does Kind Low GI Rice help with weight management?',
            data: `Yes, Kind Low GI Rice can support weight management due to its low glycemic index. It helps regulate blood sugar levels and provides longer-lasting energy, which can reduce cravings and overeating.`,
            isOpen: false
        },
        {
            key: 9,
            title: 'How does buying Kind Low GI Rice empower the community?',
            data: `Buying Kind Low GI Rice supports farmers and local communities by promoting sustainable farming practices. It also helps to create job opportunities and improve the livelihoods of those involved in its production.`,
            isOpen: false
        },
        {
            key: 10,
            title: 'How does Kind Low GI Rice support the environment?',
            data: `Kind Low GI Rice is often produced using environmentally friendly farming practices that reduce water usage and chemical inputs. This sustainable approach helps protect natural resources and promotes biodiversity.`,
            isOpen: false
        },
        {
            key: 11,
            title: 'What makes Kind Low GI Rice healthy?',
            data: `Kind Low GI Rice is considered healthy because it has a low glycemic index, meaning it causes a slower rise in blood sugar levels. It's also high in fiber and nutrients, making it a good choice for balanced diets.`,
            isOpen: false
        },

    ]);

    const toggleAccordion = (accordionkey) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

        setAccordion(updatedAccordions);
    };


    const [selectedImage, setSelectedImage] = useState(assets.product1);
    const [currentContent, setCurrentContent] = useState(productData["keyFeatures"]);

    const handleButtonClick = (section) => {
        setCurrentContent(productData[section]);
    };



    const selectImage = (image) => {
        setSelectedImage(image);
    };

    return (
        <section>
            <div className="product-section">
                <div className="product-image-container">
                    <div className="p-img-group">
                        <img src={assets.product1} alt="" onClick={() => selectImage(assets.product1)} />
                        <img src={assets.product2} alt="" onClick={() => selectImage(assets.product2)} />
                        <img src={assets.product3} alt="" onClick={() => selectImage(assets.product3)} />
                        <img src={assets.product4} alt="" onClick={() => selectImage(assets.product4)} />
                        <img src={assets.product5} alt="" onClick={() => selectImage(assets.product5)} />
                    </div>
                    <div className="p-img">
                        <img src={selectedImage} alt="Selected Product" />
                    </div>
                </div>
                <div className="product-content flex flex-col justify-between">
                    <h4 className="product-name text-4xl font-extrabold">Kind Low-Gi Rice</h4>
                    <div className="rating flex flex-row gap-3 items-center">
                        <div className="star-icons">
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", fontSize: "20px" }} />
                        </div>
                        <div className="rating-number text-xl">4,345</div>
                    </div>
                    <h5 className="price text-3xl font-extrabold text-[#016533]">$549.99</h5>
                    <div className="quantity-section">
  <div className="quantity-button-group flex flex-col gap-2 md:w-4/6">

    <div className="quantity-button flex items-center justify-between border-2 border-[#016533] rounded-lg px-4 py-2">
      <span className="text-[#016533] font-bold">1 KG</span>
      <FontAwesomeIcon icon={faCaretDown} style={{ color: "#016533" }} />
    </div>
    
    <div className="quantity-button flex items-center justify-between border-2 border-[#016533] rounded-lg px-4 py-2">
      <span className="text-[#016533] font-bold">QUANTITY - 1 BAG</span>
      <FontAwesomeIcon icon={faCaretDown} style={{ color: "#016533" }} />
    </div>
   
    <button className="add-to-cart-button bg-[#016533] text-white font-bold rounded-lg py-2 mt-2">
      ADD TO CART
    </button>
  </div>
</div>

                </div>
            </div>
            <div className="description-section mx-auto my-12 w-[87%]">
                <h4 className='font-bold text-2xl mb-4'>This Kind low-GI rice is completely natural. </h4>
                <p className='text-xl w-full md:w-[50%]'>We pick only the finest 'RNR' variety (native to Telangana). Then, we slowly process it using our signature method, in extremely small batches, to perfection!</p>
            </div>
            <div className='flex flex-col md:w-[87%] mx-auto items-center md:items-start'>
                <h1 className='font-bold text-2xl mb-4'>What’s Inside</h1>
             <img src={assets.ShopBowl} alt='' className='w-[40%] md:w-[15%] h-auto my-4'/>
                 <p className='text-xl w-[80%] mt-4'>Ingredients - 100 percent natural low-gi rice</p>
            </div>
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
                        className={`p-2 w-full lg:w-[15%]  rounded-lg text-xl ${currentContent.title === 'Key Features' ? 'bg-[#016533] text-[#F2E098]' : 'bg-[#F2E098] text-black'
                            }`}
                        onClick={() => handleButtonClick('keyFeatures')}
                    >
                        Key Features
                    </button>
                    <button
                        className={`p-2 w-full lg:w-[15%]  rounded-lg text-xl ${currentContent.title === 'Nutritional Benefits' ? 'bg-[#016533] text-[#F2E098]' : 'bg-[#F2E098] text-black'
                            }`}
                        onClick={() => handleButtonClick('nutritions')}
                    >
                        Nutritions
                    </button>
                </div>
                <div className="ikn-content">
                    <h2 className="font-bold text-3xl my-4">{currentContent.title}</h2>
                    <ul className='list-disc ml-4'>
                        {currentContent.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
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