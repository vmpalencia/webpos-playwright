import { type Locator, type Page, expect } from '@playwright/test'
import { userCredentials } from '../fixtures/user-data'

export class LoginPage {
    // readonly page: Page
    // readonly emailField: Locator
    // readonly passwordField: Locator
    // readonly loginBtn: Locator
    // readonly errorMsg: Locator
    // readonly emailErrorMsg: Locator
    // readonly passwordErrorMsg: Locator
    // readonly selectLocation: Locator
    // readonly userAvatar: Locator
    // readonly signOutBtn: Locator

    // constructor(page: Page){
    //     this.page = page;
    //     this.emailField = page.getByRole('textbox', { name: 'Email' })
    //     this.passwordField = page.getByRole('textbox', { name: 'Password' })
    //     this.loginBtn = page.getByRole('button', { name: 'Login' })
    //     this.errorMsg = page.locator('.css-18s5xoe')
    //     this.emailErrorMsg = page.getByText('email is a required field')
    //     this.passwordErrorMsg = page.getByText('password must be at least 5 characters')
    //     this.selectLocation = page.getByRole('button', { name: 'Select' }).first()
    //     this.userAvatar = page.locator('.css-13ez59u')
    //     this.signOutBtn = page.getByRole('menuitem', { name: 'Sign Out' })
    // }

    constructor(private readonly page: Page) {}

    get emailField(): Locator { return this.page.getByRole('textbox', { name: 'Email' }) }
    get passwordField(): Locator { return this.page.getByRole('textbox', { name: 'Password' }) }
    get loginBtn(): Locator { return this.page.getByRole('button', { name: 'Login' }) }
    get errorMsg(): Locator { return this.page.locator('.css-18s5xoe') } // change
    get emailErrorMsg(): Locator { return this.page.getByText('email is a required field') }
    get passwordErrorMsg(): Locator { return this.page.getByText('password must be at least 5 characters') }
    get selectLocation(): Locator { return this.page.getByRole('button', { name: 'Select' }).first() }
    get userAvatar(): Locator { return this.page.locator('.css-13ez59u') } // change
    get signOutBtn(): Locator { return this.page.getByRole('menuitem', { name: 'Sign Out' }) }

    async goto(){
        await this.page.goto('/login')
        await expect(this.loginBtn).toBeVisible()
    }

    async login(email: string = "", password: string = ""){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        // await this.loginBtn.click()
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.loginBtn.click()
        ])
        return this
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
        await this.selectLocation.click()
        await this.userAvatar.click()
        await this.signOutBtn.click()
    }
}

