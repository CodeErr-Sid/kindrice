import { useLocation } from 'react-router-dom';
import './BlogArticle.css';

export default function BlogArticle() {
  const location = useLocation();
  const { coverImage, title, paragraphs, images, orderedList } = location.state || {};
  console.log(coverImage);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Cover Image */}
      <div className="mb-8">
        <img 
          src={coverImage || 'https://via.placeholder.com/1200x600'} 
          alt="Blog Cover"
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6 custom-green">{title || 'Blog Article Title'}</h1>
        {/* Render the Paragraphs */}
        {paragraphs?.map((paragraph, index) => (
          <p key={index} className="text-xl mb-4">
            {paragraph}
          </p>
        ))}

        {/* Render the Ordered List */}
        <ol className="list-decimal ml-5 text-xl">
          {orderedList?.map((item, index) => (
            <li key={index} className="font-bold mb-2">
              {item.title}
              <p className="mb-4 font-normal">
                {item.content}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Images in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 articleimages">
        {images?.map((image, index) => (
          <img 
            key={index}
            src={image || 'https://via.placeholder.com/300'}
            alt={`Article Image ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        ))}
      </div>
    </section>
  );
}
