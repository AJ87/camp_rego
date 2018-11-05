sap.ui.jsfragment("SMADJS.view.SubmitEmailFragment", {
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
			var text2 = "You will receive an email informing you when registration will open";
		} else {
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

		var title = (oController.status === 200) ? "Submission Successful" : "Submission Error";

		var oSubmitEmailPage = new sap.m.Page({
			title:title,
			content: [oPanel,oPanel2],
			showNavButton:false
		});

		return [oSubmitEmailPage];
	}
});
