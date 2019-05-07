import { LightningElement, track, api } from 'lwc';
import getRecordsByName from '@salesforce/apex/LookupController.getRecordsByName'

export default class LookupLwc extends LightningElement {
    @api
    objectname;
    @track
    recordsList;
    @track
    selectedValue = "";
    error;
    recordselected = false;
    @api
    iconname;
    //Method to query data after typing search term
    onKeyChange(event) {
        this.selectedValue = event.target.value;
        getRecordsByName({objectName : this.objectname, searchFor : this.selectedValue})
            .then(result => {
                this.recordsList = result;
            })
            .catch(error => {
                //exception handling
                this.error = error;
            })
        
    }

    //Method to clear search list and show selected value.
    clearSelection() {
        this.recordselected = false;
        this.selectedValue = "";
        this.recordsList = undefined;
    }

    //Method to pass selected record to parent component.
    setSelectedValue(event) {
        this.selectedValue = event.target.dataset.itemname;
        this.recordselected = true;
        this.recordsList = undefined;
        event.preventDefault();
        const selectedEvent = new CustomEvent('selected', {
            detail: {
                Name : this.selectedValue,
                Id : event.target.dataset.itemid,
                ObjectName : this.objectname
            } 
        });
        this.dispatchEvent(selectedEvent);
    }
}