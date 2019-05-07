import { LightningElement, track } from 'lwc';

export default class LookupDemo extends LightningElement {
    @track
    account;
    @track
    opportunity;
    @track
    contact;
        handleSelected(event) {
            var objectname = event.detail.ObjectName;
            if( objectname === "Account") {
                this.account = {Name : event.detail.Name, Id: event.detail.Id}
            }
            if( objectname === "Opportunity") {
                this.opportunity = {Name : event.detail.Name, Id: event.detail.Id}
            }
            if( objectname === "Contact") {
                this.contact = {Name : event.detail.Name, Id: event.detail.Id}
            }
        }
}