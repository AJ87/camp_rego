sap.ui.jsview("SMADJS.view.registration", {

	/** Specifies the Controller belonging to this View.
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.RegoJS
	 */
	getControllerName: function() {
		return "SMADJS.controller.registration";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.RegoJS
	 */
	createContent: function(oController) {

    var columns = [];

    var oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Id"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"First Name"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Last Name"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Mobile"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Email"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Address"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"First Name"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Last Name"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Mobile"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Email"})
    });
    columns.push(oColumn);

    var oTable = new sap.m.Table(this.createId("table"), {
      columns: columns,
			mode: sap.m.ListMode.SingleSelectMaster
    });

		var oButtonWaitlist = new sap.m.Button(
		this.createId("buttonWaitlistSwitch"),
		{
			text:"Waitlist",
			type:"Emphasized",
			press:[oController.switchWaitlist,oController]
		});

		var oButtonDownload = new sap.m.Button({
			text:"Download",
			type:"Accept",
			press:[oController.download,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonWaitlist,oButtonDownload]
		});

    var oPage = new sap.m.Page(this.createId("TablePage"),{
			title: "{i18n>titleRegView}",
			content: [oTable],
			showFooter:true,
			footer:[oBar]
		});

		var app = new sap.m.App(this.createId("myApp"), {
			initialPage: "oPage"
		});
		app.addPage(oPage);
		return app;
  }
});
