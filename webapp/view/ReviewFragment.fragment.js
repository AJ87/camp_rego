sap.ui.jsfragment("SMADJS.view.ReviewFragment", {
	createContent: function(oController) {

		var oButtonAccept = new sap.m.Button({
			text:"Submit",
			type:"Accept",
			press:[oController.handleAcceptReview,oController]
		});

		var oButtonCancel = new sap.m.Button({
			text:"Cancel",
			type:"Reject",
			press:[oController.handleCancelReview,oController]
		});

		var oBar = new sap.m.Bar({
			contentRight:[oButtonAccept,oButtonCancel]
		});

		var oReviewPage = new sap.m.Page({
			title:"Summary",
			showFooter:true,
			footer:[oBar],
			showNavButton:true,
			navButtonTap:[oController.backToWizard,oController]
		});

		// Parent / Guardian 1
		var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			title:"1. Parent/Guardian 1 Information",
			editable:false
		});

		var oLabel = new sap.m.Label({
			text:"First Name"
		});
		var oText = new sap.m.Text(this.createId("Parent1FirstName"),{
			text:"{/parent1/firstName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Last Name"
		});
		oText = new sap.m.Text(this.createId("Parent1LastName"),{
			text:"{/parent1/lastName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Mobile"
		});
		oText = new sap.m.Text(this.createId("Parent1Mobile"),{
			text:"{/parent1/mobile}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Email"
		});
		oText = new sap.m.Text(this.createId("Parent1Email"),{
			text:"{/parent1/email}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Address"
		});
		oText = new sap.m.Text(this.createId("Parent1Address"),{
			text:"{/parent1/address}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		var oEditLink = new sap.m.Link({
			text:"Edit",
			press:[oController.editStep1,oController]
		});
		oSimpleForm.addContent(oEditLink);

		oReviewPage.addContent(oSimpleForm);

		// Parent / Guardian 2
		oSimpleForm = new sap.ui.layout.form.SimpleForm({
			title:"2. Parent/Guardian 2 Information",
			editable:false
		});

		oLabel = new sap.m.Label({
			text:"First Name"
		});
		oText = new sap.m.Text(this.createId("Parent2FirstName"),{
			text:"{/parent2/firstName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Last Name"
		});
		oText = new sap.m.Text(this.createId("Parent2LastName"),{
			text:"{/parent2/lastName}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Mobile"
		});
		oText = new sap.m.Text(this.createId("Parent2Mobile"),{
			text:"{/parent2/mobile}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Email"
		});
		oText = new sap.m.Text(this.createId("Parent2Email"),{
			text:"{/parent2/email}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oEditLink = new sap.m.Link({
			text:"Edit",
			press:[oController.editStep2,oController]
		});
		oSimpleForm.addContent(oEditLink);

		oReviewPage.addContent(oSimpleForm);

		// Child Info
		oSimpleForm = new sap.ui.layout.form.SimpleForm({
			title:"3. Child Information",
			editable:false
		});

		oReviewPage.addContent(oSimpleForm);

		var oChildModel = oController.oModel.getProperty("/child/");
		for (var i = 0; i < oChildModel.length; i++) {

			oSimpleForm = new sap.ui.layout.form.SimpleForm({
				title:"Child " + (i + 1)
			});

			oLabel = new sap.m.Label({
				text:"First Name"
			});
			var bindValue = "{/child/" + i + "/firstName}";
			oText = new sap.m.Text(this.createId("ChildFirstName" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Last Name"
			});
			bindValue = "{/child/" + i + "/lastName}";
			oText = new sap.m.Text(this.createId("ChildLastName" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Preferred Name"
			});
			bindValue = "{/child/" + i + "/preferredName}";
			oText = new sap.m.Text(this.createId("ChildPreferredName" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Birthdate"
			});
			bindValue = "/child/" + i + "/birthdate";
			oText = new sap.m.Text(this.createId("ChildBirthdate" + i),{
				text:{
					path:bindValue,
					type:"sap.ui.model.type.Date",
					formatOptions:{
						//style:"short",
						valueFormat:"dd/MM/yyyy",
						displayFormat:"dd/MM/yyyy"
					}
				}
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Gender"
			});
			bindValue = "{/child/" + i + "/gender}";
			oText = new sap.m.Text(this.createId("ChildGender" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"School"
			});
			bindValue = "{/child/" + i + "/school}";
			oText = new sap.m.Text(this.createId("ChildSchool" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Year (beginning February 2019)"
			});
			bindValue = "{/child/" + i + "/year}";
			oText = new sap.m.Text(this.createId("ChildYear" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Friend request"
			});
			bindValue = "{/child/" + i + "/friend}";
			oText = new sap.m.Text(this.createId("ChildFriend" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Medicare Number"
			});
			bindValue = "{/child/" + i + "/medicare1}";
			oText = new sap.m.Text(this.createId("ChildMedicare1" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Number on card"
			});
			bindValue = "{/child/" + i + "/medicare2}";
			oText = new sap.m.Text(this.createId("ChildMedicare2" + i),{
				text:bindValue
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Medical Info"
			});
			bindValue = "{/child/" + i + "/medicalInfo}";
			oText = new sap.m.Text(this.createId("ChildMedicalInfo" + i),{
				text:bindValue,
				wrapping:true
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Dietary Info"
			});
			bindValue = "{/child/" + i + "/dietaryInfo}";
			oText = new sap.m.Text(this.createId("ChildDietaryInfo" + i),{
				text:bindValue,
				wrapping:true
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			oLabel = new sap.m.Label({
				text:"Medication"
			});
			bindValue = "{/child/" + i + "/medication}";
			oText = new sap.m.Text(this.createId("ChildMedication" + i),{
				text:bindValue,
				wrapping:true
			});
			oSimpleForm.addContent(oLabel);
			oSimpleForm.addContent(oText);

			if (i !== (oChildModel.length - 1)) {
				oReviewPage.addContent(oSimpleForm);
			}

		}

		oEditLink = new sap.m.Link({
			text:"Edit",
			press:[oController.editStep3,oController]
		});
		oSimpleForm.addContent(oEditLink);

		oReviewPage.addContent(oSimpleForm);

		// Consent
		oSimpleForm = new sap.ui.layout.form.SimpleForm({
			title:"4. Consent",
			editable:false
		});

		oLabel = new sap.m.Label({
			text:"Terms of Enrolment"
		});
		oText = new sap.m.Text(this.createId("ConsentTerms"),{
			text:"{= ${/consent/terms} === true ? 'Consented' : 'Not consented'}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"First Aid and Safety Policies"
		});
		oText = new sap.m.Text(this.createId("ConsentFirstAid"),{
			text:"{= ${/consent/firstAid} === true ? 'Consented' : 'Not consented'}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Privacy Policy"
		});
		oText = new sap.m.Text(this.createId("ConsentPrivacy"),{
			text:"{= ${/consent/privacy} === true ? 'Consented' : 'Not consented'}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oLabel = new sap.m.Label({
			text:"Refund Policy"
		});
		oText = new sap.m.Text(this.createId("ConsentRefund"),{
			text:"{= ${/consent/refund} === true ? 'Consented' : 'Not consented'}"
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oText);

		oEditLink = new sap.m.Link({
			text:"Edit",
			press:[oController.editStep4,oController]
		});
		oSimpleForm.addContent(oEditLink);

		oReviewPage.addContent(oSimpleForm);

		return [oReviewPage];
	}
});
