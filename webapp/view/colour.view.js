sap.ui.jsview("SMADJS.view.colour", {

	/** Specifies the Controller belonging to this View.
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.RegoJS
	 */
	getControllerName: function() {
		return "SMADJS.controller.colour";
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
      header: new sap.m.Text({text:"School Year"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Friend Request"})
    });
    columns.push(oColumn);

    var oTable = new sap.m.Table(this.createId("table"), {
      columns: columns,
			mode: sap.m.ListMode.SingleSelectMaster
    });

		var oButtonDownload = new sap.m.Button({
			text:"Download",
			type:"Accept",
			press:[oController.downloadColourGroup,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonDownload]
		});

    var oDetailPage = new sap.m.Page(this.createId("ColourTablePage"),{
			title: "{i18n>titleColourDetailView}",
			content: [oTable],
			showFooter:true,
			footer:[oBar]
		});

		var masterColumns = [];

		oColumn = new sap.m.Column({
			//header: new sap.m.Text({text:"Colour"})
		});
		masterColumns.push(oColumn);

		var oMasterTable = new sap.m.Table(this.createId("masterTable"),{
			columns: masterColumns,
			mode: sap.m.ListMode.SingleSelectMaster
		});

		var oMasterPage = new sap.m.Page(this.createId("ColourMasterPage"),{
			title: "{i18n>titleColourMasterView}",
			content: [oMasterTable]
		});

		var app = new sap.m.SplitApp(this.createId("myColourApp"), {
			initialDetail: oDetailPage,
			initialMaster: oMasterPage
		});
		app.addDetailPage(oDetailPage);
		app.addMasterPage(oMasterPage);
		return app;
  }
});
