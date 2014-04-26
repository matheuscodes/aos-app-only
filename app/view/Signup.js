Ext.define('AOS.view.Signup', {
		extend: 'Ext.Panel',
		alias: 'widget.principal',
		requires: ['Ext.form.FieldSet', 'Ext.field.Email','Ext.field.Password', 'Ext.Label', 'Ext.Img', 'Ext.Ajax', 'Ext.JSON'],
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
							align: 'left',
							handler: function(){
								var me = this.parent.parent.parent;
								me.fireEvent('switching','AOS.view.Login', { type: 'slide', direction: 'right' });
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

			
						if(user_name.length > 13) 
							me.fireEvent('error',"Username too long, over 13 letters",me.down('#signupErrorMessage'));
						else if(first_name.length > 35) 
							me.fireEvent('error',"First name too long, over 35 letters",me.down('#signupErrorMessage'));
						else if(last_name.length > 35) 
							me.fireEvent('error',"Last name too long, over 35 letters",me.down('#signupErrorMessage'));
						else if(email.length > 45)
							me.fireEvent('error',"Email too long, over 45 letters",me.down('#signupErrorMessage'));
						else if(password != password2)
							me.fireEvent('error',"Passwords do not match",me.down('#signupErrorMessage'));
						else if(email != email2) 
							me.fireEvent('error',"Emails do not match",me.down('#signupErrorMessage'));
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
									if(response.status == 200){
										var suggestions = Ext.JSON.decode(response.responseText);
										me.fireEvent('error',"Username "+user_name+" is already taken, you can try<br/>"+
														suggestions[0]+"<br/>"+suggestions[1]+"<br/>"+suggestions[2],
														me.down('#signupErrorMessage'));
									}
									else{
										me.fireEvent('switching','AOS.view.Statistics', { type: 'pop' });
									}
								},
								failure: function (response) {
									me.fireEvent('error',"Error "+response.status+": "+response.statusText,
													me.down('#signupErrorMessage'));
								}
							});
						}
					}
				}
			]
		}
	});