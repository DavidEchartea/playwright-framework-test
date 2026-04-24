import { Page, Locator, expect } from "@playwright/test";

export class Home {
    readonly page: Page
    readonly home: Locator
    readonly products: Locator
    readonly cart: Locator
    readonly login: Locator

    constructor(page: Page){
       this.page = page
       this.home = page.getByRole("link", { name: "Home" })
       this.products = page.getByRole("link", {name: "Products" })
       this.cart = page.getByRole("link", {name: "Cart" })
       this.login = page.getByRole("link", {name: " Signup / Login" })
    }

    async navigateProducts(){
        await this.products.click()
    }

    async navigateCart(){
        await this.cart.click()
    }

    async navigateLogin() {
        await this.login.click()
    }

}