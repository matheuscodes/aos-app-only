Ext.define('AOS.view.Forgot', {
		extend: 'Ext.Panel',
		alias: 'widget.principal',
		requires: [	'Ext.form.FieldSet', 
					'Ext.field.Email', 
					'Ext.Label'],
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
								//TODO optmize
								var me = this.parent.parent.parent;
								me.fireEvent('switching','AOS.view.Login', { type: 'slide', direction: 'right' });
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
					//TODO api call to reset password
				}
			]
		}
	});
