/**
 *@description : Class to query data based on passed object and searchterm
 *@param objectName :  Object name for lookup
 *@param searchFor : search term
 */
public with sharing class LookupController {
    @AuraEnabled
    public static List<Object> getRecordsByName(String objectName, String searchFor) {
        String queryString = 'SELECT Id, Name FROM ';
        queryString += String.escapeSingleQuotes(objectName) + ' WHERE Name Like \'%' + String.escapeSingleQuotes(searchFor) + '%\'';
        return Database.query(queryString);
    }
}
