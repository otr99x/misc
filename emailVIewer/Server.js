(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	var gr = new GlideRecord('sys_email');
	gr.addQuery("type", "sent");
	gr.addQuery("notification_type", "SMTP");
	
	if(input && input.recipientsContainsText){
		gr.addEncodedQuery('recipientsLIKE' + input.recipientsContainsText);
	}
	
	if(input && input.subjectContainsText){
		gr.addEncodedQuery('subjectLIKE' + input.subjectContainsText);
	}
	
	if(input && input.bodyContainsText){
		gr.addEncodedQuery('bodyLIKE' + input.bodyContainsText);
	}

	data.hoursOfEmail = 24;
	if(input && input.hoursOfEmail){
		data.hoursOfEmail = input.hoursOfEmail;
	}
	
	try{
		var today = new GlideDateTime();
		var yesterday = new GlideDateTime();
		yesterday.subtract(data.hoursOfEmail * 60 * 60 * 1000);
		gr.addEncodedQuery('sys_created_on<='+today.getValue()+'^sys_created_on>='+yesterday.getValue());

	}catch(error){
			gs.info('JC ---- error : ' + error);
		}
	
	gr.orderByDesc("sys_created_on");
	gr.query();
	var rowCount = gr.getRowCount();
	data.emailItems = [];
	
	while (gr.next()) {	
		var item = {};
		item.subject = gr.getValue('subject');
		item.recipients = gr.getValue('recipients')
		item.shortbody = gr.getValue('body').substring(0,100);
		item.body = gr.getValue('body');
		item.created = gr.getValue('sys_created_on');
		data.emailItems.push(item);
	}

})();