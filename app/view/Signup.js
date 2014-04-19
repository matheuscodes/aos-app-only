Ext.define('AOS.view.Signup', {
		extend: 'Ext.Panel',
		alias: 'widget.general',
		requires: ['Ext.form.FieldSet', 'Ext.field.Email','Ext.field.Password', 'Ext.Label', 'Ext.Img'],
		config: {
			title: 'Signup',
			scrollable: 'vertical',
			items: [
				{
					xtype: 'titlebar',
					title: 'Sign Up',
					docked: 'top',
					items: [
						{
							xtype: 'button',
							text: 'Back',
							itemId: 'backButton',
							align: 'left'
						}
					]
				},
				{
					xtype: 'label',
					id: 'signupErrorMessage',
					html: 'Login failed.',
					style: 'width:100%; text-align:center; color:#D44; padding: 10px;',
					hidden: true,
					hideAnimation: 'fadeOut',
					showAnimation: 'fadeIn'
				},
				{	
					xtype: 'fieldset',
					id: 'signupInput',
					title: 'Please fill in your information',
					instructions: '* required fields',
					defaults: {
						labelWidth: '40%'
					},
					items:[
						{
							xtype: 'textfield',
							placeHolder: 'john.doe',
							itemId: 'newUserName',
							name: 'newUserName',
							label: 'Username',
							required: true
						},
						{
							xtype: 'textfield',
							placeHolder: 'John',
							itemId: 'newFirstName',
							name: 'newFirstName',
							label: 'First Name',
							required: true
						},
						{
							xtype: 'textfield',
							placeHolder: 'Doe',
							itemId: 'newLastName',
							name: 'newLastName',
							label: 'Last Name',
							required: true
						},
						{
							xtype: 'emailfield',
							placeHolder: 'my@email.com',
							itemId: 'newEmail',
							name: 'newEmail',
							label: 'Email',
							required: true
						},
						{
							xtype: 'emailfield',
							itemId: 'newConfirmEmail',
							name: 'newConfirmEmail',
							label: 'Confirm',
							required: true
						},
						{
							xtype: 'passwordfield',
							itemId: 'newPassword',
							name: 'newPassword',
							label: 'Password',
							required: true
						},
						{
							xtype: 'passwordfield',
							itemId: 'newConfirmPassword',
							name: 'newConfirmPassword',
							label: 'Confirm',
							required: true
						}
					]
				},
				{
					xtype: 'button',
					itemId: 'submitButton',
					ui: 'action',
					margin: '1%',
					text: 'Submit'
				}
			],
			listeners: [
				{
					delegate: '#submitButton',
					event: 'tap',
					fn: 'onSubmitButtonTap'
				},
				{
					delegate: '#backButton',
					event: 'tap',
					fn: 'onBackButtonTap'
				}
			]
		},
		onSubmitButtonTap: function(){

			var user_name = this.down('#newUserName').getValue();
			var first_name = this.down('#newFirstName').getValue();
			var last_name = this.down('#newLastName').getValue();
			var password = this.down('#newPassword').getValue();
			var password2 = this.down('#newConfirmPassword').getValue();
			var email = this.down('#newEmail').getValue();
			var email2 = this.down('#newConfirmEmail').getValue();

			
			if(user_name.length > 13) this.printError("Username too long, over 13 letters");
			else if(first_name.length > 35) this.printError("First name too long, over 35 letters");
			else if(last_name.length > 35) this.printError("Last name too long, over 35 letters");
			else if(email.length > 45) this.printError("Email too long, over 45 letters");
			else if(password != password2) this.printError("Passwords do not match");
			else if(email != email2) this.printError("Emails do not match");
			else { 
				//TODO make a hash.
				var hashed_password = password;
				Ext.Ajax.request({
					url: 'signup',
					method: 'post',
					params: {
						user_name: user_name,
						first_name: first_name,
						last_name: last_name,
						hashed_password: hashed_password,
						email: email
					},
					success: function (response) {
					},
					failure: function (response) {
					
					}
				});
			}
			//TODO route to main/dashboard
			//this.fireEvent('switching','AOS.view.Login', { type: 'slide', direction: 'right' });
		},

		printError: function(message){
			var error = this.down('#signupErrorMessage');
			error.hide();
			error.setHtml(message);
			error.show();
		},

		onBackButtonTap: function(){
			this.fireEvent('switching','AOS.view.Login', { type: 'slide', direction: 'right' });
		}
	});
