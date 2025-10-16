import { test, expect } from '@playwright/test'
import { userCredentials } from '../fixtures/user-data'
import { LoginPage } from '../pages/login-page'
import { CreateAppointment } from '../pages/create-appointment'

test.describe('Calendar Tests', () => {
    let loginPage: LoginPage
    let createAppointment: CreateAppointment

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        createAppointment = new CreateAppointment(page)

        await loginPage.goto()
        await page.waitForLoadState('networkidle')
        await expect(page).toHaveURL(/login/)
        await loginPage.login(userCredentials.validUser.email, 
                            userCredentials.validUser.password)
        await page.waitForLoadState('networkidle')
        await expect(page).toHaveURL(/locations/)
        await loginPage.selectLocationOption()
    })
    
    test('Create Appointment', async () => {
        await createAppointment.clickNewBtn()
        await createAppointment.clickAppointmentOption()
        await createAppointment.selectServiceCategory()
        await createAppointment.selectService()
        await createAppointment.selectCustomer()
        await createAppointment.selectDate()
        await createAppointment.clickFinishBtn()
    })
})