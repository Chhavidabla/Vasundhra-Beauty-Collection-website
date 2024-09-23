// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display featured products
    fetch('/api/products/featured')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = createProductCard(product);
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching featured products:', error));

    // Search functionality
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input').value.trim();
            if (query) {
                window.location.href = `/products?search=${encodeURIComponent(query)}`;
            }
        });
    }

    // Add to Cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        }
    });
});

/**
 * Creates a product card element
 * @param {Object} product - The product object
 * @returns {HTMLElement} - The product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="/images/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <a href="/products/${product._id}" class="btn btn-secondary">View Details</a>
        <button class="btn btn-add-to-cart" data-id="${product._id}">Add to Cart</button>
    `;

    return card;
}

/**
 * Adds a product to the cart via AJAX
 * @param {string} productId - The ID of the product to add
 */
function addToCart(productId) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added to cart!');
            // Optionally, update the cart icon/count
            updateCartCount(data.cartCount);
        } else {
            alert('Failed to add product to cart.');
        }
    })
    .catch(error => console.error('Error adding to cart:', error));
}

/**
 * Updates the cart count in the header
 * @param {number} count - The new cart count
 */
function updateCartCount(count) {
    const cartLink = document.querySelector('.nav ul li a[href="/cart"]');
    if (cartLink) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${count})`;
    }
}




// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3 class="product-title">${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button class="btn btn-secondary">View Details</button>
            <button class="btn btn-add-to-cart">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Call the function to display products on page load
document.addEventListener('DOMContentLoaded', displayProducts);
// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Sample Products Data (Replace with actual data)
    const products = {
        men: [
            { name: "Men's Jacket", image: "jacket.jpeg", price: "₹2450", description: "Stylish winter jacket" },
            { name: "Men's Watch", image: "watch.jpeg", price: "₹3,895", description: "Elegant wristwatch" },
            { name: "Short Sleeve Blazer and Pants", image: "blazer and pants.jpeg", price: "₹3100", description: "Solid Colour Autumn Streetwear" },
            { name: "Men's Tshirt", image: "tshirt.jpeg", price: "₹359", description: "Cotton Fabric tshirt for men" }
        ],
        women: [
            { name: "Women's Dress", image: "dress.jpeg", price: "₹960", description: "Beautiful floral dress" },
            { name: "Women's Bag", image: "bag.jpeg", price: "₹1550", description: "Leather handbag" },
            { name: "Women's Top", image: "top.jpeg", price: "₹353", description: "Trendy Faishnable top" },
            { name: "Women's Pant", image: "pant.jpeg", price: "₹1039", description: "High Rise Straight Fit Pant" }
        ],
        beauty: [
            { name: "Lightweight Foundation", image: "foundation.jpeg", price: "₹500", description: "Sculpting & Hydrating Dewy Foundation" },
            { name: "Matte Lip", image: "lipstick.webp", price: "₹369", description: "Vasundhra beauty matte lip" },
            { name: "Eyeshadow", image: "eyeshadow.jpeg", price: "₹375", description: "Color Palette Shades for Eye Makeup " },
            { name: "Moisturizer", image: "moisturizer.jpeg", price: "₹350", description: "Deconstruct Hyaluronic Acid & Squalane Moisturizer" },
        ],
        homeLiving: [
            { name: "Decorative Lamp", image: "images/lamp.jpg", price: "$45", description: "Stylish table lamp" },
            { name: "Wall Art", image: "eyeliner.avif", price: "$60", description: "Abstract wall art" }
        ],
        footwear: [
            { name: "Men's Sneakers", image: "images/mens-sneakers.jpg", price: "$90", description: "Comfortable sneakers" },
            { name: "Women's Sandals", image: "images/womens-sandals.jpg", price: "$70", description: "Casual sandals" }
        ]
    };
      

    // Function to dynamically populate products
    function populateProducts(category, productList) {
        const productGrid = document.getElementById(`${category}-list`);
        productList.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    // Populate each category section with products
    populateProducts('men', products.men);
    populateProducts('women', products.women);
    populateProducts('beauty', products.beauty);
    populateProducts('homeLiving', products.homeLiving);
    populateProducts('footwear', products.footwear);
});
const homeLivingProducts = [
    {
      name: 'Sofa Set',
      description: 'Comfortable modern sofa set',
      price: '₹32999',
      image: 'sofaset.webp'
    },
    {
      name: 'Wall Art',
      description: 'Beautiful abstract wall art',
      price: '₹1500',
      image: 'wallart.jpeg'
    },
    {
        name: 'Decor item',
        description: 'Corsica Mayur Polyresin Peacock with Metal Ring Figurine',
        price: '₹2499',
        image: 'decor.jpeg'
    },
    {
        name: 'Wooden Wall Shelf',
        description: 'Wooden Wall Shelves for Living room',
        price: '₹499',
        image: 'woodenshelf.webp'
      }
  ];
  
  const footwearProducts = [
    {
      name: 'Sneakers',
      description: 'Comfortable running sneakers',
      price: '₹1030',
      image: 'sneakers.jpeg'
    },
    {
      name: 'Boots',
      description: 'Stylish leather boots',
      price: '₹3120',
      image: 'boots.webp'
    },
    {
        name: 'Women Heels',
        description: 'Fashion tail Casual heels',
        price: '₹799',
        image: 'heels.jpeg'
    },
    {
      name: 'Slipper',
      description: 'Stylish women slippers',
      price: '₹319',
      image: 'slipper.avif'
    }
  ];
  function renderProducts(productArray, containerId) {
    const container = document.getElementById(containerId);
    productArray.forEach(product => {
      const productHTML = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p class="price">${product.price}</p>
        </div>
      `;
      container.innerHTML += productHTML;
    });
  }
  
  // Call the function for each section
  renderProducts(homeLivingProducts, 'home-living-products');
  renderProducts(footwearProducts, 'footwear-products');
    

