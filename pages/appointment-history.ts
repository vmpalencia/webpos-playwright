import { type Locator, type Page, expect } from '@playwright/test'

export class AppointmentHistory { 

    constructor(private readonly page: Page) {}

    // locators
    get pageTitle(): Locator { return this.page.getByText('Appointment List') }
    get rangeDropdown(): Locator { return this.page.locator('#demo-simple-select-label') }
    get statusDropdown(): Locator { return this.page.locator('#status-select')}
    get fromDropdown(): Locator { return this.page.getByRole('textbox', { name: 'From'}) }
    get toDropdown(): Locator { return this.page.getByRole('textbox', { name: 'To', exact: true }) }
    get searchBar(): Locator { return this.page.getByPlaceholder('Search by Appointment ID# and Customer Name') }
    get appointmentID_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get customer_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get createdDate_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get dateFrom_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get dateEnd_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get source_column(): Locator { return this.page.getByRole('columnheader', { name: "Appointment ID"}) }
    get appointmentRow(): Locator { return this.page.getByRole('row').first() }
    get appointmentID(): Locator { return this.page.locator('div[data-field="id"]').first() }
    get appointmentHistoryTab(): Locator { return this.page.getByRole('link', { name: 'Appointments History' }) }

    async clickAppointmentHistoryTab(){
        await this.appointmentHistoryTab.click()
    }

    async assertPageView(){
        await expect(this.pageTitle).toBeVisible()
        await expect(this.rangeDropdown).toBeVisible()
        await expect(this.statusDropdown).toBeVisible()
        await expect(this.fromDropdown).toBeVisible()
        await expect(this.toDropdown).toBeVisible()
        await expect(this.searchBar).toBeVisible()
        await expect(this.appointmentID_column).toBeVisible()
        await expect(this.customer_column).toBeVisible()
        await expect(this.createdDate_column).toBeVisible()
        await expect(this.dateFrom_column).toBeVisible()
        await expect(this.dateEnd_column).toBeVisible()
        await expect(this.source_column).toBeVisible()
        await expect(this.appointmentRow).toBeVisible()
        await expect(this.appointmentID).toBeVisible()
        await expect(this.appointmentHistoryTab).toBeVisible()
    }
    
} 