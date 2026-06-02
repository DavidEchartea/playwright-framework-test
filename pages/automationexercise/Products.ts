import { Page, Locator, expect } from "@playwright/test";

export class Products {
    readonly page: Page
    readonly searchBar: Locator
    readonly searchBtn: Locator
    readonly items: Locator
    readonly productPrice: Locator
    readonly productAvailability: Locator
    readonly productCondition: Locator
    readonly productBrand: Locator
    readonly productQuantity: Locator   
    readonly addToCartBtn: Locator
    readonly viewCart: Locator

    constructor(page: Page){
        this.page = page
        this.searchBar = page.locator("#search_product")
        this.searchBtn = page.locator("#submit_search")
        this.items = page.locator("div[class='features_items']").locator("div[class='productinfo text-center']").locator("p")
        this.productPrice = page.locator('.product-information > span > span')
        this.productAvailability = page.locator(".product-information").locator("p").filter({hasText: 'Availability:'})
        this.productCondition = page.locator(".product-information").locator("p").filter({hasText: 'Condition:'})
        this.productBrand = page.locator(".product-information").locator("p").filter({hasText: 'Brand:'})
        this.productQuantity = page.locator("#quantity")
        this.addToCartBtn = page.getByRole("button", {name: 'Add to cart'})
        this.viewCart = page.locator('div[class="modal-body"]').locator('a[href="/view_cart"]')
    }

    productCategory(category: string){
            return this.page.locator(".category-products").getByRole("link", { name: category })
    }

    productSubCategory(subcategory: string){
        return this.page.locator(".panel-collapse").getByRole("link", { name: subcategory })
    }

    productName(name: string){
        return this.page.locator(".product-image-wrapper").filter({ hasText: name })
    }

    selectViewProduct(name: string){
        return this.productName(name).locator(".choose").getByRole("link", {name: 'View Product'}).click()
    }

    async filterByCategory(category: string, subcategory: string){
        await this.productCategory(category).click()
        await this.productSubCategory(subcategory).click()
    }

    async searchProduct(productName: string){
        await this.searchBar.clear()
        await this.searchBar.fill(productName)
        await this.searchBtn.click()
    }

    async getProductsText(): Promise<string[]> {
        return await this.items.allTextContents()
    }

    async modifyQuantity(quantity: string){
        await this.productQuantity.clear()
        await this.productQuantity.fill(quantity)
    }

    async clickAddToCart(){
        await this.addToCartBtn.click()
    }

    async clickViewCart(){
        await this.viewCart.click()
    }
    
}