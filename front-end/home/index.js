const BASE_URL = "http://localhost:3001"

/**
 * A number, or a string containing a number.
 * @typedef {{
  * id: number
  * name: string
  * description: string
  * price: number
  * image: string
 * }} Product
*/

/**
 * A number, or a string containing a number.
 * @typedef {{
 *  id: number,
 *  name: string,
 *  products: Array<Product>
 * }} Category
 */

/**
 * @returns {Promise<Array<Category>>}
 */
async function getCategorias() {
  const response = await fetch(`${BASE_URL}/category`)
  const data = await response.json()
  return data
}

/**
 * @param {Category} category
 * @returns {string}
 */
function createCategoryHtml(category) {
  const products = category.products.map(createProductHtml).join('\n')

  const currentCategory = `
  <div
    class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
    <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
      <span class="block">${category.name}</span>
    </h1>
    <div
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
    ${products}
    </div>
  </div>
`

  return currentCategory
}

/**
 * @param {Product} product
 * @returns {string}
 */
function createProductHtml(product) {
  const currentProduct = `
  <a href="/produto/${product.id}" class="group">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <img
        src="${product.image}"
        alt="Hand holding black machined steel mechanical pencil with brass tip and top."
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <div class="flex mt-4 justify-between">
      <div>
        <h3 class="text-sm text-gray-700">${product.name}</h3>
        <p class="mt-1 text-sm text-gray-500">${product.description ?? ""}</p>
      </div>
      <p class="text-lg font-medium text-gray-900">R$ ${product.price.toFixed(2)}</p>
    </div>
  </a>
`

  return currentProduct
}

async function setupCategories() {
  const categories = await getCategorias()
  const categoriesHtml = categories.map(createCategoryHtml).join('')
  const container = document.getElementById('categories')

  if (!container) {
    throw new Error('Container not found')
  }
  
  console.log(categoriesHtml)

  container.innerHTML = categoriesHtml
}

setupCategories()
