sap.ui.jsfragment("SMADJS.view.PreRegoFragment", {
	createContent: function(oController) {

		var oText1 = new sap.m.Text({
			text:"Registration opens 20 October at 10am."
		});

		var oPanel = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText1]
		});

		var oText2 = new sap.m.Text({
			text:"If you would like an email reminder when registration is opening" +
			" submit your email address."
		});

		var oPanel2 = new sap.m.Panel({
			class:"SapUiResponsiveMargin",
			width:"auto",
			content:[oText2]
		});

		// pre-rego form
		oLabel = new sap.m.Label({
			text:"Email Address",
			type:"email",
			required:true
		});
		oInput = new sap.m.Input(this.createId("InputPreRegoEmail"),{
			value:"{/preRego/email}",
		});
		var oSimpleForm = new sap.ui.layout.form.SimpleForm();

		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		var oButtonSubmitEmail = new sap.m.Button({
			text:"Submit",
			type:"Accept",
			press:[oController.handleSubmitEmail,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonSubmitEmail]
		});

		var oPreRegoPage = new sap.m.Page({
			title:"{i18n>appTitle}",
			content: [oPanel, oPanel2, oSimpleForm],
			showFooter:true,
			footer:[oBar],
			showNavButton:false
		});

		return [oPreRegoPage];
	}
});
