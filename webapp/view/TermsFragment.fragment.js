sap.ui.jsfragment("SMADJS.view.TermsFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:"I understand the full SMAD Camp fees and complete registration forms must be received for my child/ren to be enrolled."
		});

		var oButtonAccept = new sap.m.Button({
			text:"Accept",
			type:"Accept",
			press:[oController.handleAcceptTerms,oController]
		});

		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancelTerms,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonAccept,oButtonCancel]
		});

		var oPanel = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText1]
		});

		var oTermsPage = new sap.m.Page({
			title:"Terms of Enrolment",
			content: [oPanel],
			showFooter:true,
			footer:[oBar],
			showNavButton:true,
			navButtonTap:[oController.backToWizard,oController]
		});

		return [oTermsPage];
	}
});
