// since currency in the BlendedRate field in the Role item can't be surfaced in Project Resource Record, need to render it with the dollar sign added to it

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Role_x003a_Blended':{'View': RenderBlendedRate}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function RenderBlendedRate(ctx)
{
    if(ctx.CurrentItem['Role_x003a_Blended']){
        return '$' + ctx.CurrentItem['Role_x003a_Blended'];
    }else{
        return '';
    }
}

// render the title to reflect the previous month and next month field as actual year,month

(function () {
    
    function preTaskFormRenderer(renderCtx) {
       modifyColumns(renderCtx);       
    }
 
    function modifyColumns(renderCtx)
    {
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
    
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.OnPreRender = preTaskFormRenderer; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

// render the MyProjects link to the filtered view

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'MyProjects':{'View': RenderMyProjects}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function RenderMyProjects(ctx)
{
    var id = null;
    
    try{
     id = ctx.CurrentItem.Resource[0].lookupValue;
    }catch(err){
        
    }
    
     var link = 'https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/AllItems.aspx#InplviewHash972ed47a-cf65-4974-ba88-a6c53d48a630=FilterField1%3DResource-FilterValue1%3D';  

    if(id){
       return '<a href="' + link + encodeURI(id) + '">' + id + '</a>' ;
     }else{
        return '<a href="' + link + '">none</a>' ;
    }
 }

// render the current, previous, and next month hours based on current date

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'CurrentMonth':{'View': RenderCurrentMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function RenderCurrentMonth(ctx)
{
    var tempDate = GetResourceCurrentDate();
    var tempMonth = tempDate.getMonth() + 1;
    var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
    var outputvalue = ctx.CurrentItem[fieldname];
    if(outputvalue){
        return '<div style="width:100%;text-align:center;color:red;">' + outputvalue + '</div>';
    }
}

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'PreviousMonth':{'View': RenderPreviousMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function RenderPreviousMonth(ctx)
{
    var tempDate = GetResourcePreviousMonthDate();
    var tempMonth = tempDate.getMonth() + 1;
    var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
    var outputvalue = ctx.CurrentItem[fieldname];
    if(outputvalue){
        return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
    }
}

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'NextMonth':{'View': RenderNextMonth}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function RenderNextMonth(ctx)
{
    var tempDate = GetResourceNextMonthDate();
    var tempMonth = tempDate.getMonth() + 1;
    var fieldname = '_x0032_0' + (tempDate.getFullYear() - 2000) + '_x002f_' + (tempMonth>9?tempMonth:'0' + tempMonth) + '_x0020_hrs';
    var outputvalue = ctx.CurrentItem[fieldname];
    if(outputvalue){
        return '<div style="width:100%;text-align:center;">' + outputvalue + '</div>';
    }
}

// shared functions

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