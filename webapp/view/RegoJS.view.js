sap.ui.jsview("SMADJS.view.RegoJS", {

	/** Specifies the Controller belonging to this View.
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.RegoJS
	 */
	getControllerName: function() {
		return "SMADJS.controller.RegoJS";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.RegoJS
	 */
	createContent: function(oController) {

		// parent 1 form
		var oLabel = new sap.m.Label({
			text:"First Name",
			required:true
		});
		var oInput = new sap.m.Input(this.createId("InputParent1FirstName"),{
			liveChange:[oController.infoValidation,oController],
			value:"{/parent1/firstName}",
			valueStateText:"Required"
		});
		var oSimpleForm = new sap.ui.layout.form.SimpleForm();

		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Last Name",
			required:true
		});
		oInput = new sap.m.Input(this.createId("InputParent1LastName"),{
			liveChange:[oController.infoValidation,oController],
			value:"{/parent1/lastName}",
			valueStateText:"Required"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Mobile Number",
			type:"number",
			required:true
		});
		oInput = new sap.m.Input(this.createId("InputParent1Mobile"),{
			liveChange:[oController.infoValidation,oController],
			value:"{/parent1/mobile}",
			valueStateText:"Must be 10 digits"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Email Address",
			type:"email",
			required:true
		});
		oInput = new sap.m.Input(this.createId("InputParent1Email"),{
			liveChange:[oController.infoValidation,oController],
			value:"{/parent1/email}",
			valueStateText:"Must be a valid email address"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Address",
			required:true
		});
		oInput = new sap.m.Input(this.createId("InputParent1Address"),{
			liveChange:[oController.infoValidation,oController],
			value:"{/parent1/address}",
			valueStateText:"Required"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		// wizard
		var oWizard = new sap.m.Wizard(this.createId("RegoWizard"),{
			complete:[oController.wizardCompleted,oController]
		});
		var oWStep = new sap.m.WizardStep(this.createId("WizardStepParent1"),{
			title:"Parent / Guardian 1 Information",
			validated:false
		});
		oWStep.addContent(oSimpleForm);
		oWizard.addStep(oWStep);

		// 2nd step - parent 2 info
		oSimpleForm = new sap.ui.layout.form.SimpleForm();

		oLabel = new sap.m.Label({
			text:"First Name"
		});
		oInput = new sap.m.Input(this.createId("InputParent2FirstName"),{
			value:"{/parent2/firstName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Last Name"
		});
		oInput = new sap.m.Input(this.createId("InputParent2LastName"),{
			value:"{/parent2/lastName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Mobile Number",
			type:"number"
		});
		oInput = new sap.m.Input(this.createId("InputParent2Mobile"),{
			liveChange:[oController.optionalValidation,oController],
			value:"{/parent2/mobile}",
			valueStateText:"Must be 10 digits"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oLabel = new sap.m.Label({
			text:"Email Address",
			type:"email"
		});
		oInput = new sap.m.Input(this.createId("InputParent2Email"),{
			liveChange:[oController.optionalValidation,oController],
			value:"{/parent2/email}",
			valueStateText:"Must be a valid email address"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oInput);

		oWStep = new sap.m.WizardStep(this.createId("WizardStepParent2"),{
			title:"Parent / Guardian 2 Information"
		});
		oWStep.addContent(oSimpleForm);
		oWizard.addStep(oWStep);

		// 3rd step - child info
		var oCStep = new sap.m.WizardStep(this.createId("WizardStepChild"),{
			title:"Child Information",
			validated:false
		});
		oWizard.addStep(oCStep);
		var oButton = new sap.m.Button(this.createId("ButtonChildAdd"),{
			text:"Add Child",
			press:[oController.addChild,oController]
		});
		var oBtnRemove = new sap.m.Button(this.createId("ButtonChildRemove"),{
			text:"Remove Child",
			press:[oController.removeChild,oController]
		});
		var oBtnNextStep = new sap.m.Button(this.createId("ButtonChildNextStep"),{
			text:"Step 4",
			type:"Emphasized",
			visible:false,
			press:[oController.nextStep,oController]
		});
		var oChildHBox = new sap.m.HBox({
			items:[oBtnNextStep]
		});

		function childAdder() {
			var childNo = 1;
			var counter = 1;
			var childFormArray = [];

			return {
				addChild: function addChild(oView) {
					var oChildForm = new sap.ui.layout.form.SimpleForm(oView.createId("ChildForm" + counter));
					childFormArray.push(oChildForm.getId());
					oChildForm.setTitle("Child " + childNo);

					var oChildLabel = new sap.m.Label({
						text:"First Name",
						required:true
					});
					var arrayNumber = childNo - 1;
					var bindValue = "{/child/" + arrayNumber + "/firstName}";
					var oChildInput = new sap.m.Input(oView.createId("InputChildFirstName" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						valueStateText:"Required"
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Last Name",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/lastName}";
					oChildInput = new sap.m.Input(oView.createId("InputChildLastName" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						valueStateText:"Required"
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Preferred Name (for name tag)",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/preferredName}";
					oChildInput = new sap.m.Input(oView.createId("InputChildPreferredName" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						//valueStateText:"Required"
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Birthdate",
						required:true
					});
					var minDate = new Date(2005,0,1);
					var maxDate = new Date(2014,11,31);
					bindValue = "{/child/" + arrayNumber + "/birthdate}";
					oChildInput = new sap.m.DatePicker(oView.createId("InputChildBirthdate" + counter),{
						change:[oController.childValidation,oController],
						dateValue:bindValue,
						valueStateText:"Required. Format: 'dd/mm/yyyy'",
						valueFormat:"dd/MM/yyyy",
						displayFormat:"dd/MM/yyyy",
						placeholder:"dd/mm/yyyy",
						minDate:minDate,
						maxDate:maxDate
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Gender",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/gender}";
					oChildInput = new sap.m.Select(oView.createId("InputChildGender" + counter),{
						change:[oController.childValidation,oController],
						selectedKey:bindValue,
						valueStateText:"Required",
						items:[{
							key:"",
							text:""
						},{
							key:"Male",
							text:"Male"
						},{
							key:"Female",
							text:"Female"
						}]
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"School",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/school}";
					oChildInput = new sap.m.Input(oView.createId("InputChildSchool" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						valueStateText:"Required"
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Year (beginning February 2019)",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/year}";
					oChildInput = new sap.m.Select(oView.createId("InputChildYear" + counter),{
						change:[oController.childValidation,oController],
						selectedKey:bindValue,
						valueStateText:"Required",
						items:[{
							key:"",
							text:""
						},{
							key:"Kindergarten",
							text:"Kindergarten"
						},{
							key:"Year 1",
							text:"Year 1"
						},{
							key:"Year 2",
							text:"Year 2"
						},{
							key:"Year 3",
							text:"Year 3"
						},{
							key:"Year 4",
							text:"Year 4"
						},{
							key:"Year 5",
							text:"Year 5"
						},{
							key:"Year 6",
							text:"Year 6"
						},{
							key:"Year 7",
							text:"Year 7"
						}]
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Shirt Size",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/shirt}";
					oChildInput = new sap.m.Select(oView.createId("InputChildShirt" + counter),{
						change:[oController.childValidation,oController],
						selectedKey:bindValue,
						valueStateText:"Required",
						items:[{
							key:"",
							text:""
						},{
							key:"6",
							text:"6"
						},{
							key:"8",
							text:"8"
						},{
							key:"10",
							text:"10"
						},{
							key:"12",
							text:"12"
						},{
							key:"14",
							text:"14"
						}]
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"One friend request (must be same year and mutual)",
						required:false
					});
					bindValue = "{/child/" + arrayNumber + "/friend}";
					oChildInput = new sap.m.Input(oView.createId("InputChildFriend" + counter),{
						value:bindValue,
						maxLength:10
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Medicare Number",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/medicare1}";
					oChildInput = new sap.m.Input(oView.createId("InputChildMedicare1" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						valueStateText:"Valid 10 digit Medicare Number",
						maxLength:10
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Number on card",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/medicare2}";
					oChildInput = new sap.m.Input(oView.createId("InputChildMedicare2" + counter),{
						liveChange:[oController.childValidation,oController],
						value:bindValue,
						valueStateText:"1 Digit from Medicare Card",
						maxLength:1
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Asthma",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/asthma}";
					oChildInput = new sap.m.Select(oView.createId("InputChildAsthma" + counter),{
						change:[oController.childValidation,oController],
						selectedKey:bindValue,
						valueStateText:"Required",
						items:[{
							key:"No",
							text:"No"
						},{
							key:"Yes",
							text:"Yes"
						}]
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Epipen",
						required:true
					});
					bindValue = "{/child/" + arrayNumber + "/epipen}";
					oChildInput = new sap.m.Select(oView.createId("InputChildEpipen" + counter),{
						change:[oController.childValidation,oController],
						selectedKey:bindValue,
						valueStateText:"Required",
						items:[{
							key:"No",
							text:"No"
						},{
							key:"Yes",
							text:"Yes"
						}]
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Food Allergies (select all that apply)",
						required:false
					});
					bindValue = "{/child/" + arrayNumber + "/allergy-egg}";
					oChildInput = new sap.m.CheckBox(oView.createId("InputChildAllergy-Egg" + counter),{
						change:[oController.childValidation,oController],
						selected: bindValue,
						text: "Egg"
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);
					bindValue = "{/child/" + arrayNumber + "/allergy-nuts}";
					oChildInput = new sap.m.CheckBox(oView.createId("InputChildAllergy-Nuts" + counter),{
						change:[oController.childValidation,oController],
						selected: bindValue,
						text: "Nuts"
					});
					oChildForm.addContent(oChildInput);
					bindValue = "{/child/" + arrayNumber + "/allergy-gluten}";
					oChildInput = new sap.m.CheckBox(oView.createId("InputChildAllergy-Gluten" + counter),{
						change:[oController.childValidation,oController],
						selected: bindValue,
						text: "Gluten"
					});
					oChildForm.addContent(oChildInput);
					bindValue = "{/child/" + arrayNumber + "/allergy-lactose}";
					oChildInput = new sap.m.CheckBox(oView.createId("InputChildAllergy-Lactose" + counter),{
						change:[oController.childValidation,oController],
						selected: bindValue,
						text: "Lactose"
					});
					oChildForm.addContent(oChildInput);
					oChildLabel = new sap.m.Label({
						text:"",
						required:false
					});
					bindValue = "{/child/" + arrayNumber + "/allergy-other}";
					oChildInput = new sap.m.Input(oView.createId("InputChildAllergy-Other" + counter),{
						liveChange:[oController.childValidation,oController],
						value: bindValue,
						placeholder: "Other: allergy1, allergy2, ..."
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Medication (taken between 9am-3pm)",
						required:false
					});
					bindValue = "{/child/" + arrayNumber + "/medication-yes}";
					oChildInput = new sap.m.Input(oView.createId("InputChildMedication-Yes" + counter),{
						liveChange:[oController.childValidation,oController],
						value: bindValue,
						placeholder: "Med1, med2, ..."
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oChildLabel = new sap.m.Label({
						text:"Other Medical Info",
						required:false
					});
					bindValue = "{/child/" + arrayNumber + "/medicalInfo}";
					oChildInput = new sap.m.TextArea(oView.createId("InputChildMedicalInfo" + counter),{
						value:bindValue,
						growing:true,
						growingMaxLines:4,
						maxLength:500
					});
					oChildForm.addContent(oChildLabel);
					oChildForm.addContent(oChildInput);

					oCStep.addContent(oChildForm);

					oCStep.removeContent(oButton);
					oCStep.addContent(oButton);
					oCStep.removeContent(oBtnRemove);
					if	(childNo > 1) {
						oCStep.addContent(oBtnRemove);
					}
					oCStep.removeContent(oChildHBox);
					oCStep.addContent(oChildHBox);

					childNo++;
					counter++;
				},
				removeChild: function removeChild(oView) {
					childNo--;
					var oChildForm = oView.byId(childFormArray.pop());
					oCStep.removeContent(oChildForm);
					if (childNo === 2) {
						oCStep.removeContent(oBtnRemove);
					}
				},
				getChildFormArray: function() {
					return childFormArray;
				}
			};
		}

		this.children = childAdder();

		// 4th step - consent
		oWStep = new sap.m.WizardStep(this.createId("WizardStepConsent"),{
			title:"Consent",
			validated:false
		});

		oSimpleForm = new sap.ui.layout.form.SimpleForm();
		var oCheckBox = new sap.m.CheckBox(this.createId("ConsentCBTerms"),{
			select:[oController.selected,oController],
			selected:"{/consent/terms}",
			valueStateText:"Required"
		});
		var oText = new sap.m.ObjectIdentifier(this.createId("TermsLink"),{
			title:"Terms of Enrolment",
			titleActive:true,
			titlePress:[oController.terms,oController]
		});
		var oHBox = new sap.m.HBox(this.createId("HBoxTerms"),{
			alignItems:"Center",
			items:[oCheckBox,oText]
		});
		oSimpleForm.addContent(oHBox);
		oWStep.addContent(oSimpleForm);

		oSimpleForm = new sap.ui.layout.form.SimpleForm();
		oCheckBox = new sap.m.CheckBox(this.createId("ConsentCBFirstAid"),{
			select:[oController.selected,oController],
			selected:"{/consent/firstAid}",
			valueStateText:"Required"
		});
		oText = new sap.m.ObjectIdentifier(this.createId("FirstAidLink"),{
			title:"First Aid and Safety Policies",
			titleActive:true,
			titlePress:[oController.firstAid,oController]
		});
		oHBox = new sap.m.HBox(this.createId("HBoxFirstAid"),{
			alignItems:"Center",
			items:[oCheckBox,oText]
		});
		oSimpleForm.addContent(oHBox);
		oWStep.addContent(oSimpleForm);

		oSimpleForm = new sap.ui.layout.form.SimpleForm();
		oCheckBox = new sap.m.CheckBox(this.createId("ConsentCBPrivacy"),{
			select:[oController.selected,oController],
			selected:"{/consent/privacy}",
			valueStateText:"Required"
		});
		oText = new sap.m.ObjectIdentifier(this.createId("PrivacyLink"),{
			title:"Privacy Policy",
			titleActive:true,
			titlePress:[oController.privacy,oController]
		});
		oHBox = new sap.m.HBox(this.createId("HBoxPrivacy"),{
			alignItems:"Center",
			items:[oCheckBox,oText]
		});
		oSimpleForm.addContent(oHBox);
		oWStep.addContent(oSimpleForm);

		oSimpleForm = new sap.ui.layout.form.SimpleForm();
		oCheckBox = new sap.m.CheckBox(this.createId("ConsentCBRefund"),{
			select:[oController.selected,oController],
			selected:"{/consent/refund}",
			valueStateText:"Required"
		});
		oText = new sap.m.ObjectIdentifier(this.createId("RefundLink"),{
			title:"Refund Policy",
			titleActive:true,
			titlePress:[oController.refund,oController]
		});
		oHBox = new sap.m.HBox(this.createId("HBoxRefund"),{
			alignItems:"Center",
			items:[oCheckBox,oText]
		});
		oSimpleForm.addContent(oHBox);
		oWStep.addContent(oSimpleForm);

		oWizard.addStep(oWStep);

		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancel,oController]
		});

		var oButtonHelp = new sap.m.Button({
			text:"Help",
			type:"Emphasized",
			press:[oController.handleHelp,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonCancel,oButtonHelp]
		});

		var oPage = new sap.m.Page(this.createId("WizardPage"),{
			title: "{i18n>title}",
			content: [oWizard],
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
