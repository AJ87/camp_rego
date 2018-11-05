sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

  return Controller.extend("SMADJS.controller.registration", {
		onInit: function() {
			if (this._waitlist === null) {
				this._waitlist = false;
			}
			this._childCalled = false;

			this._oApp = this.getView().byId("myApp");
			this._oPage = this.getView().byId("TablePage");

			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {
						var oModel = new JSONModel({regos: jQuery.parseJSON(this.response)});
						that.getView().setModel(oModel);

						that.getView().byId("table").bindAggregation("items",{
							path: "/regos",
							template: new sap.m.ColumnListItem({
			        	cells: [
			          	new sap.m.Text({text:"{parent1/id}"}),
			          	new sap.m.Text({text:"{parent1/firstName}"}),
			          	new sap.m.Text({text:"{parent1/lastName}"}),
									new sap.m.Text({text:"{parent1/mobile}"}),
									new sap.m.Text({text:"{parent1/email}"}),
									new sap.m.Text({text:"{parent1/address}"}),

									new sap.m.Text({text:"{parent2/firstName}"}),
			          	new sap.m.Text({text:"{parent2/lastName}"}),
									new sap.m.Text({text:"{parent2/mobile}"}),
									new sap.m.Text({text:"{parent2/email}"})
			        	]
			      	})
						}).attachSelectionChange(that.rowSelection,that);
					} else {
						var message = "Submission failed";
					}
				}
			};
			if (this._waitlist) {
				xhttp.open("POST", "/registrations?waitlist=true", true);
			} else {
				xhttp.open("POST", "/registrations?waitlist=false", true);
			}
			//xhttp.open("POST", "/registrations?waitlist=false", true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();

		},
		switchWaitlist: function() {
			this._waitlist = this._waitlist ? false : true;

			var text = this._waitlist ? 'Registered' : 'Waitlist';
			var button = this.getView().byId("buttonWaitlistSwitch");
			button.setText(text);

			this.onInit();
		},
		backToRegistrations: function() {
			this._oApp.backToPage(this._oPage.getId());
			this.onInit();
		},
		rowSelection: function(oEvent) {
			if (this._childCalled === true) {
				return;
			}
			this._childCalled = true;

			var oSelectedItem = oEvent.getParameter("listItem");
			var sItemId = oSelectedItem.getBindingContext().getProperty("parent1/id");
			var url = "/registration/" + sItemId;

			if (this._oChildPage) {
				this._oChildPage.destroy();
			}
			this._oChildPage = sap.ui.jsfragment("SMADJS.view.childFragment", this);
			this._oApp.addPage(this._oChildPage);
			this._oApp.to(this._oChildPage);

			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {
						var childData = jQuery.parseJSON(this.response);

						for (var child of childData) {
							console.log(child);
							var allergyList = '';
							if (child["allergy-egg"]) {
								allergyList = allergyList + 'Egg, ';
							}
							if (child["allergy-nuts"]) {
								allergyList = allergyList + 'Nuts, ';
							}
							if (child["allergy-gluten"]) {
								allergyList = allergyList + 'Gluten, ';
							}
							if (child["allergy-lactose"]) {
								allergyList = allergyList + 'Lactose, ';
							}
							if (child["allergy-other"]) {
								allergyList = allergyList + child["allergy-other"] + ', ';
							}
							console.log(allergyList);
							child.allergies = allergyList.slice(0,(allergyList.length - 2));
						}

						that.childModel = new JSONModel({child: childData});
						that._oChildPage.setModel(that.childModel);

						sap.ui.getCore().byId("childTable").bindAggregation("items",{
							path: "/child",
							template: new sap.m.ColumnListItem({
			        	cells: [
			          	new sap.m.Text({text:"{id}"}),
			          	new sap.m.Text({text:"{firstName}"}),
			          	new sap.m.Text({text:"{lastName}"}),
			          	new sap.m.Text({text:"{preferredName}"}),
									new sap.m.Text({text:"{birthdate}"}),
									new sap.m.Text({text:"{gender}"}),
									new sap.m.Text({text:"{school}"}),
									new sap.m.Text({text:"{year}"}),
			          	new sap.m.Text({text:"{friend}"}),
									new sap.m.Text({text:"{shirt}"}),
									new sap.m.Text({text:"{medicare1}"}),
									new sap.m.Text({text:"{medicare2}"}),
									new sap.m.Text({text:"{asthma}"}),
									new sap.m.Text({text:"{epipen}"}),
									new sap.m.Text({text:"{allergies}"}),
									new sap.m.Text({text:"{medication-yes}"}),
									new sap.m.Text({text:"{medicalInfo}"})
			        	]
			      	})
						});
					} else {
						var message = "Submission failed";
					}
				}
			};

			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		register: function() {
			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {

					} else {

					}
				}
			};

			var id = this.childModel.getProperty("/child/0/id/");

			xhttp.open("POST", `registerFromWaitlist?regoID=${id}`, true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		unregister: function() {
			var that = this;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4) {
					that.status = this.status;
					if (this.status === 200) {

					} else {

					}
				}
			};

			var id = this.childModel.getProperty("/child/0/id/");

			xhttp.open("POST", `unregister?regoID=${id}`, true);
			xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhttp.send();
		},
		download: function() {
			let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      //Create a DOMString representing the blob
      //and point the link element towards it
      let url = "/registrations/download";
      a.href = url;
      a.download = 'registrations.csv';
      //programatically click the link to trigger the download
      a.click();
		},
		downloadChild: function() {
			let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      //Create a DOMString representing the blob
      //and point the link element towards it
      let url = "/registrations/downloadChild";
      a.href = url;
      a.download = 'SMADchildren.csv';
      //programatically click the link to trigger the download
      a.click();
		}
  });
});
