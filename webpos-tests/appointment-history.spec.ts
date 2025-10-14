import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { userCredentials } from '../fixtures/user-data'
import { AppointmentHistory } from '../pages/appointment-history'

test.describe('Appointment History Tests', () => {
    let loginPage: LoginPage
    let appmtHistoryPage: AppointmentHistory

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        appmtHistoryPage = new AppointmentHistory(page)

        await loginPage.goto()
        await expect(page).toHaveURL(/login/)
        await loginPage.login(userCredentials.validUser.email, 
                            userCredentials.validUser.password)
        await expect(page).toHaveURL(/locations/)
        await loginPage.selectLocationOption()
        await appmtHistoryPage.clickAppointmentHistoryTab()
    })
    
    test('[TC-537] Appointments History page view', async ({ page }) => {
        await appmtHistoryPage.assertPageView()
        await expect(page).toHaveURL(/history/)
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
        await appmtHistoryPage.search('Walk-In')
        await expect(appmtHistoryPage.customerName).toHaveText('Walk-In')
    })

    test('[TC-541] View appointment details side panel', async () => {
        await appmtHistoryPage.openAppointmentDetails()
        await appmtHistoryPage.assertAppointmentDetailsPanel()
    })
})