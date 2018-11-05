sap.ui.jsfragment("SMADJS.view.RefundFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:"I understand that once registered I will only be able to get a 75% refund of the cost of SMAD Camp if my child's place can be filled."
		});

		var oPanel = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText1]
		});

		var oButtonAccept = new sap.m.Button({
			text:"Accept",
			type:"Accept",
			press:[oController.handleAcceptRefund,oController]
		});

		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancelRefund,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonAccept,oButtonCancel]
		});

		var oRefundPage = new sap.m.Page({
			title:"Terms of Enrolment",
			content: [oPanel],
			showFooter:true,
			footer:[oBar],
			showNavButton:true,
			navButtonTap:[oController.backToWizard,oController]
		});

		return [oRefundPage];
	}
});
