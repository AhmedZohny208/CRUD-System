var productName = document.getElementById('productName')
var productPrice = document.getElementById('productPrice')
var productCategory = document.getElementById('productCatgory')
var productDescription = document.getElementById('productDesc')
var myBtn = document.getElementById('myBtn')

var productsContainer
var currentIndex = 0

if (localStorage.getItem('productList') == null) {
  productsContainer = []
} else {
  productsContainer = JSON.parse(localStorage.getItem('productList'))
  displayProducts()
}

// CRUD Functions
function add() {
  var isProductNameValid = checkProductName(),
      isProductPriceValid = checkProductPrice(),
      isProductCategoryValid = checkProductCategory()

  var isFormValid = isProductNameValid && isProductPriceValid && isProductCategoryValid

  if (isFormValid) {
    if(myBtn.innerHTML == "Add Product") {
      addProduct()
    } else {
      addUpdate()
    }
  }
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  }

  productsContainer.push(product)
  localStorage.setItem('productList', JSON.stringify(productsContainer))
  console.log(productsContainer)
  displayProducts()
  clearForm()
  removeValidClass()
}

function deleteProduct(index) {
  productsContainer.splice(index, 1)
  localStorage.setItem('productList', JSON.stringify(productsContainer))
  displayProducts()
}

function updateProduct(index) {
  currentIndex = index
  productName.value = productsContainer[index].name
  productPrice.value = productsContainer[index].price
  productCategory.value = productsContainer[index].category
  productDescription.value = productsContainer[index].description

  myBtn.innerHTML = 'Update Product'
}

function addUpdate() {
  productsContainer[currentIndex].name = productName.value
  productsContainer[currentIndex].price = productPrice.value
  productsContainer[currentIndex].category = productCategory.value
  productsContainer[currentIndex].description = productDescription.value

  localStorage.setItem('productList', JSON.stringify(productsContainer))
  displayProducts()
  clearForm()
  removeValidClass()
  myBtn.innerHTML = 'Add Product'
}

// Search Products
function search(term) {
  var cartoona = ''
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      console.log('exists')
      cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].description}</td>
            <td>
                <button class="btn btn-warning" onclick="updateProduct(${i})">
                    update
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">
                    delete
                </button>
            </td>
        </tr>`
    } else {
      console.log('not exists')
    }
  }
  document.getElementById('tableBody').innerHTML = cartoona
}

// Clear Form Inputs
function clearForm() {
  productName.value = ''
  productPrice.value = ''
  productCategory.value = ''
  productDescription.value = ''
}

// Display Products
function displayProducts() {
  var cartoona = ''

  for (var i = 0; i < productsContainer.length; i++) {
    cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].description}</td>
            <td>
                <button class="btn btn-warning" onclick="updateProduct(${i})">update</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${i})"> 
                    delete
                </button>
            </td>
        </tr>`
  }

  document.getElementById('tableBody').innerHTML = cartoona
}

// Form Validation
function validationInputs() {
  if (
    productName.value != '' &&
    productPrice.value != '' &&
    productCategory.value != '' &&
    productDescription.value != ''
  ) {
    return true
  } else {
    return false
  }
}

function isRequired(value) {
  if (value === '') {
    return false
  } else {
    return true
  }
}

function isRepeatedProductName(productName) {
  for(var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name === productName) {
      return false
    }
  }
  return true
}
var x = isRepeatedProductName('iphone111')
console.log(x);

// Validate ProductName
function checkProductName() {
  var valid = false 
  var productNameVal = productName.value
  if (!isRequired(productNameVal)) {
    productName.classList.remove('is-valid')
    productName.classList.add('is-invalid')
    document.querySelector('div#productName').innerHTML = 'ProductName cannot be blank.'
  } else if (!isRepeatedProductName(productNameVal)) {
    productName.classList.remove('is-valid')
    productName.classList.add('is-invalid')
    document.querySelector('div#productName').innerHTML = 'This ProductName is already existing.'
  } else {
    productName.classList.remove('is-invalid')
    productName.classList.add('is-valid')
    valid = true
  }
  return valid
}

// Validate ProductPrice
function checkProductPrice() {
  var valid = false 
  var productPriceVal = productPrice.value
  if (!isRequired(productPriceVal)) {
    productPrice.classList.remove('is-valid')
    productPrice.classList.add('is-invalid')
    document.querySelector('div#productPrice').innerHTML = 'ProductPrice cannot be blank.'
  } else {
    productPrice.classList.remove('is-invalid')
    productPrice.classList.add('is-valid')
    valid = true
  }
  return valid
}

// Validate ProductCategory
function checkProductCategory() {
  var valid = false 
  var productCategoryVal = productCategory.value
  if (!isRequired(productCategoryVal)) {
    productCategory.classList.remove('is-valid')
    productCategory.classList.add('is-invalid')
    document.querySelector('div#productCategory').innerHTML = 'ProductCategory cannot be blank.'
  } else {
    productCategory.classList.remove('is-invalid')
    productCategory.classList.add('is-valid')
    valid = true
  }
  return valid
}

// Validate ProductDescription

// Remove Valid class
function removeValidClass() {
  productName.classList.remove('is-valid')
  productPrice.classList.remove('is-valid')
  productCategory.classList.remove('is-valid')
}

console.log(productsContainer)