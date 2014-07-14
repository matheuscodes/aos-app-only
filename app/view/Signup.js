/**
	Copyright (C) 2014  Matheus Borges Teixeira

	This is a part of Arkanos Organizer Suite (AOS) app.
	AOS is a web application for organizing personal goals.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

/**
 * View for subscribing to the application.
 */
Ext.define('AOS.view.Signup', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Password',
		'Ext.Label',
		'Ext.Ajax',
		'Ext.JSON',
		'AOS.Helper'
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
						ui: 'round',
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
				title: 'Provide the following',
				instructions: '* required fields',
				minWidth: '10%',
				defaults: {
					labelWidth: '47%'
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
				docked: 'bottom',
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

					if(!user_name)
						Ext.Msg.alert('Required','Please provide a username.');
					else if(!first_name)
						Ext.Msg.alert('Required','Please inform your name.');
					else if(!last_name)
						Ext.Msg.alert('Required','Please inform your last name.');
					else if(!email)
						Ext.Msg.alert('Required','Please inform your email.');
					else if(!password)
						Ext.Msg.alert('Required','Please provide a password.');
					else if(email.indexOf("@") < 0)
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
									var suggestions = Ext.JSON.decode(response.responseText,true);
									if(suggestions){
										var error = me.down('#signupErrorMessage');
										error.hide();
										error.setHtml("Username "+user_name+" is already taken, you can try<br/>"+
														suggestions[0]+"<br/>"+suggestions[1]+"<br/>"+suggestions[2]);
										error.show();
									}
								}
								else if(response.status == 201){
									AOS.Helper.purgeStore('Worklog');
									AOS.Helper.purgeStore('Tasks');
									AOS.Helper.purgeStore('Goals');
									AOS.Helper.switchTo('AOS.view.Statistics', { type: 'pop' });
								}
								else{
									Ext.Msg.alert('Sign Up failed!',response.status+': '+response.statusText);
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
