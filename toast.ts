import { type Locator, type Page, expect } from '@playwright/test'

export class ToastComponent {

    constructor(private readonly page: Page) {}

    get toastMessage(): Locator { return this.page.locator('[aria-live="polite"]')}
    
    async verifyToastMsg(expectedMsg: string){
        await expect(this.toastMessage).toBeVisible()
        await expect(this.toastMessage).toHaveText(expectedMsg)
    }

}

