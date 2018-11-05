sap.ui.jsfragment("SMADJS.view.FirstAidFragment", {
	createContent: function(oController) {
		
		var oText1 = new sap.m.Text({
			text:"I authorise the leader in charge to arrange for my child/ren to receive such first aid and medical treatment, as a trained first aid person may deem necessary."
		});
		
		var oText2 = new sap.m.Text({
			text:"I authorise the calling of an ambulance if this is judged necessary and accept responsibility for all expenses associated with such treatment."
		});
		
		var oText3 = new sap.m.Text({
			text:"I understand that this will be done in conjunction with contacting one of the parents/guardians listed."	
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
		
		var oPanel3 = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText3]
		});
		
		var oButtonAccept = new sap.m.Button({
			text:"Accept",
			type:"Accept",
			press:[oController.handleAcceptFirstAid,oController]
		});
		
		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancelFirstAid,oController]
		});
		
		var oBar = new sap.m.Bar({
			contentRight:[oButtonAccept,oButtonCancel]
		});
		
		var oFirstAidPage = new sap.m.Page({
			title:"First Aid and Safety Policies",
			content: [oPanel, oPanel2, oPanel3],
			showFooter:true,
			footer:[oBar],
			showNavButton:true,
			navButtonTap:[oController.backToWizard,oController]
		});
		
		return [oFirstAidPage];
	}
});