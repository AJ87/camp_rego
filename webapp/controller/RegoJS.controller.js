sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller,JSONModel,MessageBox) {
	"use strict";

	return Controller.extend("SMADJS.controller.RegoJS", {
		onInit: function() {
			this._wizard = this.getView().byId("RegoWizard");
			this._oApp = this.getView().byId("myApp");
			this._oPage = this.getView().byId("WizardPage");

			this.oModel = new sap.ui.model.json.JSONModel({
				parent1:{},
				parent2:{},
				child:[{}],
				consent:{},
				preRego:{}
			});
			this.getView().setModel(this.oModel);

			this._waitlist = false;

			this._oWizardTermsPage = sap.ui.jsfragment("SMADJS.view.TermsFragment", this);
			this._oApp.addPage(this._oWizardTermsPage);

			this._oWizardFirstAidPage = sap.ui.jsfragment("SMADJS.view.FirstAidFragment", this);
			this._oApp.addPage(this._oWizardFirstAidPage);

			this._oWizardPrivacyPage = sap.ui.jsfragment("SMADJS.view.PrivacyFragment", this);
			this._oApp.addPage(this._oWizardPrivacyPage);

			this._oWizardRefundPage = sap.ui.jsfragment("SMADJS.view.RefundFragment", this);
			this._oApp.addPage(this._oWizardRefundPage);

			this._oWizardPreRegoPage = sap.ui.jsfragment("SMADJS.view.PreRegoFragment", this);
			this._oApp.addPage(this._oWizardPreRegoPage);

			this._oWizardPostRegoPage = sap.ui.jsfragment("SMADJS.view.PostRegoFragment", this);
			this._oApp.addPage(this._oWizardPostRegoPage);

			this._oWizardWaitlistFullPage = sap.ui.jsfragment("SMADJS.view.WaitlistFullFragment", this);
			this._oApp.addPage(this._oWizardWaitlistFullPage);

			var oDate = new Date();
			var preRego = false;

			// for testing - comment out for live
			//oDate = new Date("October 20, 2018 10:00:00");

			this._overridePre = false;
			// override pre rego being closed
			this._sValue = jQuery.sap.getUriParameters().get("regoID");
			if (this._sValue === '4kgiKU-FDiDknk9-kdi-932fKF-dKD98D9ldkD') {
				this._overridePre = true;
			}

			// need to check year here
			var year = oDate.getYear() + 1900; // years start counting from 1900
			if (year < 2019 && this._overridePre === false) { // year of SMAD camp
				if (oDate.getMonth() < 9) { // October - months start from 0
					this._oApp.to(this._oWizardPreRegoPage);
					preRego = true;
				} else {
					if (oDate.getMonth() === 9 && oDate.getDate() < 20) { //day of month
						this._oApp.to(this._oWizardPreRegoPage);
						preRego = true;
					} else {
						if (oDate.getDate() === 20 && oDate.getHours() < 10) {
							this._oApp.to(this._oWizardPreRegoPage);
							preRego = true;
						}
					}
				}
			}

			if (preRego == false) {

				var that = this;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status === 200) {

						} else if (this.status === 503) {
							var message = "Registration and waitlist full";
							that._oApp.to(that._oWizardWaitlistFullPage);
						} else {
							var message = "Registration full";
							that._oApp.to(that._oWizardPostRegoPage);
						}
					}
				};

				this._sValue = jQuery.sap.getUriParameters().get("regoID");

				xhttp.open("GET", "/numberOfChildren?regoID=" + this._sValue, true);
				xhttp.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
				xhttp.send();

			}

		},
		infoValidation: function() {
			var firstNameEl = this.getView().byId("InputParent1FirstName");
			var lastNameEl = this.getView().byId("InputParent1LastName");
			var mobileEl = this.getView().byId("InputParent1Mobile");
			var emailEl = this.getView().byId("InputParent1Email");
			var addressEl = this.getView().byId("InputParent1Address");
			var firstName = firstNameEl.getValue();
			var lastName = lastNameEl.getValue();
			var mobile = mobileEl.getValue();
			var email = emailEl.getValue();
			var address = addressEl.getValue();

			if	(this.getView().children.getChildFormArray().length === 0) {
				this.getView().children.addChild(this.getView());
			}

			this.setValueState(this.validateText(firstName), firstNameEl);
			this.setValueState(this.validateText(lastName), lastNameEl);
			this.setValueState(this.validateText(address), addressEl);
			this.setValueState(this.validateNumber(mobile,10), mobileEl);
			this.setValueState(this.validateEmail(email), emailEl);

			if (this.validateText(firstName) && this.validateText(lastName) &&
				this.validateNumber(mobile,10) && this.validateEmail(email) &&
				this.validateText(address)) {
				this._wizard.validateStep(this.getView().byId("WizardStepParent1"));
				this.selected();
			} else {
				this._wizard.invalidateStep(this.getView().byId("WizardStepParent1"));
				this._wizard.invalidateStep(this.getView().byId("WizardStepConsent"));
			}
		},
		childValidation: function() {
			var formArray = this.getView().children.getChildFormArray();
			var valid = true;
			for (var i = 0; i < formArray.length; i++) {
				var cId = formArray[i];

				//firstname
				var firstNameEl = this.getView().byId("InputChildFirstName" + cId.slice(-1));
				var firstName = firstNameEl.getValue();
				this.setValueState(this.validateText(firstName), firstNameEl);
				if (!(this.validateText(firstName))) {
					valid = false;
				}

				//lastname
				var lastNameEl = this.getView().byId("InputChildLastName" + cId.slice(-1));
				var lastName = lastNameEl.getValue();
				this.setValueState(this.validateText(lastName), lastNameEl);
				if (!(this.validateText(lastName))) {
					valid = false;
				}

				//preferred name
				var preferredNameEl = this.getView().byId("InputChildPreferredName" + cId.slice(-1));
				var preferredName = preferredNameEl.getValue();
				this.setValueState(this.validateText(preferredName), preferredNameEl);
				if (!(this.validateText(preferredName))) {
					valid = false;
				}

				//birthdate
				var birthdateEl = this.getView().byId("InputChildBirthdate" + cId.slice(-1));
				var birthdate = birthdateEl.getDateValue();
				this.setValueState(this.validateDate(birthdate), birthdateEl);
				if (!(this.validateDate(birthdate))) {
					valid = false;
				}

				//gender
				var genderEl = this.getView().byId("InputChildGender" + cId.slice(-1));
				var gender = genderEl.getSelectedKey();
				this.setValueState(this.validateText(gender), genderEl);
				if (!(this.validateText(gender))) {
					valid = false;
				}

				//school
				var schoolEl = this.getView().byId("InputChildSchool" + cId.slice(-1));
				var school = schoolEl.getValue();
				this.setValueState(this.validateText(school), schoolEl);
				if (!(this.validateText(school))) {
					valid = false;
				}

				//year
				var yearEl = this.getView().byId("InputChildYear" + cId.slice(-1));
				var year = yearEl.getSelectedKey();
				this.setValueState(this.validateText(year), yearEl);
				if (!(this.validateText(year))) {
					valid = false;
				}

				//medicare number
				var medicare1El = this.getView().byId("InputChildMedicare1" + cId.slice(-1));
				var medicare1 = medicare1El.getValue();
				this.setValueState(this.validateNumber(medicare1,10), medicare1El);
				if (!(this.validateNumber(medicare1,10))) {
					valid = false;
				}

				//medicare number on card
				var medicare2El = this.getView().byId("InputChildMedicare2" + cId.slice(-1));
				var medicare2 = medicare2El.getValue();
				this.setValueState(this.validateNumber(medicare2,1), medicare2El);
				if (!(this.validateNumber(medicare2,1))) {
					valid = false;
				}
			}
			if (valid) {
				if (this._wizard.getProgress() !== 4) {
					this.showButtonNextStep();
				}
				this.selected();
			} else {
				this.hideButtonNextStep();
				this._wizard.invalidateStep(this.getView().byId("WizardStepConsent"));
			}
		},
		optionalValidation: function() {
			var valid = true;
			var mobileEl = this.getView().byId("InputParent2Mobile");
			var mobile = mobileEl.getValue();
			this.setValueState(this.validateNumber(mobile,10,true), mobileEl);
			if (!(this.validateNumber(mobile,10,true))) {
				valid = false;
			}
			var emailEl = this.getView().byId("InputParent2Email");
			var email = emailEl.getValue();
			this.setValueState(this.validateEmail(email,true), emailEl);
			if (!(this.validateEmail(email,true))) {
				valid = false;
			}

			return valid;
		},
		showButtonNextStep: function() {
			this.getView().byId("ButtonChildNextStep").setVisible(true);
		},
		hideButtonNextStep: function() {
			this.getView().byId("ButtonChildNextStep").setVisible(false);
		},
		nextStep: function() {
			this._wizard.nextStep();
			this.hideButtonNextStep();
		},
		addChild: function() {
			var oChildModel = this.oModel.getProperty("/child/");
			oChildModel.push({});

			this.getView().children.addChild(this.getView());
			this.childValidation();
		},
		removeChild: function() {
			var oChildModel = this.oModel.getProperty("/child/");
			oChildModel.pop();

			this.getView().children.removeChild(this.getView());
			this.childValidation();
		},
		selected: function() {
			var termsSelectedEl = this.getView().byId("ConsentCBTerms");
			var firstAidSelectedEl = this.getView().byId("ConsentCBFirstAid");
			var privacySelectedEl = this.getView().byId("ConsentCBPrivacy");
			var refundSelectedEl = this.getView().byId("ConsentCBRefund");
			var termsSelected = termsSelectedEl.getSelected();
			var firstAidSelected = firstAidSelectedEl.getSelected();
			var privacySelected = privacySelectedEl.getSelected();
			var refundSelected = refundSelectedEl.getSelected();

			this.setValueState(termsSelected, termsSelectedEl);
			this.setValueState(firstAidSelected, firstAidSelectedEl);
			this.setValueState(privacySelected, privacySelectedEl);
			this.setValueState(refundSelected, refundSelectedEl);

			if (termsSelected && firstAidSelected && privacySelected && refundSelected) {
				this._wizard.validateStep(this.getView().byId("WizardStepConsent"));
			} else {
				this._wizard.invalidateStep(this.getView().byId("WizardStepConsent"));
			}
		},
		terms: function() {
			this._oApp.to(this._oWizardTermsPage);
		},
		firstAid: function() {
			this._oApp.to(this._oWizardFirstAidPage);
		},
		privacy: function() {
			this._oApp.to(this._oWizardPrivacyPage);
		},
		refund: function() {
			this._oApp.to(this._oWizardRefundPage);
		},
		wizardCompleted: function() {

			var valid = this.optionalValidation();

			if (!valid) {
				this._wizard.goToStep(this._wizard.getSteps()[1],true);
				return false;
			}

			if (this._oWizardReviewPage) {
				this._oWizardReviewPage.destroy();
			}

			this._oWizardReviewPage = sap.ui.jsfragment("SMADJS.view.ReviewFragment", this);
			this._oApp.addPage(this._oWizardReviewPage);

			this._oApp.to(this._oWizardReviewPage);
		},
		backToWizard: function() {
			this._oApp.backToPage(this._oPage.getId());
		},
		handleAcceptTerms: function() {
			this.getView().byId("ConsentCBTerms").setProperty("selected",true);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleCancelTerms: function() {
			this.getView().byId("ConsentCBTerms").setProperty("selected",false);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleAcceptFirstAid: function() {
			this.getView().byId("ConsentCBFirstAid").setProperty("selected",true);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleCancelFirstAid: function() {
			this.getView().byId("ConsentCBFirstAid").setProperty("selected",false);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleAcceptPrivacy: function() {
			this.getView().byId("ConsentCBPrivacy").setProperty("selected",true);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleCancelPrivacy: function() {
			this.getView().byId("ConsentCBPrivacy").setProperty("selected",false);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleAcceptRefund: function() {
			this.getView().byId("ConsentCBRefund").setProperty("selected",true);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleCancelRefund: function() {
			this.getView().byId("ConsentCBRefund").setProperty("selected",false);
			this.selected();
			this._oApp.backToPage(this._oPage.getId());
		},
		handleAcceptReview: function() {
			var submitCallback = function() {
				var that = this;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4) {
						that.status = this.status;
						if (this.status === 200) {
							var message = "Successfully submitted registration";
							that.message = message;
							that._oWizardSubmitPage = sap.ui.jsfragment("SMADJS.view.SubmitFragment", that);
							that._oApp.addPage(that._oWizardSubmitPage);
							that._oApp.to(that._oWizardSubmitPage);
						} else if (this.status === 201) {
							var message = "Successfully registered on waitlist";
							that.message = message;
							that._oWizardSubmitPage = sap.ui.jsfragment("SMADJS.view.SubmitFragment", that);
							that._oApp.addPage(that._oWizardSubmitPage);
							that._oApp.to(that._oWizardSubmitPage);
						} else if (this.status === 503) {
							message = "Registration is full";
							that._oApp.to(that._oWizardWaitlistFullPage);
						} else {
							message = "Submission failed";
							that.message = message;
							that._oWizardSubmitPage = sap.ui.jsfragment("SMADJS.view.SubmitFragment", that);
							that._oApp.addPage(that._oWizardSubmitPage);
							that._oApp.to(that._oWizardSubmitPage);
						}
					}
				};

				if (this._waitlist) {
					xhttp.open("POST", `/rego?waitlist=true&regoID=${this._sValue}`, true);
				} else {
					xhttp.open("POST", `/rego?waitlist=false&regoID=${this._sValue}`, true);
				}
				xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
				xhttp.send(this.oModel.getJSON());
			};

			var part = this._waitlist ? ' for waitlist?' : '?';
			var msg = `Are you sure you want to submit this registration${part}`;
			this._handleMessageBoxOpen.call(this,msg, "confirm", submitCallback);
		},
		handleCancelReview: function() {
			var cancelCallback = function() {
				this._oApp.backToPage(this._oPage.getId());
			};

			this._handleMessageBoxOpen.call(this,"Are you sure you want to cancel the review?", "warning", cancelCallback);
		},
		handleSubmitEmail: function() {
			var email = this.oModel.oData.preRego.email;

			if (this.validateEmail(email)) {

				var that = this;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status === 200) {
							var message = "Successfully submitted email";
							that.message = message;
							that.status = 200;
							that._oWizardSubmitEmailPage = sap.ui.jsfragment("SMADJS.view.SubmitEmailFragment", that);
							that._oApp.addPage(that._oWizardSubmitEmailPage);
							that._oApp.to(that._oWizardSubmitEmailPage);
						} else if (this.status === 500) {
							message = "Failed to submit email";
							that.message = message;
							that.status = 500;
							that._oWizardSubmitEmailPage = sap.ui.jsfragment("SMADJS.view.SubmitEmailFragment", that);
							that._oApp.addPage(that._oWizardSubmitEmailPage);
							that._oApp.to(that._oWizardSubmitEmailPage);
						}
					}
				};

				var emailTxt = `"${email}"`;
				var data = JSON.stringify({"email":email});
				xhttp.open("POST", "/preRegistration", true);
				xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xhttp.send(data);

			} else {
				var that = this;
				MessageBox["warning"]("Invalid email",{
					actions:[MessageBox.Action.OK]
				});
			}
		},
		handleWaitlist: function() {
			this._waitlist = true;
			this._oApp.backToPage(this._oPage.getId());
		},
		handleCancel: function() {
			var cancelCallback = function() {
				this._handleNavigationToStep(0);
				this.discardProgress(this._wizard.getSteps()[0]);
				this.infoValidation();
			};

			this._handleMessageBoxOpen.call(this,"Are you sure you want to cancel your registration? This will clear all entered data.", "warning", cancelCallback);
		},
		handleHelp: function() {
			sap.m.URLHelper.triggerEmail("smadcamp@hotmail.com","Registration Help Request","Dear SMAD Camp,\n\nI am having trouble with the following problem...");
		},
		editStep1: function() {
			this._handleNavigationToStep(0);
		},
		editStep2: function() {
			this._handleNavigationToStep(1);
		},
		editStep3: function() {
			this._handleNavigationToStep(2);
		},
		editStep4: function() {
			this._handleNavigationToStep(3);
		},
		_handleNavigationToStep : function (iStepNumber) {
			var that = this;
			function fnAfterNavigate () {
				that._wizard.goToStep(that._wizard.getSteps()[iStepNumber],true);
				that._oApp.detachAfterNavigate(fnAfterNavigate);
			}

			this._oApp.attachAfterNavigate(fnAfterNavigate);
			this.backToWizard();
		},
		_handleMessageBoxOpen: function(sMessage,sMessageBoxType,callback) {
			var that = this;
			MessageBox[sMessageBoxType](sMessage,{
				actions:[MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						callback.call(that);
					}
				}
			});
		},
		discardProgress: function() {
			this._wizard.discardProgress(this.getView().byId("WizardStepParent1"));

			var clearContent = function (content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};

			clearContent(this._wizard.getSteps());
		},
		validateText: function(text) {
			if (text.length > 0) {
				return true;
			}
			return false;
		},
		validateNumber: function(number,length,optional) {
			if (optional && number === "") {
				return true;
			}
			var regex = new RegExp("^\\d{" + length + "}$");
			if (regex.test(number)) {
				return true;
			}
			return false;
		},
		validateEmail: function(email,optional) {
			if (optional && email === "") {
				return true;
			}
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    			return true;
			}
    		return false;
		},
		validateDate: function(date) {
			if (date === null) {
				return false;
			}
			return true;
		},
		setValueState: function(condition,element) {
			if (condition) {
				element.setValueState("None");
			} else {
				element.setValueState("Error");
			}
		}
	});
});
