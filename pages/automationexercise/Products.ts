import { Page, Locator, expect } from "@playwright/test";

export class Products {
    readonly page: Page
    readonly searchBar: Locator
    readonly searchBtn: Locator
    readonly items: Locator

    constructor(page: Page){
        this.page = page
        this.searchBar = page.locator("#search_product")
        this.searchBtn = page.locator("#submit_search")
        this.items = page.locator("div[class='features_items']").locator("div[class='productinfo text-center']").locator("p")
    }

    async searchProduct(productName: string){
        await this.searchBar.clear()
        await this.searchBar.fill(productName)
        await this.searchBtn.click()
    }

    async getProductsText(): Promise<string[]> {
        return await this.items.allTextContents()
    }
    
}