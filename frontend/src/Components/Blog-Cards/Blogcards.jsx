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
      'Kind Rice is a nutritious option for anyone looking to improve their diet. Its lower glycemic index makes it ideal for those managing diabetes or aiming to control blood sugar levels. Additionally, its high fiber content supports weight management and healthy digestion, making it a great choice for those looking to maintain or lose weight.',
      'Vegetarians and vegans will find Kind Rice to be a valuable addition to their diet, offering essential nutrients without animal products. It is also gluten-free, making it suitable for people with celiac disease or gluten intolerance. Its versatility allows it to fit into a variety of recipes, from stir-fries to salads',
      'Families seeking a healthier grain for their meals will benefit from Kind Rice’s mild flavor and satisfying texture. It is a kid-friendly option that can be easily incorporated into daily meals, promoting overall health and wellness for all ages.'
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
                <p>Who can eat Kind Rice?</p>
                <p>Serves 6 • Cook 10 min</p>
              </div>
            </Link>
            <Link
  to="/blog-article"
  state={{
    coverImage: assets.cover2,
    title: 'Why Kind Rice is the safest choice?',
    paragraphs: [
      'Kind Rice stands out as a safe dietary choice for many reasons. Its low glycemic index makes it particularly suitable for individuals with diabetes or those aiming to manage blood sugar levels more effectively. By maintaining stable blood sugar levels, Kind Rice helps reduce the risk of glucose spikes and supports overall metabolic health. Additionally, its high fiber content aids in weight management and promotes healthy digestion, making it a prudent choice for those focused on maintaining a balanced diet and achieving their wellness goals..',
      'For those with dietary restrictions, Kind Rice offers a versatile and safe alternative. It is an excellent option for vegetarians and vegans, providing essential nutrients without relying on animal products. Moreover, Kind Rice is naturally gluten-free, making it a reliable choice for individuals with celiac disease or gluten intolerance. Its adaptability in various recipes, from stir-fries to salads, ensures that it can be easily incorporated into different meal plans without compromising on nutritional value or taste.',
      'Families looking for a wholesome grain that appeals to all ages will find Kind Rice to be a particularly safe and satisfying option. Its mild flavor and pleasing texture make it a kid-friendly choice that can be seamlessly integrated into everyday meals. By choosing Kind Rice, families can enjoy a nutritious grain that supports overall health and well-being, making it an ideal choice for creating balanced and health-conscious meals for everyone.'
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
                  <img src={assets.cover2} alt='Curried chicken and rice salad' />
                </div>
                <div className="card-content-container">
                  <p>Why Kind Rice is the safest choice?</p>
                  <p>Serves 6 • Cook 10 min</p>
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
    title: 'How to Cook Kind Rice?',
    paragraphs: [
      'Cooking Kind Rice is straightforward and ensures a nutritious addition to your meals. Start by rinsing the Kind Rice under cold water to remove excess starch and any impurities. This step helps in achieving a better texture and prevents the rice from becoming overly sticky. In a medium pot, add the rinsed rice and water in a ratio of 1 cup of rice to 2 cups of water. Bring the mixture to a boil over high heat.',
      'Once boiling, reduce the heat to low, cover the pot, and let it simmer for about 15-20 minutes. Avoid lifting the lid or stirring the rice during this time, as it can affect the cooking process. After the rice has absorbed all the water and is tender, remove the pot from heat and let it sit, covered, for an additional 5 minutes. Fluff the rice with a fork before serving to separate the grains and enhance its texture.',
      'Kind Rice can be served as a base for a variety of dishes. It pairs well with vegetables, proteins, and sauces, making it versatile for different cuisines. You can use it in stir-fries, grain bowls, or as a side dish to complement your favorite meals. Its mild flavor and nutritious profile make it a great addition to any diet, and experimenting with different herbs and spices can add a unique twist to your dishes.'
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
                <p>How to Cook Kind Rice?</p>
                <p>Serves 6 • Cook 10 min • Prep 5 min</p>
              </div>
            </Link>
            <Link
  to="/blog-article"
  state={{
    coverImage: assets.chickenCurry,
    title: 'Why Kind Rice is the safest choice?',
    paragraphs: [
      'Kind Rice stands out as a safe dietary choice for many reasons. Its low glycemic index makes it particularly suitable for individuals with diabetes or those aiming to manage blood sugar levels more effectively. By maintaining stable blood sugar levels, Kind Rice helps reduce the risk of glucose spikes and supports overall metabolic health. Additionally, its high fiber content aids in weight management and promotes healthy digestion, making it a prudent choice for those focused on maintaining a balanced diet and achieving their wellness goals..',
      'For those with dietary restrictions, Kind Rice offers a versatile and safe alternative. It is an excellent option for vegetarians and vegans, providing essential nutrients without relying on animal products. Moreover, Kind Rice is naturally gluten-free, making it a reliable choice for individuals with celiac disease or gluten intolerance. Its adaptability in various recipes, from stir-fries to salads, ensures that it can be easily incorporated into different meal plans without compromising on nutritional value or taste.',
      'Families looking for a wholesome grain that appeals to all ages will find Kind Rice to be a particularly safe and satisfying option. Its mild flavor and pleasing texture make it a kid-friendly choice that can be seamlessly integrated into everyday meals. By choosing Kind Rice, families can enjoy a nutritious grain that supports overall health and well-being, making it an ideal choice for creating balanced and health-conscious meals for everyone.'
    ],
    images: [
      assets.whyrice1,
      assets.whyrice2,
      assets.whyrice3,
    assets.whyrice4,
    ]
  }}
              className='blogcards-card-right-down'
            >
              <div className="card-one2">
                <div className="card-one-image">
                  <img src={assets.chickenCurry} alt='Chicken Curry with Low GI Rice' />
                  <h2>Most Popular</h2>
                </div>
                <div className="card-content-container">
                  <p>Chicken Curry with Low GI Rice</p>
                  <p>Serves 6 • Cook 15 min • Prep 5 min</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
