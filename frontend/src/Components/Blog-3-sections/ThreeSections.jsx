import React from 'react';
import { assets } from '../../assets/assets';
import './Threesec.css'

export default function ThreeSections() {
  return (
    <div className="three-sections-container px-6 py-12 mx-auto max-w-5xl"> {/* Main container with padding and max-width */}
      
      {/* Section 1: Blog Introduction */}
      <div className="section1 flex flex-col md:flex-row items-center mb-8">
        <div className="hero-img w-[70%] mb-4 md:mb-0 md:mr-6">
          <img src={assets.contentCreators} alt='' className=" w-full h-auto object-cover"/>
        </div>
        <div className="right-heading  text-center md:text-left">
          <h2 className=" text-4xl md:text-5xl font-bold custom-green">Our Blog</h2>
        </div>
      </div>

      {/* Section 2: Latest Publications */}
      <div className="section2 mb-12 flex items-center justify-center flex-col">
        <h2 className="text-3xl font-bold mb-4 custom-green">Latest Publications</h2>
        <p className=" text-xl md:text-2xl w-[80%] text-center">
          Welcome to the <span className="font-bold custom-green">Kind Rice Blog!</span> Dive into the world of premium rice varieties, where we share expert tips on health, nutrition, delicious recipes, sustainable farming practices, and inspiring farmer stories.
        </p>
      </div>
  
      {/* Content Sections */}
      <div className="my-12">
        <h1 className="text-3xl font-bold custom-green mb-4">Who can eat Kind Rice?</h1>
        <p className="text-xl">
          Not only can diabetic individuals benefit from this low-GI rice, but it’s also suitable for all your family members, from kids to elders. Consuming 100g to 150g of this rice daily, paired with vegetables and without added sugars, can boost your energy levels and help make your day more productive.
        </p>
      </div>

      <div className="my-12">
        <h1 className="text-3xl font-bold custom-green mb-4">Why Kind Rice is the safest choice?</h1>
        <p className="text-xl">
          Kind Rice is the safest choice because it is free from GMOs, gluten, pesticides, and chemicals. Additionally, each batch of Kind Rice undergoes a rigorous cooking test to ensure that only the finest quality reaches you.
        </p>
      </div>

      <div className="my-12">
        <h1 className="text-3xl font-bold custom-green mb-4">How to Cook Kind Rice?</h1>
        <ol className="list-decimal pl-5 text-left text-xl">
          <li><span className="font-bold custom-green">Soak:</span> Place the rice in clean drinking water and let it soak for 30 to 40 minutes.</li>
          <li><span className="font-bold custom-green">Cook:</span> Drain the soaking water and cook the rice in an open pan for 20 to 25 minutes.</li>
          <li><span className="font-bold custom-green">Serve:</span> Your clean, tasty, and healthy rice is ready to serve.</li>
        </ol>
      </div>

      <div className="my-12">
        <h1 className="text-3xl font-bold custom-green mb-4">Farmer’s Story: Maarnadu</h1>
        <p className="text-xl">
          My name is Maarnadu, and I live with my family in the village of Arasakulam, where we farm and grow the RNR variety of paddy. Every four months, we work tirelessly in the fields, facing long days and difficult conditions. While many farmers in our village sell their harvest to local brokers, my family and I travel 20 kilometers to the Kind Rice Mill in Madurai.
          <br />
          <br />
          The journey isn’t easy, but it’s worth it. At Kind Rice, they’re transparent with weighing our paddy, ensuring we get an honest and fair price for our hard work. The mill is always clean and well-maintained, and the staff treat us with respect. I value this experience not just for the income, but for the fairness and integrity they show us.
          <br />
          <br />
          This is my story of how Kind Rice supports my family’s livelihood.
        </p>
      </div>
    </div>
  );
}
