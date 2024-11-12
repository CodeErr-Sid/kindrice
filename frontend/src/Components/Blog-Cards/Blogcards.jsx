import React from 'react';
import { Link } from 'react-router-dom';
import './Blogcards.css';
import { assets } from '../../assets/assets';

export default function Blogcards() {
  return (
    <section className='blogcards-section'>
      <div className='blogcards-container'>
        <div className="left-con">
          <div className='blogcards-card-left-up'>
            <Link
              to="/blog-article"
              state={{
                coverImage: assets.cover1,
                title: 'Who can eat Kind Rice?',
                paragraphs: [
                  "Kind Rice isn’t just for individuals managing diabetes — it’s a nutritious option for the entire family. Thanks to its low glycemic index (GI), this rice gradually releases energy into the bloodstream, making it a fantastic choice for anyone looking to maintain steady energy levels throughout the day.",
                ],
                orderedList: [
                  {
                    title: 'Ideal for Diabetics and Those Managing Blood Sugar',
                    content: 'With its low-GI properties, Kind Rice helps prevent rapid spikes in blood sugar, which is especially beneficial for diabetics or those at risk of developing diabetes. By incorporating this rice into your diet, you can enjoy meals without worrying about sudden blood sugar fluctuations.',
                  },
                  {
                    title: 'Suitable for Children',
                    content: 'Growing children need balanced nutrition, and Kind Rice offers a healthy source of complex carbohydrates. Its slow-release energy ensures that kids stay energized and focused, whether for school or play. When paired with vegetables and lean proteins, Kind Rice can become an essential part of a balanced diet that supports their growth and development.',
                  },
                  {
                    title: 'A Great Option for Adults and Active Individuals',
                    content: 'For adults and those with active lifestyles, Kind Rice is an excellent choice to fuel daily activities. It provides sustained energy, which can enhance productivity and focus throughout the day. Whether you’re working, exercising, or managing a busy household, consuming 100 to 150 grams of this rice daily, along with a well-rounded meal, can help maintain optimal energy levels.',
                  },
                  {
                    title: 'Perfect for Seniors',
                    content: 'Older adults often face challenges with digestion or maintaining stable energy levels. Kind Rice is easy to digest and gentle on the stomach while providing long-lasting energy without overwhelming the system. This makes it a great option for seniors looking to keep their nutrition in check without compromising taste or health.',
                  },
                  {
                    title: 'A Daily Portion for Health',
                    content: "Consuming about 100g to 150g of Kind Rice daily, paired with vegetables, lean proteins, and without added sugars, can support your overall well-being. It’s an excellent way to ensure you're nourishing your body with a healthy, low-GI carbohydrate that helps you stay productive, energized, and satisfied throughout the day.",

                  },
                ],
                images: [
                  assets.krice1,
                  assets.krice2,
                  assets.krice3,
                  assets.krice4
                ]
              }}
              className="card-one"
            >
              <div className="card-one-image">
                <img src={assets.cover1} alt='Breakfast Rice pudding' />
                <h2>Most Popular</h2>
              </div>
              <div className="card-content-container">
                <h3>Who can eat Kind Rice?</h3>
                <p>Diabetics - Families - Individuals
                </p>
              </div>
            </Link>
            <Link
              to="/blog-article"
              state={{
                coverImage: assets.cover2,
                title: 'Why Kind Rice is the safest choice?',
                paragraphs: [
                  "Kind Rice stands out as one of the safest options for your family’s meals, and here’s why:",
                ],
                orderedList: [
                  {
                    title: 'Free from GMOs',
                    content: 'Kind Rice is completely non-GMO, meaning it hasn’t been genetically modified in any way. You can enjoy it knowing that it’s naturally grown, preserving its original nutritional value without any genetic alterations that could potentially affect your health.',
                  },
                  {
                    title: 'Gluten-Free for Better Digestibility',
                    content: 'For those with gluten sensitivities or celiac disease, Kind Rice is an excellent choice. It’s 100% gluten-free, making it safe for individuals who need to avoid gluten, while also being easy on the digestive system for everyone else.',
                  },

                  {
                    title: 'No Pesticides or Harmful Chemicals',
                    content: 'We take great care in ensuring that Kind Rice is grown without the use of harmful pesticides or chemicals. This means you can trust that it’s free from the residues often found in conventionally grown crops, making it a cleaner, healthier option for you and your loved ones.',
                  },
                  {
                    title: 'Rigorously Tested for Quality',
                    content: "Each batch of Kind Rice undergoes a thorough cooking test before it reaches your kitchen. This quality control process ensures that only the best grains, in terms of both texture and taste, are packaged and delivered to you. We prioritize both safety and quality in every step of production.",

                  },
                  {
                    title: '5. A Pure and Natural Choice',
                    content: 'With no artificial additives or chemicals involved, Kind Rice is as close to nature as it gets. You can confidently serve it to your family, knowing that it’s pure, safe, and packed with natural goodness.',
                  },
                ],
                images: [
                  assets.whyrice1,
                  assets.whyrice2,
                  assets.whyrice3,
                  assets.whyrice4,
                ]
              }}
              className='blogcards-card-left-down'
            >
              <div className="card-one">
                <div className="card-one-image">
                  <img src={assets.cover2} alt='' />
                </div>
                <div className="card-content-container">
                  <h3>Why Kind Rice is the safest choice?</h3>
                  <p>Gluten-Free - No Pesticides - 210 Lab tests </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="right-con">
          <div className='blogcards-card-right-up'>
            <Link
              to="/blog-article"
              state={{
                coverImage: assets.cover3,
                title: 'How to Cook Kind Rice for the Perfect Meal ?',
                paragraphs: [
                  "",
                ],
                orderedList: [
                  {
                    title: 'Soak for Enhanced Texture',
                    content: 'Begin by thoroughly rinsing the rice under clean drinking water to remove any surface starch. Then, transfer the rice to a bowl and submerge it in fresh water. Allow it to soak for 30 to 40 minutes. This soaking step helps the rice grains absorb water, ensuring a softer and fluffier texture once cooked.',
                  },
                  {
                    title: 'Cook to Perfection',
                    content: 'After soaking, drain the water completely. In a pan, add fresh water in proportion to the rice (usually 1½ to 2 cups of water for every cup of rice). Bring the water to a gentle boil on medium heat. Once boiling, reduce the heat to low and let the rice simmer uncovered for 20 to 25 minutes. Stir occasionally to prevent sticking, and check the texture toward the end of the cooking time. You’re aiming for grains that are tender but not mushy.',
                  },

                  {
                    title: 'Serve and Enjoy',
                    content: 'Once the rice is fully cooked, drain any excess water if needed. Let the rice sit for a few minutes to settle before fluffing it gently with a fork. Now, your Kind Rice is ready to be served — clean, healthy, and delicious. Perfect as a side dish or the base for your favorite meals',
                  },
                ],
                images: [
                  assets.cook1,
                  assets.cook2,
                  assets.cook3,
                  assets.cook4,
                ]
              }}
              className="card-one2"
            >
              <div className="card-one-image">
                <img src={assets.cover3} alt='15-minute Low GI Fried Rice' />
              </div>
              <div className="card-content-container">
                <h3>How to Cook Kind Rice for the Perfect Meal ?</h3>
                <p>Preparation - Cooking Instructions - Serving Tips</p>
              </div>
            </Link>
            <Link
              to="/blog-article"
              state={{
                coverImage: assets.maarnadu,
                title: 'Farmer’s Story : Maarnadu',
                paragraphs: [
                  "My name is Maarnadu, and I live with my family in the village of Arasakulam, where we farm and grow the RNR variety of paddy. Every four months, we work tirelessly in the fields, facing long days and difficult conditions. While many farmers in our village sell their harvest to local brokers, my family and I travel 20 kilometers to the Kind Rice Mill in Madurai.",
                  "The journey isn’t easy, but it’s worth it. At Kind Rice, they’re transparent with weighing our paddy, ensuring we get an honest and fair price for our hard work. The mill is always clean and well-maintained, and the staff treat us with respect. I value this experience not just for the income, but for the fairness and integrity they show us.",
                  "This is my story of how Kind Rice supports my family’s livelihood.",
                ],

                images: [
                  assets.farmer1,
                  assets.farmer2,
                  assets.farmer3,
                  assets.farmer4,
                ]
              }}
              className='blogcards-card-right-down'
            >
              <div className="card-one2">
                <div className="card-one-image">
                  <img
                    src={assets.maarnadu}
                    alt=''
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />

                  <h2>Most Popular</h2>
                </div>
                <div className="card-content-container">
                  <h3>Farmer’s Story : Maarnadu</h3>
                  <p>Farmer's Journey - Agricultural Heritage - Sustainable Farming
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
