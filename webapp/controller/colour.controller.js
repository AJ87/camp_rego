sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

  return Controller.extend("SMADJS.controller.colour", {
		onInit: function() {
			this._currentColour = 'unassigned';
			this._oApp = this.getView().byId("myColourApp");
			this._oDetailPage = this.getView().byId("ColourTablePage");
			this._oMasterPage = this.getView().byId("ColourMasterPage");

			this.getMasterTableData();

			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {
						var oModel = new JSONModel({regos: jQuery.parseJSON(this.response)});
						that.getView().setModel(oModel);
						oModel.setSizeLimit(500);

						that.getView().byId("table").bindAggregation("items",{
							path: "/regos",
							template: new sap.m.ColumnListItem({
			        	cells: [
			          	new sap.m.Text({text:"{id}"}),
			          	new sap.m.Text({text:"{firstName}"}),
			          	new sap.m.Text({text:"{lastName}"}),
									new sap.m.Text({text:"{year}"}),
									new sap.m.Text({text:"{friend}"})
			        	]
			      	})
						}).attachSelectionChange(that.rowSelection,that);
					} else {
						var message = "Submission failed";
					}
				}
			};

			xhttp.open("GET", "/colour/unassigned", true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();

		},
		getMasterTableData: function() {
			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {
						var oMasterModel = new JSONModel({colours: jQuery.parseJSON(this.response)});
						that.getView().setModel(oMasterModel,"masterModel");

						that.getView().byId("masterTable").bindAggregation("items",{
							path: "masterModel>/colours",
							template: new sap.m.ColumnListItem({
								cells: [
									new sap.m.Text({text:"{masterModel>colour}"})
								]
							})
						}).attachSelectionChange(that.masterRowSelection,that);
					} else {
						var message = "Submission failed";
					}
				}
			};

			xhttp.open("GET", "/colourgroup/metadata", true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		masterRowSelection: function(oEvent) {
			var oMasterSelectedItem = oEvent.getParameter("listItem");
			var sItem = oMasterSelectedItem.getBindingContext("masterModel").getProperty("colour");
			var colour;

			var name = sItem.slice(0,(sItem.indexOf("(")-1));

			this._oDetailPage.setTitle(`${name} Children`);

			colour = this.getColourId(sItem);
			this._currentColour = colour;
			this.getColour(colour);

		},
		getColourId: function(data) {
			var colour;
			if (data.indexOf("(") > 0) {
				var name = data.slice(0,(data.indexOf("(")-1));
			} else {
				name = data;
			}
			switch (name) {
				case 'Unassigned':
					colour = 'unassigned';
					break;
				case 'Maroon':
					colour = 'maroon';
					break;
				case 'Red':
					colour = 'red';
					break;
				case 'Orange':
					colour = 'orange';
					break;
				case 'Yellow':
					colour = 'yellow';
					break;
				case 'Light Green':
					colour = 'lightgreen';
					break;
				case 'Dark Green':
					colour = 'darkgreen';
					break;
				case 'Light Blue':
					colour = 'lightblue';
					break;
				case 'Dark Blue':
					colour = 'darkblue';
					break;
				case 'Light Purple':
					colour = 'lightpurple';
					break;
				case 'Dark Purple':
					colour = 'darkpurple';
					break;
				case 'Light Pink':
					colour = 'lightpink';
					break;
				case 'Dark Pink':
					colour = 'darkpink';
					break;
			}

			return colour;
		},
		getColour: function(colour) {
			var url = "/colour/" + colour;

			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {

						console.log(jQuery.parseJSON(this.response));

						var oModel = new JSONModel({regos: jQuery.parseJSON(this.response)});
						that.getView().setModel(oModel);

						that.getView().byId("table").bindAggregation("items",{
							path: "/regos",
							template: new sap.m.ColumnListItem({
								cells: [
									new sap.m.Text({text:"{id}"}),
									new sap.m.Text({text:"{firstName}"}),
									new sap.m.Text({text:"{lastName}"}),
									new sap.m.Text({text:"{year}"}),
									new sap.m.Text({text:"{friend}"})
								]
							})
						}).attachSelectionChange(that.rowSelection,that);

					} else {
						var message = "Submission failed";
					}
				}
			};

			xhttp.open("GET", url, true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		rowSelection: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem");
			var sItemId = oSelectedItem.getBindingContext().getProperty("id");
			var name = oSelectedItem.getBindingContext().getProperty("firstName");
			this._currentId = sItemId;
			this._currentName = name;

			if (!this._oDialog) {
				this._oDialog = sap.ui.jsfragment("SMADJS.view.SelectFragment", this);
			}

			this._oDialog.open();

		},
		confirm: function(oEvent) {
			var oSelectedItem = oEvent.getParameters().selectedItem;
			var sItem = oSelectedItem.getTitle();
			var colour = this.getColourId(sItem);

			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {
						that.getColour(that._currentColour);
						that.getMasterTableData();
					} else {
						var message = "Submission failed";
					}
				}
			};

			var url = `/rego/${this._currentId}/child/${this._currentName}?colour=${colour}`;

			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		downloadColourGroup: function() {
			let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      //Create a DOMString representing the blob
      //and point the link element towards it
      let url = `/colourgroup/download?colour=${this._currentColour}`;
      a.href = url;
      a.download = `${this._currentColour}.csv`;
      //programatically click the link to trigger the download
      a.click();
		}
  });
});
