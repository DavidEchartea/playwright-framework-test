import { Page, Locator, expect } from "@playwright/test";

export class Cart{
    readonly page: Page
    readonly itemDescription: Locator
    readonly itemPrice: Locator
    readonly itemQuantity : Locator
    readonly itemTotal: Locator
    readonly itemDelete: Locator
    readonly checkoutBtn: Locator

    constructor(page: Page){
        this.page = page
        this.itemDescription = page.locator('td[class="cart_description"]').locator('h4')
        this.itemPrice = page.locator('td[class="cart_price"]')
        this.itemQuantity = page.locator('td[class="cart_quantity"]')
        this.itemTotal = page.locator('td[class="cart_total"]')
        this.itemDelete = page.locator('td[class="cart_delete"]').locator("a[class='cart_quantity_delete']")
        this.checkoutBtn = page.getByRole("button", {name: 'Proceed To Checkout'})
    }

    async deleteItem() {
        if(await this.itemDelete.isVisible()){
            await this.itemDelete.click()
        }
    }

}