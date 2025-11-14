import { type Locator, type Page, expect } from '@playwright/test'

export class Calendar {

    constructor(private readonly page: Page){}

    get appointmentBlock(): Locator { return this.page.locator
        ('.fc-event.fc-event-draggable, .fc-event[href]') }

    // === activities modal
    get activitiesModalTitle(): Locator { return this.page.getByRole('heading', { name: 'Activities' }) }
    get reassignBtn(): Locator { return this.page.getByRole('button', { name: 'Reassign' }) }
    get notesBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_notes"]') }
    get checkoutBtn(): Locator { return this.page.locator('[itemid="am_details_bookingGrp_btn_checkout"]') }
    get updateBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_update"]') }
    get rebookBtn(): Locator { return this.page.locator('[itemid="waitlist_detail_more_close_btn"]') }
    get rebookConfirmBtn(): Locator { return this.page.locator('[itemid="appointment_more_button_rebook"]') }

    // update appointment button (default: NEW)
    get updateAppointmentBtn(): Locator { return this.page.locator('.css-1ij6705 button') }
    get arrivedAppointmentBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_arrived"]') }
    get servingAppointmentBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_serving"]') }
    get completeAppointmentBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_completed"]') }
    get closeAppointmentBtn(): Locator { return this.page.locator('[itemid="am_details_bookingGrp_btn_close"]') }
    get statusConfirmBtn(): Locator { return this.page.locator('[itemid="am_details_actionDx_btn_confirm"]') }
    // appointment status dropdown options
    get confirmedStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Confirmed' }) }
    get arrivedStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Arrived' }) }
    get servingStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Serving' }) }
    get completedStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Completed' }) }
    get noShowStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'No-Show' }) }
    get cancelStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Cancel' }) }
    get closeStatusOption(): Locator { return this.page.getByRole('menuitem', { name: 'Close' }) }

    // methods 
    async clickAppointmentBlock(num: number){
        await this.appointmentBlock.nth(num).click()
    }

    async verifyActivitiesModal(){
        await expect(this.activitiesModalTitle).toBeVisible()
    }

    async changeAppointmentStatus(status: string){
        await this.updateAppointmentBtn.click()
        switch(status){
            case 'Confirmed':
                await this.confirmedStatusOption.click()
                break;
            case 'Arrived':
                await this.arrivedStatusOption.click()
                break;
            case 'Serving':
                await this.servingStatusOption.click()
                break;      
            case 'Completed':
                await this.completedStatusOption.click()
                await this.statusConfirmBtn.click()
                break;
            case 'No-Show':
                await this.noShowStatusOption.click()
                await this.statusConfirmBtn.click()
                break;
            case 'Cancel':
                await this.cancelStatusOption.click()
                await this.statusConfirmBtn.click()
                break;  
            case 'Close':
                await this.closeStatusOption.click()
                break;
        }
    }  
}
