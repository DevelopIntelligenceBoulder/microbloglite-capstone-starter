// Constants
const apiUrl = 'http://localhost:8081/api';
const productListContainer = document.getElementById('productListContainer');
const categoryContainer = document.getElementById('categoryContainer');
const categoryDropdown = document.getElementById('category');
const searchByDropdown = document.getElementById('searchBy');

// Event listener for search by dropdown change
searchByDropdown.addEventListener('change', () => {
  const selectedOption = searchByDropdown.value;
  if (selectedOption === 'category') {
    categoryContainer.style.display = 'block';
    loadCategories();
  } else {
    categoryContainer.style.display = 'none';
    loadProducts(selectedOption);
  }
});

// Event listener for category dropdown change
categoryDropdown.addEventListener('change', () => {
  console.log('Selected category value:', categoryDropdown.value);
  const categoryId = parseInt(categoryDropdown.options[categoryDropdown.selectedIndex].value);
  console.log('Parsed category ID:', categoryId);
  if (!isNaN(categoryId) && categoryId !== 'select') {
    loadProductsByCategory(categoryId);
    showCategoryIcon(categoryId);
  } else {
    hideCategoryIcon();
  }
});

// Function to show category icon based on category ID
function showCategoryIcon(categoryId) {
  const categoryIcon = document.getElementById('categoryIcon');
  categoryIcon.className = 'category-icon';
  categoryIcon.style.backgroundImage = `url('../images/${getCategoryImage(categoryId)}')`;
  console.log('Category icon visibility:', categoryIcon.style.visibility);
  console.log('Category icon background image URL:', categoryIcon.style.backgroundImage);
}

// Function to hide category icon
function hideCategoryIcon() {
  const categoryIcon = document.getElementById('categoryIcon');
  categoryIcon.className = 'hidden';
  console.log('Category icon visibility:', categoryIcon.style.visibility);
  console.log('Category icon background image URL:', categoryIcon.style.backgroundImage);
}


// Function to get the category image based on category ID
function getCategoryImage(categoryId) {
  switch (categoryId) {
    case 1:
      return 'beverage.png';
    case 2:
      return 'condiments.png';
    case 3:
      return 'confection.png';
    case 4:
      return 'dairy.png';
    case 5:
      return 'grain.png';
    case 6:
      return 'meat.png';
    case 7:
      return 'produce.png';
    case 8:
      return 'seafood.png';
  }
}



// Load all categories
function loadCategories() {
  fetch(`${apiUrl}/categories`)
    .then(response => response.json())
    .then(categories => {
      // Populate the category dropdown
      categoryDropdown.innerHTML = '<option value="select">Select one...</option>';
      categories.forEach(category => {
        categoryDropdown.innerHTML += `<option value="${category.categoryId}">${category.name}</option>`;
      });

      // Load all products initially
      loadProducts('viewAll');
    })
    .catch(error => console.error('Error:', error));
}

// Load products
function loadProducts(searchOption) {
  let url = `${apiUrl}/products`;

  if (searchOption === 'category') {
    const categoryId = parseInt(categoryDropdown.options[categoryDropdown.selectedIndex].value);
    console.log('Selected category ID:', categoryId);

    if (categoryId !== 'select') {
      url = `${apiUrl}/categories/${categoryId}/products`;
    }
  }

  console.log('API URL:', url);

  fetch(url)
    .then(response => response.json())
    .then(products => {
      // Filter out products without a name property
      products = products.filter(product => product.productName);

      // Sort products by name
      products.sort((a, b) => a.productName.localeCompare(b.productName));

      // Display products
      displayProducts(products);
    })
    .catch(error => console.error('Error:', error));
}

// Load products by category
function loadProductsByCategory(categoryId) {
  console.log('Category ID:', categoryId);
  const url = `${apiUrl}/categories/${categoryId}`;
  console.log('API URL:', url);
  fetch(url)
    .then(response => response.json())
    .then(products => {
      console.log('Fetched products:', products);

      // Filter out products without a name property
      const filteredProducts = products.filter(product => product.productName);

      // Sort products by name
      filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));

      // Display products
      displayProducts(filteredProducts);
    })
    .catch(error => console.error('Error:', error));
}


// Function to get the category name based on category ID
function getCategoryName(categoryId) {
  switch (categoryId) {
    case 1:
      return "Beverages";
    case 2:
      return "Condiments";
    case 3:
      return "Confections";
    case 4:
      return "Dairy Products";
    case 5:
      return "Grains/Cereals";
    case 6:
      return "Meat/Poultry";
    case 7:
      return "Produce";
    case 8:
      return "Seafood";
    default:
      return "";
  }
}

// Function to display products
function displayProducts(products) {
  var table = document.getElementById("productTable");
  var tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var row = tbody.insertRow(i);
    var productIdCell = row.insertCell(0);
    var productNameCell = row.insertCell(1);
    var unitPriceCell = row.insertCell(2);
    var unitsInStockCell = row.insertCell(3);
    var categoryCell = row.insertCell(4);

    productIdCell.innerHTML = products[i].productId;
    productNameCell.innerHTML = `<a href="details.html?id=${products[i].productId}">${products[i].productName}</a>`;
    unitPriceCell.innerHTML = products[i].unitPrice;
    unitsInStockCell.innerHTML = products[i].unitsInStock;
    categoryCell.innerHTML = getCategoryName(products[i].categoryId);
  }
}

// Load product details on page load
loadCategories();
loadProducts('viewAll');
