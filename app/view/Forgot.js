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
 * View for resetting password.
 */
Ext.define('AOS.view.Forgot', {
	extend: 'Ext.Panel',
	alias: 'widget.principal',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.Label'
	],
	config: {
		title: 'Forgot',
		items: [
			{
				xtype: 'titlebar',
				title: 'Reset Password',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						text: 'Back',
						itemId: 'backButton',
						align: 'left',
						handler: function(){
							AOS.Helper.switchTo('AOS.view.Login', { type: 'slide', direction: 'right' });
						}
					}
				]
			},
			{
				xtype: 'label',
				id: 'forgotErrorMessage',
				html: 'Login failed.',
				style: 'width:100%; text-align:center; color:#D44;',
				hidden: true,
				hideAnimation: 'fadeOut',
				showAnimation: 'fadeIn'
			},
			{
				xtype: 'fieldset',
				id: 'forgotInput',
				title: 'Please inform your email',
				items:[
					{
						xtype: 'emailfield',
						placeHolder: 'my@email.com',
						itemId: 'forgotEmail',
						name: 'forgotEmail',
						required: true
					}
				]
			},
			{
				xtype: 'button',
				ui: 'action',
				margin: '1%',
				text: 'Reset Password'
				//TODO: API call to reset password
			}
		]
	}
});
