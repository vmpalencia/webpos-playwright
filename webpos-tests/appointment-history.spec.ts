import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { userCredentials } from '../fixtures/user-data'
import { AppointmentHistory } from '../pages/appointment-history'

test.describe('Appointment History Tests', () => {
    let loginPage: LoginPage
    let appmtHistoryPage: AppointmentHistory

    console.info('Navigating to URL...')
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        appmtHistoryPage = new AppointmentHistory(page)
        await loginPage.goto()
        await expect(page).toHaveURL('/login/')
        console.info('Logging in to user account...')
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        await page.waitForURL(/\/locations\//, { timeout: 30000 })
        await expect(page).toHaveURL('/locations/')
        await loginPage.selectLocationOption()
        console.info('User is now logged in...')
    })
    
    test('[TC-537] Appointments History page view', async ({ page }) => {
        await appmtHistoryPage.clickAppointmentHistoryTab()
        await appmtHistoryPage.assertPageView()
        await expect(page).toHaveURL(/\/history\//, { timeout: 30000 })
    })
})