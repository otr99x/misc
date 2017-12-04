(function () {
   
     var ctx = {};
     ctx.Templates = {};
     ctx.Templates.Fields = {
         'Opportunity': {
             'NewForm': renderLookup
         }
     };
     SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
 })();

 function renderLookup(ctx) {
   
     var aId = GetUrlKeyValue('Opp'); //extract cat parameter from a query string
     ctx.CurrentFieldValue = aId; //set lookup field value
     return SPFieldLookup_Edit(ctx); //default template for rendering Lookup field control
 }