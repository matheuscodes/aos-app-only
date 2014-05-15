Ext.define('AOS.form.Goal',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.field.Text','Ext.field.Hidden','Ext.Button','Ext.Toolbar','AOS.Helper'],
	config:{
		items: [
			{
				docked: 'top',
				title: 'Goal',
				xtype:'titlebar',
				items:[
					{
						xtype:'button',
						text: 'Back',
						iconCls: 'aos-icon-back',
						align: 'left',
						handler: function(){
							var form = this.parent.parent.parent;
							AOS.Helper.switchTo('AOS.view.Goals',{ type: 'slide', direction: 'right' });
							form.reset();
							form.setRecord(null);
						}
					},
					{
						xtype:'button',
						itemId: 'save-button',
						text: 'Save',
						iconCls: 'aos-icon-save',
						align: 'right',
						disabled: true,
						handler: function(){
							var me = this;
							var form = this.parent.parent.parent;
							var record = form.getRecord();
							var option = {
								success: function(response) {
									//Ext.Msg.alert('Success','Form submitted successfully!',Ext.emptyFn);
									Ext.Msg.alert('Success','Goal Saved!');
									me.disable();
								},
								failure: function(response) {
									//Ext.Msg.alert('Error '+response.status, response.statusText, Ext.emptyFn);
									Ext.Msg.alert('Error','Oops, something went wrong!');
								}
							}
							if(record){
								var values = form.getValues();
								if(values.title){
									record.set('title',values.title);
								}
								if(values.time_planned){
									record.set('time_planned',values.time_planned);
								}
								if(values.description){
									record.set('description',values.name);
								}
								record.save(option);
							}
							else{
								option.url = 'goals';
								option.method = 'POST';								
								form.submit(option);
								Ext.getStore('Goals').load();
							}
							AOS.Helper.switchTo('AOS.view.Goals',{ type: 'slide', direction: 'right' });
							form.reset();
							form.setRecord(null);
						}
					}
				]
			},
			{
				xtype: 'hiddenfield',
				name: 'id'
			},
			{
				xtype: 'textfield',
				required: true,
				itemId: 'goal-title',
				name: 'title',
				label: 'Goal Title'
			},
			{
				xtype: 'textfield',
				name: 'completion',
				label: 'Completion',
				readOnly: true
			},
			{
				xtype: 'textfield',
				required: true,
				name: 'time_planned',
				label: 'Total Time Planned (hours)'
			},
			{
				xtype: 'textfield',
				name: 'total_time_spent',
				label: 'Total Time Spent (hours)',
				readOnly: true
			},
			{
				xtype: 'textfield',
				name: 'dedication',
				label: 'Dedication',
				readOnly: true
			},
			{
				xtype: 'textareafield',
				name: 'description',
				label: 'Description',
				required: true
			}
		],
		defaults: {
			listeners: {
				change: function(field, newVal, oldVal) {
					this.parent.down('#save-button').enable();
				}
			}
		},
		listeners: {
			show: function() {
				this.down('#save-button').disable();
			}
		}
	}
});
