sap.ui.jsfragment("SMADJS.view.SubmitFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:oController.message
		});

		var oPanel = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText1]
		});

		if (oController.status === 200) {
			var text2 = "Congratulations you are now registered. Please pay within the week or your spot may be offered to another family. Cost is $80/child for the week. Payment details:\n\n" +
			"Account Name: CANBERRA BAPTIST CHURCH - SMAD CAMP\nBSB: 062 901\nAccount Number: 1021 7815\nReference: Your child/ren's last name" +
			"\n\nYou will receive an email in the next 24 hours. Please do not contact SMAD CAMP before then.";
		} else if (oController.status === 201) {
			text2 = "You will be contacted if a place becomes available.";
		}	else {
			text2 = "Please email smadcamp@hotmail.com";
		}

		var oText2 = new sap.m.Text({
			text:text2
		});

		var oPanel2 = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText2]
		});

		switch (oController.status) {
			case 200: title = "Registration Successful";
				break;
			case 201: title = "Waitlisted Successfully";
				break;
			default: title = "Registration Error";
				break;
		};
		//var title = (oController.status === 200) ? "Registration Successful" : "Registration Error";

		var oSubmitPage = new sap.m.Page({
			title:title,
			content: [oPanel,oPanel2],
			showNavButton:false
		});

		return [oSubmitPage];
	}
});
