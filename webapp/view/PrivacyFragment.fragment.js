sap.ui.jsfragment("SMADJS.view.PrivacyFragment", {
	createContent: function(oController) {
		
		var oText1 = new sap.m.Text({
			text:"I give permission for SMAD Camp to use my child's voice, testimonial, and picture (without name) in any type of promotional material (Church website, newsletters, bulletins and brochures) about SMAD Camp."
		});
		
		var oText2 = new sap.m.Text({
			text:" I understand I must notify the directors in writing if this is unacceptable."
		});
		
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
		
		var oButtonAccept = new sap.m.Button({
			text:"Accept",
			type:"Accept",
			press:[oController.handleAcceptPrivacy,oController]
		});
		
		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancelPrivacy,oController]
		});
		
		var oBar = new sap.m.Bar({
			contentRight:[oButtonAccept,oButtonCancel]
		});
		
		var oPrivacyPage = new sap.m.Page({
			title:"Privacy Policy",
			content: [oPanel,oPanel2],
			showFooter:true,
			footer:[oBar],
			showNavButton:true,
			navButtonTap:[oController.backToWizard,oController]
		});
		
		return [oPrivacyPage];
	}
});