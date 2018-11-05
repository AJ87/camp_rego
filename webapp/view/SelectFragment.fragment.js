sap.ui.jsfragment("SMADJS.view.SelectFragment", {
	createContent: function(oController) {

    var list = [];

    var oItem = new sap.m.StandardListItem({
      title:'Unassigned'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Maroon'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Red'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Orange'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Yellow'
    });
    list.push(oItem);
    
    oItem = new sap.m.StandardListItem({
      title:'Light Green'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Dark Green'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Light Blue'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Dark Blue'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Light Purple'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Dark Purple'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Light Pink'
    });
    list.push(oItem);

    oItem = new sap.m.StandardListItem({
      title:'Dark Pink'
    });
    list.push(oItem);

		var oSelectDialog = new sap.m.SelectDialog(this.createId("SelectDialog"),{
			title:"Assign Colour",
      confirm:[oController.confirm,oController],
      items:list
		});

		return [oSelectDialog];
	}
});
