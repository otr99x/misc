var SITE_URL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement';
var FORECAST_GUID = '{67728E5F-DC29-436B-82BB-68F86B64DE47}';
var ACTUAL_GUID = '{A64E5EB4-81E9-498F-91C3-A0164927EC4E}';
var PROJECT_RESOURCE_GUID = '{7F9BE687-BB58-4EA3-BF05-3C815F30F5FB}';
var OPPORTUNITY_GUID = '{6276EFC3-CE5B-40F5-81A5-913BCE70B8A0}';

var SUMMARY_PAGE_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/SitePages/Opportunity%20Summary.aspx?Opp=';
var MYPROJECT_FILTER_LIST_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/AllItems.aspx#InplviewHashc504d0b1-a9bc-4917-b271-e5bd019e51a8=FilterField1%3DResource-FilterValue1%3D'

var SUMMARY_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/summary.gif';
var FORECAST_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/forecast.gif';
var ACTUAL_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/actual.gif';
var PROJECT_RESOURCE_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/resource.gif';

var NEW_FORECAST_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Forecasts/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FForecasts%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_ACTUAL_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Actuals/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FActuals%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FProject%2520Resources%2FAllItems%2Easpx&RootFolder=&Opp=';

var FORECAST_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Forecasts/DataEntry.aspx#InplviewHash7b2faac5-73f7-4f3b-a4fd-201b2fe0a5ab=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var ACTUAL_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Actuals/DataEntry.aspx#InplviewHash11c68916-8e28-4017-9930-e2df9bbada2d=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var PROJECT_RESOURCE_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/DataEntry.aspx#InplviewHashe2f56572-e0e5-49d6-8c87-b74e69453362=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';

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
             username = ctx.CurrentItem.Resource[0].lookupValue;
            }catch(err){

            }

             var link = MYPROJECT_FILTER_LIST_URL_PARTIAL;  

            if(username){
               return '<a href="' + link + encodeURI(username) + '">' + username + '</a>' ;
             }else{
                return '<a href="' + link + '">none</a>' ;
            }
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
