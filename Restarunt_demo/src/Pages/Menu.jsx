import './Menu.css';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="menu-bg">
      <div className="menu-content">
        <h1>Foodies Spot</h1>
        <p>Free foods if you are under 10 years</p>
        <Link to="/order" className="menu-order-btn">Order Now</Link>
      </div>
    </div>
  )
}