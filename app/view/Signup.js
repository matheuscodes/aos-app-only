Ext.define('AOS.view.Signup', {
		extend: 'Ext.Panel',
		requires: [
			'Ext.form.FieldSet',
			'Ext.field.Email',
			'Ext.field.Password',
			'Ext.Label',
			'Ext.Ajax',
			'Ext.JSON'
		],
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
							xtype:'button',
							text: 'Back',
							iconCls: 'aos-icon-back',
							align: 'left',
							handler: function(){
								AOS.Helper.switchTo('AOS.view.Login', { type: 'slide', direction: 'right' });
							}
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
							maxLength: 13,
							required: true
						},
						{
							xtype: 'textfield',
							placeHolder: 'John',
							itemId: 'newFirstName',
							name: 'newFirstName',
							label: 'First Name',
							maxLength: 35,
							required: true
						},
						{
							xtype: 'textfield',
							placeHolder: 'Doe',
							itemId: 'newLastName',
							name: 'newLastName',
							label: 'Last Name',
							maxLength: 35,
							required: true
						},
						{
							xtype: 'emailfield',
							placeHolder: 'my@email.com',
							itemId: 'newEmail',
							name: 'newEmail',
							label: 'Email',
							maxLength: 45,
							required: true
						},
						{
							xtype: 'emailfield',
							itemId: 'newConfirmEmail',
							name: 'newConfirmEmail',
							label: 'Confirm',
							maxLength: 45,
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
					text: 'Submit',
					handler: function(){
						var me = this.parent;
						var user_name = me.down('#newUserName').getValue();
						var first_name = me.down('#newFirstName').getValue();
						var last_name = me.down('#newLastName').getValue();
						var password = me.down('#newPassword').getValue();
						var password2 = me.down('#newConfirmPassword').getValue();
						var email = me.down('#newEmail').getValue();
						var email2 = me.down('#newConfirmEmail').getValue();

			
						if(email.indexOf("@") < 0)
							Ext.Msg.alert('Wrong Email','Seems the given email is not valid.');
						else if(password != password2)
							Ext.Msg.alert('Confirmation failed!','Seems the given passwords do not match.');
						else if(email != email2) 
							Ext.Msg.alert('Confirmation failed!','Seems the given emails do not match.');
						else { 
							var hashed_password = ""+CryptoJS.MD5(password);
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
									if(response.status == 200){
										var suggestions = Ext.JSON.decode(response.responseText);
										var error = me.down('#signupErrorMessage');
										error.hide();
										error.setHtml("Username "+user_name+" is already taken, you can try<br/>"+
														suggestions[0]+"<br/>"+suggestions[1]+"<br/>"+suggestions[2]);
										error.show();
									}
									else{
										AOS.Helper.switchTo('AOS.view.Statistics', { type: 'pop' });
									}
								},
								failure: function (response) {
									Ext.Msg.alert('Sign Up failed!',response.status+': '+response.statusText);
								}
							});
						}
					}
				}
			]
		}
	});
