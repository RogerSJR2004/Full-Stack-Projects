import './Order.css';

export default function Menu() {
  return (
    <div className="order">
    <div className="order-container" style={{ maxWidth: '600px', margin: '40px auto', background: 'rgba(255,255,255,0.9)', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Order Your Favorite Food</h2>
      <ul className="order-list">
        {[
          { id: 1, name: "Margherita Pizza", price: 299, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
          { id: 2, name: "Veg Burger", price: 149, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
          { id: 3, name: "Pasta Alfredo", price: 249, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
          { id: 4, name: "Caesar Salad", price: 179, img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80" },
          { id: 5, name: "Chocolate Brownie", price: 99, img: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80" }
        ].map(product => (
          <li key={product.id} className="order-list-item">
            <img src={product.img} alt={product.name} className="order-product-img" />
            <div className="order-product-details">
              <h4 className="order-product-name">{product.name}</h4>
              <p className="order-product-price">₹{product.price}</p>
              <button className="order-btn add-to-cart">Add to Cart</button>
              <button className="order-btn buy-now">Buy Now</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
     
    </div>  
  )}