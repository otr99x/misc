var SITE_URL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement';
var FORECAST_GUID = '{BF6652B8-A598-442E-9B72-5A7D2EBC20A1}';
var ACTUAL_GUID = '{FC0B99FB-5592-4EB9-B446-38725BC0AACA}';
var PROJECT_RESOURCE_GUID = '{B47B7F5D-31EB-45B8-85AF-452DD1B33540}';
var OPPORTUNITY_GUID = '{CBD28A68-91D9-4430-BDAC-9467742C72BA}';

var SUMMARY_PAGE_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/SitePages/Opportunity%20Summary.aspx?Opp=';
var MYPROJECT_FILTER_LIST_URL_PARTIAL = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/AllItems.aspx#InplviewHash972ed47a-cf65-4974-ba88-a6c53d48a630=FilterField1%3DADResource-FilterValue1%3D'

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
    
    function renderHeaderTag(tag, webpart){
        // use JQuery to find the tag
        if(webpart == 'forecast'){
            $("span[title='Committed/Forecasts']:has(span:contains('Committed/Forecasts'))").append(tag);
        }else if(webpart == 'actual'){
            $("span[title='Actuals']:has(span:contains('Actuals'))").append(tag);
        }else if(webpart == 'projectresource'){
            $("span[title='Project Resources']:has(span:contains('Project Resources'))").append(tag);
        }
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
                editDatasheetTag = "<span><a style='margin: 10px;' href='" + FORECAST_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></span>";
                newTag = editItemTag + editDatasheetTag;
                renderHeaderTag(newTag, 'forecast');
            }else if(ctx.listName == ACTUAL_GUID){
                //actuals
                editItemTag = "<span><a href='" + NEW_ACTUAL_FORM_URL_PARTIAL + aId + "'><img src='" + ACTUAL_IMAGE_LINK + "' style='width:20px;height:20px;'></a></span>";           
                editDatasheetTag = "<span><a style='margin: 10px;' href='" + ACTUAL_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></span>";
                newTag = editItemTag + editDatasheetTag;
                renderHeaderTag(newTag, 'actual');
            }else if(ctx.listName == PROJECT_RESOURCE_GUID){
                //project resources
                  editItemTag = "<span><a href='" + NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL + aId + "'><img src='" + PROJECT_RESOURCE_IMAGE_LINK + "' style='width:20px;height:20px;'></a></span>";            
                 editDatasheetTag = "<span><a style='margin: 10px;' href='" + PROJECT_RESOURCE_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></span>";
                newTag = editItemTag + editDatasheetTag;
                renderHeaderTag(newTag, 'projectresource');
           }else{
                newTag = '';
            }
        }
        
        return newTag;
    }

})();


// render the footer link on the forecast, actual, and project resource web part.  Also ensure there is an edit field so that it only adds the new link if edit is available

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Footer = RenderAllFooters; 
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
    
    function RenderAllFooters(ctx){
        var aId = GetUrlKeyValue('Opp');
        var newTag = '';
        var editItemTag = '';
        var editDatasheetTag = '';
        
        if(FieldExists('Edit', ctx.ListSchema.Field)){
        
            // check what the listname is
            if(ctx.listName == FORECAST_GUID){
                //forecast
                forecastSummaryTag = GetForecastSummary(ctx);
                editItemTag = "<div><a href='" + NEW_FORECAST_FORM_URL_PARTIAL + aId + "'><img src='" + FORECAST_IMAGE_LINK + "' style='width:20px;height:20px;'></a></div>";
                editDatasheetTag = "<div><a href='" + FORECAST_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
                //newTag = forecastSummaryTag + editItemTag + editDatasheetTag;
                if(ctx.ListData.Row.length > 0){
                    newTag = forecastSummaryTag;
                }else{
                    newTag = '';
                }
            }else if(ctx.listName == ACTUAL_GUID){
                //actuals
                editItemTag = "<div><a href='" + NEW_ACTUAL_FORM_URL_PARTIAL + aId + "'><img src='" + ACTUAL_IMAGE_LINK + "' style='width:20px;height:20px;'></a></div>";           
                editDatasheetTag = "<div><a href='" + ACTUAL_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
                //newTag = editItemTag + editDatasheetTag;
                newTag = '';
            }else if(ctx.listName == PROJECT_RESOURCE_GUID){
                //project resources
                  editItemTag = "<div><a href='" + NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL + aId + "'><img src='" + PROJECT_RESOURCE_IMAGE_LINK + "' style='width:20px;height:20px;'></a></div>";            
                 editDatasheetTag = "<div><a href='" + PROJECT_RESOURCE_DATASHEET_URL_PARTIAL + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
                //newTag = editItemTag + editDatasheetTag;
                newTag = '';
           }else{
                newTag = '';
            }
        }
        
        return newTag;
    }
    
    function GetForecastSummary(ctx){
        // get the current, previous, and next yy-mmm.  Then get all forecasts for each and sum the Forecast ammount
        var currentMonthDate = GetResourceCurrentDate();
        var nextMonthDate = GetResourceNextMonthDate();
        var previousMonthDate = GetResourcePreviousMonthDate();
        
        var filters = {};
        filters.current = {
            year: '' + currentMonthDate.getFullYear(),
            month: GetResourceMonthString(currentMonthDate),
        };
        filters.previous = {
            year: '' + previousMonthDate.getFullYear(),
            month: GetResourceMonthString(previousMonthDate),
        };
        filters.next = {
            year: '' + nextMonthDate.getFullYear(),
            month: GetResourceMonthString(nextMonthDate),
        }
        
        // filter the desired records
        
        var currentItems = ctx.ListData.Row.filter(filtercurrentforecasts);
        var previousItems = ctx.ListData.Row.filter(filterpreviousforecasts);
        var nextItems = ctx.ListData.Row.filter(filternextforecasts);
        var allItems = ctx.ListData.Row;
        
        // now loop through each filtered list and sum the forecast amount.
        var currentSum = currentItems.length > 0 ? currentItems.reduce(sumForecast,0): 0;
        var previousSum = previousItems.length > 0 ? previousItems.reduce(sumForecast,0): 0;
        var nextSum = nextItems.length > 0 ? nextItems.reduce(sumForecast,0): 0;
        var totalSum = allItems.length > 0 ? allItems.reduce(sumForecast,0): 0;
        
        var currentTag = '<div>Committed/Forecast total for current month:  $' + currentSum.toFixed(2) + '</div>';
        var previousTag = '<div>Committed/Forecast total for ' + (previousMonthDate.getFullYear() + '-' + (previousMonthDate.getMonth() + 1)) + ' :  $' + previousSum.toFixed(2) + '</div>';
        var nextTag = '<div>Committed/Forecast total for ' + (nextMonthDate.getFullYear() + '-' + (nextMonthDate.getMonth() + 1)) + ' :  $' + nextSum.toFixed(2) + '</div>';
        var totalAllTag = '<div style="color:teal;font-weight:bold;">Committed/Forecast total for entire project :  $' + totalSum.toFixed(2) + '</div>';
       
        
        return previousTag + currentTag + nextTag + totalAllTag;
        
        function sumForecast(sum, item){
            var temp = parseFloat(item['Forecast_x0020_Amount.']);
            if(isNaN(temp)){
                return sum;
            }else{
                return sum + temp;
            }
        }
        
        function filtercurrentforecasts(item){
            return (item.Month == filters.current.month) && (item.Year == filters.current.year);
        }
        function filternextforecasts(item){
            return (item.Month == filters.next.month) && (item.Year == filters.next.year);
        }
        function filterpreviousforecasts(item){
            return (item.Month == filters.previous.month) && (item.Year == filters.previous.year);
        }
        
    }
    
})();

// render new item forms by autopopulating the opportunity based on a query string

(function () {
   
     var ctx = {};
     ctx.Templates = {};
     ctx.Templates.Fields = {
         'Opportunity': {
             'NewForm': renderLookup
         }
     };
     SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
    
     function renderLookup(ctx) {

         var aId = GetUrlKeyValue('Opp'); //extract cat parameter from a query string
         ctx.CurrentFieldValue = aId; //set lookup field value
         return SPFieldLookup_Edit(ctx); //default template for rendering Lookup field control
     }
    
 })();



// add link to the summary page when rendering the 'Summary Page' column on the opportunity list

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Summary_x0020_Page':{'View': RenderSummaryItem}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderSummaryItem(ctx)
    {
         var id = ctx.CurrentItem.ID;
        if( ctx.listName == OPPORTUNITY_GUID){
            return "<a href='" + SUMMARY_PAGE_URL_PARTIAL + id + "'><img src='" + SUMMARY_IMAGE_LINK + "' style='width:32px;height:32px;'></a>";
        }
    }    
})();

// render the MyProjects link to the filtered view on the Project Resources List

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'MyProjects':{'View': RenderMyProjects}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderMyProjects(ctx)
    {
        var username = null;

        if(ctx.listName === PROJECT_RESOURCE_GUID){
            try{
             username = ctx.CurrentItem.ADResource[0].title;
            }catch(err){

            }

             var link = MYPROJECT_FILTER_LIST_URL_PARTIAL;  

            if(username){
               return '<a href="' + link + GetEncodedName(username) + '">' + username + '</a>' ;
             }else{
                return '<a href="' + link + '">none</a>' ;
            }
        }
        
        function GetEncodedName(name){
            var encodedName = '';
            var letters = /^[A-Za-z]+$/;
            // loop through each character of the name and replace any character that isn't a letter with %25{hex code of character}

            var charArray = name.split('');
            for(var i=0; i<charArray.length; i++){
                if(charArray[i].match(letters)){
                    encodedName += charArray[i];
                }else{
                    // get the hex value of the character
                    var hexChar = charArray[i].charCodeAt(0).toString(16);
                    encodedName += '%25'+hexChar;
                }
            }

            return encodedName;
        }

        
    } 
    
})();

// since currency in the BlendedRate field in the Role item can't be surfaced in Project Resource Record, need to render it with the dollar sign added to it

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Role_x003a_Blended':{'View': RenderBlendedRate}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderBlendedRate(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            if(ctx.CurrentItem['Role_x003a_Blended']){
                return '$' + ctx.CurrentItem['Role_x003a_Blended'];
            }else{
                return '';
            }
        }
    }
    
})();

// render the title to reflect the previous month and next month field as actual year,month on the Project Resource List

(function () {
    function modifyColumns(renderCtx)
    {
        if(renderCtx.listName === PROJECT_RESOURCE_GUID){
            var nextMonthDate = GetResourceNextMonthDate();
            var previousMonthDate = GetResourcePreviousMonthDate();
            var nextMonthTitle = nextMonthDate.getFullYear() + '/' + (nextMonthDate.getMonth() + 1);
            var previousMonthTitle = previousMonthDate.getFullYear() + '/' + (previousMonthDate.getMonth() + 1);
            var arrayLength= renderCtx.ListSchema.Field.length;
            for (var i=0; i < arrayLength;i++)
            {
               if(renderCtx.ListSchema.Field[i].DisplayName == 'PreviousMonth')
                 {
                   var newTitle= previousMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'NextMonth'){
                   var newTitle= nextMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = newTitle;
                 }

             }
        }
    }
    
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.OnPreRender = modifyColumns; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

// render the current, previous, and next month hours based on current date

(function () {
     var currentoverrideCtx = {};
     currentoverrideCtx.Templates = {};
     currentoverrideCtx.Templates.Fields = {'CurrentMonth':{'View': RenderCurrentMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(currentoverrideCtx);
    
     var previousoverrideCtx = {};
     previousoverrideCtx.Templates = {};
     previousoverrideCtx.Templates.Fields = {'PreviousMonth':{'View': RenderPreviousMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(previousoverrideCtx);

     var nextoverrideCtx = {};
     nextoverrideCtx.Templates = {};
     nextoverrideCtx.Templates.Fields = {'NextMonth':{'View': RenderNextMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nextoverrideCtx);

    function RenderCurrentMonth(ctx)
    {
        if(ctx.listName === PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceCurrentDate();
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;color:red;">' + outputvalue + '</div>';
            }
        }
    }
    
    function RenderPreviousMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourcePreviousMonthDate();
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    function RenderNextMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceNextMonthDate();
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
})();

var resourceMonthString = ['01-Jan','02-Feb','03-Mar','04-Apr','05-May','06-Jun','07-Jul','08-Aug','09-Sep','10-Oct','11-Nov','12-Dec' ];
    
function GetResourceCurrentDate()
{
    return new Date();
}

function GetResourceNextMonthDate()
{
    var tempdate = new Date();
    tempdate.setMonth(tempdate.getMonth() + 1);
    return tempdate;
}

function GetResourcePreviousMonthDate()
{
    var tempdate = new Date();
    tempdate.setMonth(tempdate.getMonth() - 1);
    return tempdate;
}

function GetResourceMonthString( date )
{
    var desiredMonth = date.getMonth() + 1;
    var monthString = desiredMonth>9?'' + desiredMonth:'0'+desiredMonth;
    
    var selectedMonth = resourceMonthString.filter(checkmonth);
    return selectedMonth[0];
    function checkmonth(month){
        return month.startsWith(monthString);
    }
    
}
