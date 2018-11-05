sap.ui.jsfragment("SMADJS.view.PostRegoFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:"Registration is full."
		});

		var oText2 = new sap.m.Text({
			text:"Please click waitlist below to register on the waitlist."
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

		var oButtonWaitlist = new sap.m.Button({
			text:"Register on Waitlist",
			type:"Accept",
			press:[oController.handleWaitlist,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonWaitlist]
		});

		var oPostRegoPage = new sap.m.Page({
			title:"{i18n>appTitle}",
			content: [oPanel,oPanel2],
			showFooter: true,
			footer: [oBar],
			showNavButton:false
		});

		return [oPostRegoPage];
	}
});
