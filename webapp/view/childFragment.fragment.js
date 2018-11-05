sap.ui.jsfragment("SMADJS.view.childFragment", {
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
			header: new sap.m.Text({text:"Preferred Name"})
		});
		columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Birthdate"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Gender"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"School"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Year"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Friend Request"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Shirt Size"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Medicare Card"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Number on Card"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Asthma"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Epipen"})
    });
    columns.push(oColumn);

    oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Allergies"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
      header: new sap.m.Text({text:"Medication"})
    });
    columns.push(oColumn);

		oColumn = new sap.m.Column({
			header: new sap.m.Text({text:"Medical Info"})
		});
		columns.push(oColumn);

    var oTable = new sap.m.Table(this.createId("childTable"), {
      columns: columns,
    });

		var oButtonDownload = new sap.m.Button({
			text:"Download",
			type:"Accept",
			press:[oController.downloadChild,oController]
		});

		var oButtonRegister = new sap.m.Button({
			text:"Register",
			type:"Emphasized",
			press:[oController.register,oController],
			visible:oController._waitlist
		});

		var oButtonUnregister = new sap.m.Button({
			text:"Unregister",
			type:"Emphasized",
			press:[oController.unregister,oController],
			visible:!oController._waitlist
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonUnregister,oButtonRegister,oButtonDownload]
		});

    var oChildPage = new sap.m.Page(this.createId("ChildTablePage"),{
			title: "{i18n>titleChildView}",
			content: [oTable],
			showNavButton:true,
			navButtonTap:[oController.backToRegistrations,oController],
			showFooter: true,
			footer: [oBar]
		});

		return [oChildPage];
	}
});
