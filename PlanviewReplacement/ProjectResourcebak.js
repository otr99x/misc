var SITE_URL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement';
var FORECAST_GUID = '{67728E5F-DC29-436B-82BB-68F86B64DE47}';
var ACTUAL_GUID = '{A64E5EB4-81E9-498F-91C3-A0164927EC4E}';
var PROJECT_RESOURCE_GUID = '{7F9BE687-BB58-4EA3-BF05-3C815F30F5FB}';
var OPPORTUNITY_GUID = '{6276EFC3-CE5B-40F5-81A5-913BCE70B8A0}';

var SUMMARY_PAGE_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/SitePages/Opportunity%20Summary.aspx?Opp=';
var MYPROJECT_FILTER_LIST_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/AllItems.aspx#InplviewHashc504d0b1-a9bc-4917-b271-e5bd019e51a8=FilterField1%3DResource-FilterValue1%3D';

var SUMMARY_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/summary.gif';
var FORECAST_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/forecast.gif';
var ACTUAL_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/actual.gif';
var PROJECT_RESOURCE_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/resource.gif';
var UNASSIGNED_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/Unassigned.gif';
var ASSIGNED_IMAGE_LINK = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Images1/Assigned.gif';

var NEW_FORECAST_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Forecasts/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FForecasts%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_ACTUAL_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Actuals/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FActuals%2FAllItems%2Easpx&RootFolder=&Opp=';
var NEW_PROJECT_RESOURCE_FORM_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/NewForm.aspx?Source=https%3A%2F%2Fteamsites%2Ecenovus%2Ecom%2Fapplications%2FOpportunityLifecycleManagement%2FLists%2FProject%2520Resources%2FAllItems%2Easpx&RootFolder=&Opp=';

var FORECAST_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Forecasts/DataEntry.aspx#InplviewHash7b2faac5-73f7-4f3b-a4fd-201b2fe0a5ab=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var ACTUAL_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Actuals/DataEntry.aspx#InplviewHash11c68916-8e28-4017-9930-e2df9bbada2d=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';
var PROJECT_RESOURCE_DATASHEET_URL_PARTIAL = 'https://teamsites.cenovus.com/applications/OpportunityLifecycleManagement/Lists/Project%20Resources/DataEntry.aspx#InplviewHashe2f56572-e0e5-49d6-8c87-b74e69453362=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D';

// render the MyProjects link to the filtered view on the Project Resources List

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'MyProjects':{'View': RenderMyProjects}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderMyProjects(ctx)
    {
        // username is a lookup to the resource list
        // adusername is an AD lookup
        // This code will work on both types of columns.  It tries to get both and depending on which one is found, it encodes the username differently.
        // AD users passed to filters have the adusername escaped with %25{character hexcode} for non alphabetic characters
        var username = null;
        var adusername = null;

        if(ctx.listName === PROJECT_RESOURCE_GUID){
            try{
             username = ctx.CurrentItem.Resource[0].lookupValue;
             adusername = ctx.CurrentItem.Resource[0].title;
            }catch(err){

            }

             var link = MYPROJECT_FILTER_LIST_URL_PARTIAL;  

            if(adusername){
               return '<a href="' + link + GetEncodedADName(adusername) + '"><img src="' + ASSIGNED_IMAGE_LINK + '" style="width:20px;height:20px;"</a>' ;
             }else if(username){
                return '<a href="' + link + encodeURI(username) + '">' + username + '</a>' ;
             }else{
                return '<a href="' + link + '"><img src="' + UNASSIGNED_IMAGE_LINK + '" style="width:20px;height:20px;"</a>' ;
            }
        }
        
        function GetEncodedADName(name){
            var encodedName = '';
            // use regular expression to determine if the letter is alphabetic
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

// cant use the blended rate in a calculated column since it comes from a lookup, we need to calculate it here
(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'EstimatedTotalForecast':{'View': RenderEstimatedTotalForecast}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderEstimatedTotalForecast(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            if(ctx.CurrentItem['Role_x003a_Blended']){
                return '$' + (ctx.CurrentItem['Role_x003a_Blended'] * GetTotalHours(ctx));
            }else{
                return '';
            }
        }
    }
    
    function GetTotalHours(ctx){
        return Number(ctx.CurrentItem['Forecast_x0020_2017_x002f_10_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2017_x002f_11_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2017_x002f_12_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_01_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_02_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_03_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_04_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_05_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_06_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_07_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_08_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_09_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_10_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_11_x00']) + Number(ctx.CurrentItem['Forecast_x0020_2018_x002f_12_x00']);
    }
    
})();



// render the title to reflect the previous month and next month field as actual year,month on the Project Resource List

(function () {
    function modifyColumns(renderCtx)
    {
        if(renderCtx.listName === PROJECT_RESOURCE_GUID){
            var nextMonthDate = GetResourceNextMonthDate(1);
            var nextMonthTitle = nextMonthDate.getFullYear() + '/' + (nextMonthDate.getMonth() + 1);
            
            var nextMonthDate2 = GetResourceNextMonthDate(2);
            var nextMonthTitle2 = nextMonthDate2.getFullYear() + '/' + (nextMonthDate2.getMonth() + 1);
           
            var nextMonthDate3 = GetResourceNextMonthDate(3);
            var nextMonthTitle3= nextMonthDate3.getFullYear() + '/' + (nextMonthDate3.getMonth() + 1);
            
            var previousMonthDate = GetResourcePreviousMonthDate(1);
            var previousMonthTitle = previousMonthDate.getFullYear() + '/' + (previousMonthDate.getMonth() + 1);
            
            var arrayLength= renderCtx.ListSchema.Field.length;
            for (var i=0; i < arrayLength;i++)
            {
               if(renderCtx.ListSchema.Field[i].DisplayName == 'ForecastPreviousMonth')
                 {
                   var newTitle= previousMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Forecast ' + newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'ForecastNextMonth'){
                   var newTitle= nextMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Forecast ' + newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'CommittedPreviousMonth'){
                   var newTitle= previousMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Committed ' + newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'CommittedNextMonth'){
                   var newTitle= nextMonthTitle;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Committed ' + newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'ForecastNextMonth2'){
                   var newTitle= nextMonthTitle2;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Forecast ' + newTitle;
                 }else if(renderCtx.ListSchema.Field[i].DisplayName == 'ForecastNextMonth3'){
                   var newTitle= nextMonthTitle3;
                   var linkTitleField = renderCtx.ListSchema.Field[i];
                   linkTitleField.DisplayName = 'Forecast ' + newTitle;
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
     currentoverrideCtx.Templates.Fields = {'ForecastCurrentMonth':{'View': RenderForecastCurrentMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(currentoverrideCtx);
    
     var previousoverrideCtx = {};
     previousoverrideCtx.Templates = {};
     previousoverrideCtx.Templates.Fields = {'ForecastPreviousMonth':{'View': RenderForecastPreviousMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(previousoverrideCtx);

     var nextoverrideCtx = {};
     nextoverrideCtx.Templates = {};
     nextoverrideCtx.Templates.Fields = {'ForecastNextMonth':{'View': RenderForecastNextMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nextoverrideCtx);


    
    
    
     var nextoverrideCtx2 = {};
     nextoverrideCtx2.Templates = {};
     nextoverrideCtx2.Templates.Fields = {'ForecastNextMonth2':{'View': RenderForecastNextMonth2}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nextoverrideCtx2);

     var nextoverrideCtx3 = {};
     nextoverrideCtx3.Templates = {};
     nextoverrideCtx3.Templates.Fields = {'ForecastNextMonth3':{'View': RenderForecastNextMonth3}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nextoverrideCtx3);

    
    
        
     var current2overrideCtx = {};
     current2overrideCtx.Templates = {};
     current2overrideCtx.Templates.Fields = {'CommittedCurrentMonth':{'View': RenderCommittedCurrentMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(current2overrideCtx);
    
     var previous2overrideCtx = {};
     previous2overrideCtx.Templates = {};
     previous2overrideCtx.Templates.Fields = {'CommittedPreviousMonth':{'View': RenderCommittedPreviousMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(previous2overrideCtx);

     var next2overrideCtx = {};
     next2overrideCtx.Templates = {};
     next2overrideCtx.Templates.Fields = {'CommittedNextMonth':{'View': RenderCommittedNextMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(next2overrideCtx);
    
    function RenderForecastCurrentMonth(ctx)
    {
        if(ctx.listName === PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceCurrentDate();
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Forecast_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x00';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }
    
    function RenderForecastPreviousMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourcePreviousMonthDate(1);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Forecast_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x00';;
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    function RenderForecastNextMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceNextMonthDate(1);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Forecast_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x00';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    function RenderForecastNextMonth2(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceNextMonthDate(2);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Forecast_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x00';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    function RenderForecastNextMonth3(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceNextMonthDate(3);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Forecast_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x00';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    
    function RenderCommittedCurrentMonth(ctx)
    {
        if(ctx.listName === PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceCurrentDate();
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Committed_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }
    
    function RenderCommittedPreviousMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourcePreviousMonthDate(1);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Committed_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0';
            var outputvalue = ctx.CurrentItem[fieldname];
            if(outputvalue){
                return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
            }
        }
    }  
    
    function RenderCommittedNextMonth(ctx)
    {
        if(ctx.listName == PROJECT_RESOURCE_GUID){
            var tempDate = GetResourceNextMonthDate(1);
            var tempMonth = tempDate.getMonth() + 1;
            var fieldname = 'Committed_x0020_' + (tempDate.getFullYear()) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0';
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

function GetResourceNextMonthDate(increment)
{
    var tempdate = new Date();
    tempdate.setMonth(tempdate.getMonth() + increment);
    return tempdate;
}

function GetResourcePreviousMonthDate(decrement)
{
    var tempdate = new Date();
    tempdate.setMonth(tempdate.getMonth() - decrement);
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
