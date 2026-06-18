import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

test.beforeEach(async({page, homePage, signUpPage, credentials}) =>{
    await page.goto('/')
    await expect(homePage.home).toBeVisible({timeout: 10000})
    await homePage.navigateLogin()
    await signUpPage.login(credentials.user, credentials.password)
})

test.describe("Search products scenarios", () =>{

    test("Search a single product", async({homePage, productsPage, testData}) =>{
        const product = testData.searchProduct.productName.toLowerCase()

        await homePage.navigateProducts()
        await productsPage.searchProduct(product)

        const products = await productsPage.getProductsText()
        
        const invalidProducts = products.filter(
            prod => !prod.toLowerCase().includes(product)
        )
        
        expect(invalidProducts, `Invalid products found for search "${product}": ${invalidProducts.join(", ")}`).toHaveLength(0)
    })

    test("Search multiple products", async ({homePage, productsPage, testData}) =>{
        await homePage.navigateProducts()
        for(const product of testData.searchProducts){
            await productsPage.searchProduct(product)
            const products = await productsPage.getProductsText()

            console.log("Result of the search for", product,": ","\n", products)

            const invalidProducts = products.filter(
                prod => !prod.toLowerCase().includes(product.toLowerCase())
            )

            expect(invalidProducts, `Invalid products found for search "${product}": ${invalidProducts.join(", ")}`).toHaveLength(0)
        }
        
    })

    test("Search product - not listed item", async ({homePage, productsPage, testData}) =>{
        const product = testData["searchProduct-Invalid"].productName
        await homePage.navigateProducts()
        await productsPage.searchProduct(product)

        const products = await productsPage.getProductsText()

        expect(products).toHaveLength(0)
    })

    test("Filter by category and view product details", async ({homePage, productsPage, testData}) =>{
        const categoryName = testData.filterByCategory.categoryName
        const subcategory = testData.filterByCategory.subCategoryName
        const productName = testData.filterByCategory.productName
        const price = productsPage.productPrice
        const availability = productsPage.productAvailability
        const condition =  productsPage.productCondition
        const brand =  productsPage.productBrand

        await homePage.navigateProducts()
        await productsPage.filterByCategory(categoryName, subcategory)

        const products = await productsPage.getProductsText()
        expect(products).not.toHaveLength(0)
        
        await productsPage.selectViewProduct(productName)

        console.log(await price.allTextContents(), await availability.allTextContents(), await condition.allTextContents(), await brand.allTextContents())
        await expect(price).toHaveText(/^Rs\. \d+$/)
        await expect(availability).not.toBeNull()
        await expect(condition).not.toBeNull()
        await expect(brand).not.toBeNull()

    })

    test("Add to cart from view product detail and custom quantity", async ({homePage, productsPage, cartPage, testData}) =>{
        const categoryName = testData.filterByCategory.categoryName
        const subcategory = testData.filterByCategory.subCategoryName
        const productName = testData.filterByCategory.productName
        const productQuantity = testData.filterByCategory.Quantity

        await homePage.navigateProducts()
        await productsPage.filterByCategory(categoryName, subcategory)

        const products = await productsPage.getProductsText()
        expect(products).not.toHaveLength(0)
        
        await productsPage.selectViewProduct(productName)
        await productsPage.modifyQuantity(productQuantity)
        await productsPage.clickAddToCart()
        await productsPage.clickViewCart()

        const cartProductName = await cartPage.itemDescription.allTextContents()
        const cartQuantity = await cartPage.itemQuantity.allTextContents()

        await expect(cartProductName).toContain(productName)
        await expect(cartQuantity[0]).toContain(productQuantity)

        await cartPage.deleteItem()
    })
})

test.afterEach(async ({page})=>{
    await page.close()
})