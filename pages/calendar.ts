import { type Locator, type Page, expect } from '@playwright/test'

export class Calendar {

    constructor(private readonly page: Page){}

    get appointmentBlock(): Locator { return this.page.locator('.fc-v-event') }
    // === activities modal
    get activitiesModalTitle(): Locator { return this.page.getByRole('heading', { name: 'Activities' }) }
    get reassignBtn(): Locator { return this.page.getByRole('button', { name: 'Reassign' }) }
    get notesBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_notes"]') }
    get checkoutBtn(): Locator { return this.page.locator('[itemid="am_details_bookingGrp_btn_checkout"]') }
    get updateBtn(): Locator { return this.page.locator('[itemid="am_details_common_btn_update"]') }
    get rebookBtn(): Locator { return this.page.locator('[itemid="waitlist_detail_more_close_btn"]') }
    get rebookConfirmBtn(): Locator { return this.page.locator('[itemid="appointment_more_button_rebook"]') }
    get closeAppointment(): Locator { return this.page.locator('[itemid="am_details_bookingGrp_btn_closeDetails"]')}
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
    get newStatusOption(): Locator { return this.page.locator('[itemid="am_details_common_btn_new"]') }
    
    // methods 

    async clickAppointmentBlock(status: string) {
        // normalize incoming status
        const desiredStatus = status.toLowerCase();

        await this.page.waitForLoadState('networkidle');
        await this.appointmentBlock.first().waitFor({
            state: 'visible',
            timeout: 10000,
        });

        const appointmentsCount = await this.appointmentBlock.count();
        console.log('# of Appointment Blocks: ' + appointmentsCount);

        for (let i = 0; i < appointmentsCount; i++) {
            const appointment = this.appointmentBlock.nth(i);

            await appointment.click();
            console.log(`Clicked appointment block ${i + 1}`);

            const currentStatus = (await this.updateAppointmentBtn.innerText()).trim().toLowerCase();
            console.log(`Current status of appointment ${i + 1}: ${currentStatus}`);

            // Skip completed or no-show
            if (currentStatus === 'completed' || currentStatus === 'no-show') {
                console.log(`Skipping block ${i + 1} because status is ${currentStatus}`);
                await this.closeAppointment.click();
                continue;
            }

            // Open status dropdown
            await this.updateAppointmentBtn.click();
            // await this.page.waitForSelector('.css-66tsle .MuiMenu-paper');

            switch (desiredStatus) {
                case 'confirmed':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.confirmedStatusOption.click();
                    await this.confirmedStatusOption.click();
                    break;
                case 'arrived':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.arrivedStatusOption.click();
                    await this.arrivedStatusOption.click();
                    break;
                case 'serving':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.servingStatusOption.click();
                    await this.servingStatusOption.click();
                    break;
                case 'completed':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.completedStatusOption.click();
                    await this.statusConfirmBtn.click();
                    break;
                case 'no-show':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.noShowStatusOption.click();
                    await this.statusConfirmBtn.click();
                    break;
                case 'cancel':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.cancelStatusOption.click();
                    await this.statusConfirmBtn.click();
                    break;
                case 'close':
                    await this.page.waitForSelector('.css-66tsle .MuiMenu-paper', { state: 'visible' });
                    await this.closeStatusOption.click();
                    break;
            }
            console.log(`Updated appointment ${i + 1} to status: ${desiredStatus}`);
            return;
        }

        console.log('No appointment block was updated (all were completed / no-show or none available).');
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
