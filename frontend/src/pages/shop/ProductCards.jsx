import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RatingStarts from '../../components/RatingStarts';
import { addToCart } from '../../redux/features/cart/cartSlice.js';

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
  lg:grid-cols-4 gap-8'
    >
      {products.map((product, index) => (
        <div key={index} className='product__card'>
          <div className='relative'>
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt='product image'
                className='max-h-94 md:h-64 w-full
            object-cover hover:scale-105 transition-all duration-300'
              />
            </Link>
            <div className='hover:block absolute top-3 right-3'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <i
                  className='ri-shopping-cart-2-line bg-primary
                p-1.5 text-white hover:bg-primary-dark'
                ></i>
              </button>
            </div>
          </div>

          {/* product description */}
          <div className='product__card__content'>
            <h4>{product.name}</h4>
            <p>
              ${product.price} {product.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
            <RatingStarts rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
// 4:21:03