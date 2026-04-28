import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

test.beforeEach(async({page, homePage, signUpPage, credentials}) =>{
    await page.goto('/')
    await expect(homePage.home).toBeVisible()
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
})

test.afterEach(async ({page})=>{
    await page.close()
})