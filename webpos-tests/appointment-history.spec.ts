import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { userCredentials } from '../fixtures/user-data'
import { AppointmentHistory } from '../pages/appointment-history'

test.describe('Appointment History Tests', () => {
    let loginPage: LoginPage
    let appmtHistoryPage: AppointmentHistory

    test.beforeEach(async ({ page }, testInfo) => {
        loginPage = new LoginPage(page)
        appmtHistoryPage = new AppointmentHistory(page)

        testInfo.setTimeout(80000)
        await loginPage.goto()
        await expect(page).toHaveURL('/login/')
        await loginPage.login(userCredentials.validUser.email, userCredentials.validUser.password)
        // await page.waitForURL(/\/locations\//, { timeout: 30000 })
        await expect(page).not.toHaveURL('/login/')
        await expect(page).toHaveURL('/locations/')
        await loginPage.selectLocationOption()
        await appmtHistoryPage.clickAppointmentHistoryTab()
    })
    
    test('[TC-537] Appointments History page view', async ({ page }) => {
        await appmtHistoryPage.assertPageView()
        await expect(page).toHaveURL(/\/history\//, { timeout: 30000 })
    })

    test('[TC-538] Change view via Range', async () => {
        await appmtHistoryPage.selectRange('This Month')
        await expect(appmtHistoryPage.rangeDropdown).toHaveText('This Month')
    })

    test('[TC-542] Change view via Status', async () => {
        await appmtHistoryPage.selectStatus('Completed')
        await expect(appmtHistoryPage.statusDropdown).toHaveText('Completed')
    })

    test('[TC-540] Search appointment/customer', async () => {
        await appmtHistoryPage.search('John Li Test')
        await expect(appmtHistoryPage.customerName).toHaveText('John Li Test')
    })

    test('[TC-541] View appointment details side panel', async () => {
        await appmtHistoryPage.openAppointmentDetails()
        await appmtHistoryPage.assertAppointmentDetailsPanel()
    })
})