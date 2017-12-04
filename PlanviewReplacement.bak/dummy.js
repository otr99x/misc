var SITE_URL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement';
var FORECAST_GUID = '{BF6652B8-A598-442E-9B72-5A7D2EBC20A1}';
var ACTUAL_GUID = '{FC0B99FB-5592-4EB9-B446-38725BC0AACA}';
var PROJECT_RESOURCE_GUID = '{B47B7F5D-31EB-45B8-85AF-452DD1B33540}';
var OPPORTUNITY_GUID = '{CBD28A68-91D9-4430-BDAC-9467742C72BA}';

var SUMMARY_PAGE_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/SitePages/Opportunity%20Summary.aspx?Opp=';
var MYPROJECT_FILTER_LIST_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/AllItems.aspx#InplviewHash972ed47a-cf65-4974-ba88-a6c53d48a630=FilterField1%3DResource-FilterValue1%3D'

var SUMMARY_IMAGE_LINK = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/summary.gif';
var FORECAST_IMAGE_LINK = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/forecast.gif';
var ACTUAL_IMAGE_LINK = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/actual.gif';
var PROJECT_RESOURCE_IMAGE_LINK = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/resource.gif';

var NEW_FORECAST_FORM_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Forecasts/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FForecasts%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_ACTUAL_FORM_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Actuals/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FActuals%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FProject%2520Resources%2FAllItems%2Easpx&RootFolder=&Opp=';

var FORECAST_DATASHEET_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Forecasts/DataEntry.aspx#InplviewHash3802c4f8-39ad-4fd6-a97c-eee9e5b26170=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var ACTUAL_DATASHEET_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Actuals/DataEntry.aspx#InplviewHashab4f77d0-0712-4c2f-a12d-148fe693af8f=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var PROJECT_RESOURCE_DATASHEET_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/DataEntry.aspx#InplviewHash249b8361-2b22-47e3-ab47-ec0dd7b65662=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';

// render the header on the forecast, actual, and project resource web part. Also ensure there is an edit field so that it only adds the new link if edit is available

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.OnPostRender = RenderAllHeaders; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function FieldExists(searchValue, fieldArray){
        var found = false;
        for(var i=0; i< fieldArray.length; i++){
            if(fieldArray[i].Name == searchValue){
                found = true;
                break;
            }
       }
        return found;
    }
    
    function renderHeaderTag(tag){
        // use JQuery to find the tag
        var selectedTag = $("span[title='Committed/Forecasts']:has(span:contains('Committed/Forecasts'))").append(tag);
    }
    
    function RenderAllHeaders(ctx){
        var aId = GetUrlKeyValue('Opp');
        var newTag = '';
        var editItemTag = '';
        var editDatasheetTag = '';
        
        if(FieldExists('Edit', ctx.ListSchema.Field)){
        
            // check what the listname is
            if(ctx.listName == FORECAST_GUID){
                //forecast
                editItemTag = "<span><a href='" + NEW_FORECAST_FORM_URL_PARTIAL + aId + "'><img src='" + FORECAST_IMAGE_LINK + "' style='width:20px;height:20px;'></a></span>";
                editDatasheetTag = "<span><a href='" + FORECAST_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></span>";
                newTag = editItemTag + editDatasheetTag;
                renderHeaderTag(newTag);
            }else if(ctx.listName == ACTUAL_GUID){
                //actuals
                editItemTag = "<div><a href='" + NEW_ACTUAL_FORM_URL_PARTIAL + aId + "'><img src='" + ACTUAL_IMAGE_LINK + "' style='width:20px;height:20px;'></a></div>";           
                editDatasheetTag = "<div><a href='" + ACTUAL_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
                newTag = editItemTag + editDatasheetTag;
                //renderHeaderTag(newTag);
            }else if(ctx.listName == PROJECT_RESOURCE_GUID){
                //project resources
                  editItemTag = "<div><a href='" + NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL + aId + "'><img src='" + PROJECT_RESOURCE_IMAGE_LINK + "' style='width:20px;height:20px;'></a></div>";            
                 editDatasheetTag = "<div><a href='" + PROJECT_RESOURCE_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
                newTag = editItemTag + editDatasheetTag;
                //renderHeaderTag(newTag);
           }else{
                newTag = '';
            }
        }
        
        return newTag;
    }

})();

