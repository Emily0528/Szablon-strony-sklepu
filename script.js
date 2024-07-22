//
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showImage(index) {
  carouselItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

document.getElementById("prev").addEventListener("click", () => {
  currentIndex =
    currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
  showImage(currentIndex);
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex =
    currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
  showImage(currentIndex);
});

setInterval(() => {
  currentIndex =
    currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
  showImage(currentIndex);
}, 5000);

//text z lewej
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  const showItem = (index) => {
    items.forEach((item, i) => {
      item.classList.remove("active");
      if (i === index) {
        item.classList.add("active");
        const textContent = item.querySelector(".carousel-text-content");
        textContent.style.animation = "none"; // resetowanie animacji
        setTimeout(() => {
          textContent.style.animation = ""; // ponowne zastosowanie animacji
        }, 10); // opoznienie
      }
    });
  };

  document.getElementById("prev").addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    showItem(currentIndex);
  });

  document.getElementById("next").addEventListener("click", () => {
    currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    showItem(currentIndex);
  });

  showItem(currentIndex);
});

//Wyszukiwarka
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();
    const searchItems = document.querySelectorAll(".product");

    searchItems.forEach((item) => {
      const text = item.querySelector(".search-item").textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
});

/* Koszyk */
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = button.closest(".product");
      const productName = product.querySelector(".search-item").textContent;
      const productPrice = product.querySelector("h2").textContent;
      const productImage = product.querySelector("img").src;

      const cartItem = {
        name: productName,
        price: productPrice,
        image: productImage,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(
        (item) => item.name === cartItem.name
      );

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity =
          (cart[existingItemIndex].quantity || 1) + 1;
      } else {
        cartItem.quantity = 1;
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    });
  });

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    document.getElementById("cart-count").textContent = itemCount;
  }

  updateCartCount();
});
