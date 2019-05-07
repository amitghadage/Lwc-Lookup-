# Introduction
In lwc there is no out of the box component by which lookup can be implemented. In lightning component you can use force:inputFIeld for lookup but it is not available in lwc. You can use lightning-record-edit-form with lightning-input-field for lookup, but when your functionality is complex than just create or update operation on sobject you will need lookup component. Hence, I thought of a component which can be used anywhere in lwc for any object. You can find source code of this component on my github repository.

## Component Attributes:
objectname : The object name for which lookup is needed.
iconname :  To see record icon in search results.
onselected: JavaScript method where selected record in lookup can be accessed.


## How to use it?

Below is sample code on how to use this component.

In component html file:

Add following code in your lwc to use lookup


 <c-lookup-lwc objectname="Contact" iconname="standard:contact" onselected = {handleSelected}></c-lookup-lwc>

In component controller.js file:

Set JavaScript controller class variables to event.detail.Id or event.detail.Name and use it.

@track account; 

handleSelected(event) {

  var objectname = event.detail.ObjectName;
 
  if( objectname === "Account") {

    this.account = {Name : event.detail.Name, Id: event.detail.Id}

  }

}
