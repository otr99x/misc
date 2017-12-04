(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Summary_x0020_Page':{'View': RenderSummaryItem}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();


function RenderSummaryItem(ctx)
{
     var id = ctx.CurrentItem.ID;
    return "<a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/SitePages/Opportunity%20Summary.aspx?Opp=" + id + "'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/summary.gif' style='width:32px;height:32px;'></a>";
}

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Forecast':{'View': RenderForecastItem}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();


function RenderForecastItem(ctx)
{
     var id = ctx.CurrentItem.ID;
    return "<a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Forecasts/DataEntry.aspx#InplviewHash3802c4f8-39ad-4fd6-a97c-eee9e5b26170=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + id + "-ShowInGrid%3DTrue'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/forecast.gif' style='width:20px;height:20px;'></a>";
}

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'Actual':{'View': RenderActualItem}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();


function RenderActualItem(ctx)
{
     var id = ctx.CurrentItem.ID;
    return "<a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Actuals/DataEntry.aspx#InplviewHashab4f77d0-0712-4c2f-a12d-148fe693af8f=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + id + "-ShowInGrid%3DTrue'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/actual.gif' style='width:20px;height:20px;'></a>";
}

(function () {
     var overrideCtx = {};
     overrideCtx.Templates = {};
     overrideCtx.Templates.Fields = {'AddResource':{'View': RenderResourceItem}}; 
	 SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();


function RenderResourceItem(ctx)
{
     var id = ctx.CurrentItem.ID;
    return "<a href='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Lists/Project%20Resources/DataEntry.aspx#InplviewHash249b8361-2b22-47e3-ab47-ec0dd7b65662=FilterField1%3DOpportunity%255Fx003a%255FID-FilterValue1%3D" + id + "-ShowInGrid%3DTrue'><img src='https://teamsitesppd.cenovus.com/applications/OppoturnityLifecycleManagement/Images1/resource.gif' style='width:20px;height:20px;'></a>";
}



