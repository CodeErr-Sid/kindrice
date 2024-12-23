import { useLocation } from 'react-router-dom';
import './BlogArticle.css';
import React from 'react';

export default function BlogArticle() {
  const location = useLocation();
  const { coverImage, title, paragraphs, images, orderedList } = location.state || {};
  
  const getImageSrc = (src) => src || 'https://via.placeholder.com/300';

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Cover Image */}
      <div className="mb-8">
        <img 
          src={coverImage || 'https://via.placeholder.com/1200x600'} 
          alt="Blog Cover"
          className="w-full h-auto rounded-lg shadow-md object-cover"
          loading='lazy'
          srcSet={`${getImageSrc(coverImage)} 1200w, ${getImageSrc(coverImage)} 600w`}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>

      {/* Article Content */}
      <div className="mb-12">
        <h1 className="text-[2.50rem] font-bold mb-6 custom-green">{title || 'Blog Article Title'}</h1>
        {/* Render the Paragraphs */}
        {paragraphs?.map((paragraph, index) => (
          <p key={index} className="text-xl my-8">
            {paragraph}
          </p>
        ))}
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 articleimages my-10">
        {images?.map((image, index) => (
          <img 
            key={index}
            src={getImageSrc(image)}
            alt={`Article Image ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md object-cover"
            loading='lazy'
            srcSet={`${getImageSrc(image)} 800w, ${getImageSrc(image)} 400w`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
      </div>

        {/* Render the Ordered List */}
        <ol className="list-decimal ml-5 text-xl my-8">
          {orderedList?.map((item, index) => (
            <li key={index} className="font-bold my-8">
              {item.title}
              <p className="mb-4 font-normal mt-4">
                {item.content}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Images in a Row */}
     
    </section>
  );
}
