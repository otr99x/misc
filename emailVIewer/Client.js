function($uibModal, $scope) {
  /* widget controller */
  var c = this;
	c.selectedEmail = null;
	
	c.setSelected = function(email){
		c.selectedEmail = email;
		c.openModal();
	};
	
	c.openModal = function(){
		c.modalInstance = $uibModal.open({
			templateUrl: 'modalTemplate',
			scope: $scope
		});
	};
	
	c.closeModal = function(){
		c.modalInstance.close();
	}
	
	c.update = function(){
		c.server.update();
	}
	
		c.reset = function(){
		c.data.hoursOfEmail = null;
		c.data.subjectContainsText = null;
		c.data.bodyContainsText = null;
		c.data.recipientsContainsText = null;
		c.server.update();
	}

}