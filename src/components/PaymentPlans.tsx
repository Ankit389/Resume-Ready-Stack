

import { useState } from "react";
import "./PaymentPlans.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    id: 1,
    name: "Resume Audit",
    price: 0,
    features: ["Free Resume Review", "ATS Score Check", "Keyword Analysis", "Format Check"],
    popular: false,
    best: false,
    type: "free"
  },
  {
    id: 2,
    name: "ATS Optimization",
    price: 1999,
    features: ["ATS Resume", "Cover Letter", "Keyword Optimization", "Format Fix"],
    popular: true,
    best: false,
    type: "core"
  },
  {
    id: 3,
    name: "Profile Package",
    price: 2999,
    features: ["ATS Resume", "LinkedIn Profile", "Cover Letter", "Portfolio Setup"],
    popular: false,
    best: false,
    type: "premium"
  },
  {
    id: 4,
    name: "Complete Career",
    price: 4999,
    features: [
      "ATS Resume",
      "LinkedIn Profile", 
      "Portfolio Website",
      "Cover Letter",
      "Interview Prep",
      "Job Support",
    ],
    popular: false,
    best: true,
    type: "ultimate"
  },
];

export default function PaymentPlans() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Add to cart
  const addToCart = (plan: any) => {
    const exists = cart.find((item) => item.id === plan.id);
    
    if (!exists) {
      setCart([...cart, plan]);
      setShowCart(true);
      
      // Store selected plan for payment gateway
      localStorage.setItem('selectedPlan', plan.name);
      localStorage.setItem('planPrice', plan.price.toString());
    }
  };

  // Add/remove suggested
  const toggleItem = (plan: any) => {
    const exists = cart.find((item) => item.id === plan.id);

    if (exists) {
      setCart(cart.filter((item) => item.id !== plan.id));
    } else {
      setCart([...cart, plan]);
    }
  };

  // Remove from cart
  const removeFromCart = (planId: number) => {
    setCart(cart.filter((item) => item.id !== planId));
  };

  // Calculate totals (without GST and coupons as requested)
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  // Payment handler
  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Please select at least one plan");
      return;
    }

    // Free plan - redirect to payment gateway
    const freePlan = cart.find(item => item.price === 0);
    if (freePlan && cart.length === 1) {
      localStorage.setItem('selectedPlan', freePlan.name);
      localStorage.setItem('planPrice', '0');
      window.location.href = '/payment-gateway';
      return;
    }

    // For paid plans, redirect to payment gateway
    const selectedPlan = cart[0]; // Get first selected plan
    localStorage.setItem('selectedPlan', selectedPlan.name);
    localStorage.setItem('planPrice', selectedPlan.price.toString());
    window.location.href = '/payment-gateway';
  };

  return (
    <div id="payment-plans" className="container">
      <h1 className="title">Choose Your Service Plan</h1>
      <p className="subtitle">Professional resume services that get you interviews</p>

      {/* PLAN CARDS */}
      <div className="grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`card ${plan.popular ? 'popular' : ''} ${plan.best ? 'best' : ''} ${plan.type === 'free' ? 'free' : ''}`}>
            {plan.popular && <div className="badge popular-badge">Most Popular</div>}
            {plan.best && <div className="badge best-badge">Best Value</div>}
            {plan.type === 'free' && <div className="badge free-badge">FREE</div>}
            
            <h2>{plan.name}</h2>
            <p className="price">
              {plan.price === 0 ? 'FREE' : `₹${plan.price}`}
            </p>
            
            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>

            <button
              className={`btn ${plan.type === 'free' ? 'free-btn' : ''}`}
              onClick={() => addToCart(plan)}
              disabled={cart.some((item) => item.id === plan.id)}
            >
              {cart.some((item) => item.id === plan.id) ? 
                "In Cart ✓" : 
                plan.type === 'free' ? 
                "Get Free Review" : 
                "Choose This Plan"
              }
            </button>
          </div>
        ))}
      </div>

      {/* CART SECTION */}
      {showCart && (
        <div className="cart-container">
          
          {/* LEFT - ORDER SUMMARY */}
          <div className="cart-left">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    {item.price === 0 ? 'FREE' : `₹${item.price}`}
                  </span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="price-breakdown">
              <div className="price-row total">
                <span>Total:</span>
                <span>{subtotal === 0 ? 'FREE' : `₹${total}`}</span>
              </div>
            </div>

            <button 
              className="pay-btn" 
              onClick={handlePayment}
              disabled={cart.length === 0}
            >
              {subtotal === 0 ? 
               "Get Free Review" : 
               `Place Order - ₹${total}`
              }
            </button>
          </div>

          {/* RIGHT - SUGGESTIONS */}
          <div className="cart-right">
            <h3>Upgrade Your Results</h3>
            <p className="suggest-desc">Add more services for complete career transformation!</p>

            {plans.map((plan) => (
              <label key={plan.id} className="suggest-item">
                <input
                  type="checkbox"
                  checked={cart.some((i) => i.id === plan.id)}
                  onChange={() => toggleItem(plan)}
                />
                <div className="suggest-content">
                  <span className="suggest-name">{plan.name}</span>
                  <span className="suggest-price">
                    {plan.price === 0 ? 'FREE' : `₹${plan.price}`}
                  </span>
                </div>
              </label>
            ))}

            <div className="savings-info">
              <p>💡 95% of our clients get interview calls!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}