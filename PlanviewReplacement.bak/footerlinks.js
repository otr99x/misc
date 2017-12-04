(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Footer = RenderAllFooters; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    
    function RenderAllFooters(ctx){
        var aId = GetUrlKeyValue('Opp');
        var newTag = '';
        var editItemTag = '';
        var editDatasheetTag = '';
        
        // check what the listname is
        if(ctx.listName == '{BF6652B8-A598-442E-9B72-5A7D2EBC20A1}'){
            //forecast
            editItemTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Forecasts/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FForecasts%2FAllItems%2Easpx&RootFolder=&Opp=" + aId + "'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/forecast.gif' style='width:20px;height:20px;'></a></div>";
            editDatasheetTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Forecasts/DataEntry.aspx#InplviewHash3802c4f8-39ad-4fd6-a97c-eee9e5b26170=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
            newTag = editItemTag + editDatasheetTag;
        }else if(ctx.listName == '{FC0B99FB-5592-4EB9-B446-38725BC0AACA}'){
            //actuals
            editItemTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Actuals/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FActuals%2FAllItems%2Easpx&RootFolder=&Opp=" + aId + "'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/actual.gif' style='width:20px;height:20px;'></a></div>";           
            editDatasheetTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Actuals/DataEntry.aspx#InplviewHashab4f77d0-0712-4c2f-a12d-148fe693af8f=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
            newTag = editItemTag + editDatasheetTag;
        }else if(ctx.listName == '{B47B7F5D-31EB-45B8-85AF-452DD1B33540}'){
            //project resources
              editItemTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/NewForm.aspx?Source=https%3A%2F%2Fteamsitesppd%2Ecenovus%2Ecom%2Fapplications%2FOppoturnityLifecycleManagement%2FLists%2FProject%2520Resources%2FAllItems%2Easpx&RootFolder=&Opp=" + aId + "'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/resource.gif' style='width:20px;height:20px;'></a></div>";            
             editDatasheetTag = "<div><a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/DataEntry.aspx#InplviewHash249b8361-2b22-47e3-ab47-ec0dd7b65662=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + aId + "-ShowInGrid%3DTrue'>datasheet</a></div>";
            newTag = editItemTag + editDatasheetTag;
       }else{
            newTag = '';
        }
        
        return newTag;
    }
    
})();

