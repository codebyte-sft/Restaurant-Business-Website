document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      target.scrollIntoView({
        behavior: "smooth"
      });
      // Close mobile menu after clicking
      const navMenu = document.getElementById("nav-menu");
      const hamburger = document.querySelector(".hamburger");
      if(navMenu.classList.contains("active")){
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    }
  });
});

const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if(position < screen - 100){
      el.classList.add("show");
    }
  });

  const scrollTop = document.getElementById("scroll-top");
  if(window.pageYOffset > 300){
    scrollTop.style.display = "flex";
  } else {
    scrollTop.style.display = "none";
  }
});

// Hamburger Menu Toggle
function toggleMenu(){
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.querySelector(".hamburger");
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Menu Filter
function filterMenu(category){
  const items = document.querySelectorAll(".menu-card");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  items.forEach(item => {
    if(category === "all"){
      item.style.display = "block";
    }
    else if(item.classList.contains(category)){
      item.style.display = "block";
    }
    else{
      item.style.display = "none";
    }
  });
}

// Search Menu
function searchMenu(){
  const searchInput = document.getElementById("search-menu").value.toLowerCase();
  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach(card => {
    const itemName = card.getAttribute("data-name");
    if(itemName.includes(searchInput)){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Reset filter buttons
  if(searchInput === ""){
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(".filter-btn").classList.add("active");
  }
}

// Cart System
let cart = 0;
let cartItems = [];
let cartTotal = 0;

function addToCart(itemName, price){
    cart++;
    cartItems.push({name: itemName, price: price});
    cartTotal += price;
    
    updateCartUI();
    showNotification(`${itemName} added to cart!`);
}

function updateCartUI(){
    document.getElementById("cart-count").innerText = cart;
    document.getElementById("cart-total").innerText = `$${cartTotal}`;
    
    const cartItemsContainer = document.getElementById("cart-items");
    
    if(cartItems.length === 0){
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
}

function removeFromCart(index){
    cartTotal -= cartItems[index].price;
    cartItems.splice(index, 1);
    cart--;
    updateCartUI();
    showNotification("Item removed from cart");
}

function toggleCart(){
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("active");
}

function checkout(){
    if(cartItems.length === 0){
        showNotification("Your cart is empty!");
        return;
    }
    
    showNotification(`Checkout successful! Total: $${cartTotal}`);
    
    // Reset cart
    cartItems = [];
    cart = 0;
    cartTotal = 0;
    updateCartUI();
    toggleCart();
}

// Close cart when clicking outside
document.addEventListener("click", function(e){
    const cartModal = document.getElementById("cart-modal");
    const cartIcon = document.querySelector(".cart-icon");
    
    if(cartModal.classList.contains("active") && 
       !cartModal.contains(e.target) && 
       !cartIcon.contains(e.target)){
        toggleCart();
    }
});

function showNotification(message){
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6347;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

window.addEventListener("load", function(){
  document.getElementById("loader").style.display = "none";
});

function scrollToTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.getElementById("booking-form")?.addEventListener("submit", function(e){
  e.preventDefault();
  showNotification("Table booking request sent successfully!");
  this.reset();
});

document.getElementById("contact-form")?.addEventListener("submit", function(e){
  e.preventDefault();
  showNotification("Message sent successfully! We'll get back to you soon.");
  this.reset();
});
