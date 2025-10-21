import { type Locator, type Page, expect } from '@playwright/test'

export class LoginPage {

    constructor(private readonly page: Page) {}

    get emailField(): Locator { return this.page.getByRole('textbox', { name: 'Email' }) }
    get passwordField(): Locator { return this.page.getByRole('textbox', { name: 'Password' }) }
    get loginBtn(): Locator { return this.page.getByRole('button', { name: 'Login' }) }
    get errorMsg(): Locator { return this.page.locator('.css-18s5xoe') } // change
    get emailErrorMsg(): Locator { return this.page.getByText('email is a required field') }
    get passwordErrorMsg(): Locator { return this.page.getByText('password must be at least 5 characters') }
    get locationBtn(): Locator { return this.page.getByText('Select').first() }
    get selectLocation(): Locator { return this.page.getByRole('button', { name: "Select"}).first() }
    get userAvatar(): Locator { return this.page.locator('.css-13ez59u') } // change
    get signOutBtn(): Locator { return this.page.getByRole('menuitem', { name: "Sign Out" })}
    get siteLogo(): Locator { return this.page.getByRole('link', { name: 'byChronos byChronos' }) }

    async goto(){
        await this.page.goto('/login/') 
        await expect(this.loginBtn).toBeVisible()
    }

    async login(email: string, password: string){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);

        // Click without waiting for navigation
        // Check if login successful in api/backend
        await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('/api/login/') && res.status() === 200
                ),
            this.loginBtn.click({ noWaitAfter: true }),
        ]);

        const currentUrl = await this.page.url()
        if (!currentUrl.includes('/login')) {
            await expect(this.page).toHaveURL(/\/locations\//)
        } else {
            console.warn('⚠️ Stayed on login page.')
        }
    }

    async invalidLogin(email: string, password: string){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.loginBtn.click()
    }

    async clickLoginBtn(){
        await this.loginBtn.click()
    }

    async assertErrorMsg(errorTxt: string){
        await expect(this.errorMsg).toBeVisible()    
        await expect(this.errorMsg).toHaveText(errorTxt)
    }

    async assertEmailError(errorTxt: string){
        await expect(this.emailErrorMsg).toBeVisible()    
        await expect(this.emailErrorMsg).toHaveText(errorTxt)
    }

    async assertPasswordError(errorTxt: string){  
        await expect(this.passwordErrorMsg).toHaveText(errorTxt)
    }

    async logoutUser(){
        await this.userAvatar.click()
        await this.signOutBtn.click()
    }

    async selectLocationOption(){
        await this.selectLocation.click()
    }
}

