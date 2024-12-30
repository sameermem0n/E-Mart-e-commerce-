document.addEventListener('DOMContentLoaded', () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Fetch product data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Find the product by ID
            const product = products.find(p => p.id === productId);

            if (product) {
                // Populate main product details
                document.getElementById('main-product-image').src = product.image;
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-price').textContent = `$${product.price}`;
                document.getElementById('product-category').textContent = `Category: ${product.category}`;
                document.getElementById('Specifications').textContent = `Specifications: ${product.Specifications || 'Not available'}`;
                document.getElementById('product-rating').innerHTML = `⭐ ${product.rating}`;

                // Load product images in carousel
                document.getElementById('image-1').src = product.images[0];
                document.getElementById('image-2').src = product.images[1];
                document.getElementById('image-3').src = product.images[2];

                // Add to cart functionality
                document.getElementById('add-to-cart').addEventListener('click', () => {
                    addToCart(product);
                    alert(`${product.name} has been added to your cart!`);
                    updateCartCount();
                });

                // Buy now functionality
                document.getElementById('buy-now').addEventListener('click', () => {
                    alert('Proceeding to checkout!');
                });

                // Load related products
                loadRelatedProducts(products, product.category);
            } else {
                alert('Product not found!');
            }
        })
        .catch(error => console.error('Error loading product data:', error));

     
 // Ensure the function is globally accessible
   window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("-translate-x-full");
  };
  

// Attach it to the window object if needed
window.toggleSidebar = toggleSidebar;

// Keep the DOMContentLoaded listener for other initialization
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open'); // Toggles the 'open' class
}
    

    // Toggle Products Functionality (Show More/Show Less)
    function toggleProducts() {
        const button = document.getElementById("toggleBtn");
        const products = document.querySelectorAll("#productGrid > div:nth-child(n+5)");

        if (products.length === 0) {
            console.warn("No products found to toggle.");
            return;
        }

        // Check visibility state
        const isHidden = products[0].classList.contains("hidden");

        // Toggle visibility
        products.forEach(product => product.classList.toggle("hidden"));

        // Update button text
        button.textContent = isHidden ? "Show Less" : "Show More";
    }

    // Attach toggle functionality to the button
    const toggleBtn = document.getElementById("toggleBtn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleProducts);
    }

    // Dropdown Selection
    function selectOption(country, icon) {
        document.getElementById(
            "dropdownButton"
        ).innerHTML = `${country} <img src="${icon}" class="inline-block w-4 h-4 ml-2" />`;
        toggleDropdown();
    }

    // Add product to cart and save to localStorage
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

// Add to cart
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);

    if (product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count in DOM
        updateCartCount();

        alert(`${product.name} has been added to your cart!`);
    } else {
        alert('Product not found!');
    }
};

// Update cart count for all elements with id="cart-count"
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Select all elements with id="cart-count"
    const cartCountElements = document.querySelectorAll('#cart-count');
    if (cartCountElements.length > 0) {
        cartCountElements.forEach(cartCount => {
            cartCount.textContent = totalItems; // Update each element
        });
    } else {
        console.error('Cart count elements not found in DOM');
    }
}


// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);


        
    // Load related products
    function loadRelatedProducts(products, category) {
        const relatedProductsContainer = document.getElementById('related-products');
        const related = products.filter(p => p.category === category).slice(0, 4);

        related.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('border', 'rounded', 'p-4', 'bg-white');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded mb-2">
                <h3 class="text-sm font-semibold">${product.name}</h3>
                <p class="text-sm text-green-500 font-semibold">$${product.specifications}</p>
                <p class="text-sm text-green-500 font-semibold">$${product.price}</p>
            `;

            productCard.addEventListener('click', () => {
                window.location.href = `product-details.html?id=${product.id}`;
            });

            relatedProductsContainer.appendChild(productCard);
        });
    }

    // Initial cart count update
    updateCartCount();
});
