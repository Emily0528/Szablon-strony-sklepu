document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.querySelector("#cart-table tbody");
  const emptyCartMessage = document.getElementById("empty-cart-message");

  if (cart.length === 0) {
    cartTableBody.style.display = "none";
    emptyCartMessage.style.display = "block";
  } else {
    cartTableBody.style.display = "table-row-group";
    emptyCartMessage.style.display = "none";
    cart.forEach((item, index) => {
      const row = document.createElement("tr");

      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.style.width = "50px";
      img.style.height = "50px";
      imgCell.appendChild(img);

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;

      const priceCell = document.createElement("td");
      priceCell.textContent = item.price;

      const quantityCell = document.createElement("td");
      quantityCell.textContent = item.quantity || 1;

      const removeCell = document.createElement("td");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Usuń";
      removeButton.addEventListener("click", function () {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
      removeCell.appendChild(removeButton);

      row.appendChild(imgCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(removeCell);

      cartTableBody.appendChild(row);
    });
  }
});
