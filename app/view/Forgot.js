Ext.define('AOS.view.Forgot', {
		extend: 'Ext.Panel',
		alias: 'widget.general',
		requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.Label', 'Ext.Img'],
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
							align: 'left'
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
					itemId: 'resetPassword',
					ui: 'action',
					margin: '1%',
					text: 'Reset Password'
				}
			],
			listeners: [
				{
					delegate: '#backButton',
					event: 'tap',
					fn: 'onBackButtonTap'
				}
			]
		},
		onBackButtonTap: function(){
			this.fireEvent('switching','AOS.view.Login', { type: 'slide', direction: 'right' });
		}
	});
