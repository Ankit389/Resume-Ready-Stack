

import { useState, useEffect } from "react";
import "./PaymentPlans.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 999,
    features: ["ATS Resume", "Cover Letter"],
    popular: false,
    best: false
  },
  {
    id: 2,
    name: "Professional Plan",
    price: 1999,
    features: ["ATS Resume", "Cover Letter", "Job Portal Optimization"],
    popular: true,
    best: false
  },
  {
    id: 3,
    name: "Premium Plan",
    price: 2999,
    features: ["ATS Resume", "Cover Letter", "Profile Optimization", "Portfolio"],
    popular: false,
    best: false
  },
  {
    id: 4,
    name: "Advanced Plan",
    price: 4999,
    features: [
      "ATS Resume",
      "Portfolio",
      "Website",
      "Cover Letter",
      "All Optimization",
      "Mentorship",
    ],
    popular: false,
    best: true
  },
];

export default function PaymentPlans() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Add to cart
  const addToCart = (plan: any) => {
    const exists = cart.find((item) => item.id === plan.id);
    
    if (!exists) {
      setCart([...cart, plan]);
      setShowCart(true);
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

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const gst = Math.round(subtotal * 0.18);
  const totalAfterDiscount = subtotal - discount;
  const total = totalAfterDiscount + gst;

  // Apply coupon
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (coupon.toUpperCase() === "SAVE20") {
      setDiscount(Math.round(subtotal * 0.2));
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  // Payment handler
  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Please select at least one plan");
      return;
    }

    setLoading(true);

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert("Payment system is loading. Please try again in a moment.");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_1234567890",
      amount: total * 100,
      currency: "INR",
      name: "Resume Ready Stack",
      description: `Purchase of ${cart.length} plan(s)`,
      handler: function (response: any) {
        console.log("Payment successful:", response);
        alert("Payment Successful 🎉");
        
        window.open(
          `https://wa.me/91XXXXXXXXXX?text=Hi, I have purchased plans for ₹${total}`,
          "_blank"
        );
        
        setLoading(false);
        setCart([]);
        setShowCart(false);
        setCoupon("");
        setDiscount(0);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#6366f1",
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        },
        escape: true,
        handleback: true
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response);
        alert("Payment Failed ❌ Please try again.");
        setLoading(false);
      });
    } catch (error) {
      console.error("Razorpay error:", error);
      alert("Payment system error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div id="payment-plans" className="container">
      <h1 className="title">Choose Your Plan</h1>

      {/* PLAN CARDS */}
      <div className="grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`card ${plan.popular ? 'popular' : ''} ${plan.best ? 'best' : ''}`}>
            {plan.popular && <div className="badge popular-badge">Most Popular</div>}
            {plan.best && <div className="badge best-badge">Best Value</div>}
            
            <h2>{plan.name}</h2>
            <p className="price">₹{plan.price}</p>
            
            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>

            <button
              className="btn"
              onClick={() => addToCart(plan)}
              disabled={cart.some((item) => item.id === plan.id)}
            >
              {cart.some((item) => item.id === plan.id) ? "In Cart ✓" : "Choose This Plan"}
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
                  <span className="item-price">₹{item.price}</span>
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
              <div className="price-row">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              
              {discount > 0 && (
                <div className="price-row discount">
                  <span>Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="price-row">
                <span>GST (18%):</span>
                <span>₹{gst}</span>
              </div>
              
              <div className="price-row total">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* COUPON SECTION */}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Coupon code"
                className="coupon-input"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="apply-btn" onClick={applyCoupon}>
                Apply
              </button>
            </div>

            <button 
              className="pay-btn" 
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
            >
              {loading ? "Processing..." : `Place Order - ₹${total}`}
            </button>
          </div>

          {/* RIGHT - SUGGESTIONS */}
          <div className="cart-right">
            <h3>We feel you must consider these</h3>
            <p className="suggest-desc">Add more services to get better value!</p>

            {plans.map((plan) => (
              <label key={plan.id} className="suggest-item">
                <input
                  type="checkbox"
                  checked={cart.some((i) => i.id === plan.id)}
                  onChange={() => toggleItem(plan)}
                />
                <div className="suggest-content">
                  <span className="suggest-name">{plan.name}</span>
                  <span className="suggest-price">₹{plan.price}</span>
                </div>
              </label>
            ))}

            <div className="savings-info">
              <p>💡 Save up to 20% with combo plans!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}