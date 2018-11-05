sap.ui.jsfragment("SMADJS.view.WaitlistFullFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:"Registration and waitlist are full."
		});

		var oText2 = new sap.m.Text({
			text:"We hope to see you next year."
		})

		var oPanel = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText1]
		});

		var oPanel2 = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText2]
		});

		var oWaitlistFullPage = new sap.m.Page({
			title:"{i18n>appTitle}",
			content: [oPanel,oPanel2],
			showFooter: false,
			showNavButton:false
		});

		return [oWaitlistFullPage];
	}
});
