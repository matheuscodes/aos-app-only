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
							var backup_title, backup_time_planned, backup_description;
							var option = {
								success: function(response) {
									//Ext.Msg.alert('Success','Form submitted successfully!',Ext.emptyFn);
									Ext.Msg.alert('Success','Goal Saved!');
									me.disable();									
									form.reset();
									form.setRecord(null);
									AOS.Helper.switchTo('AOS.view.Goals',{ type: 'slide', direction: 'right' });
								},
								failure: function(response) {
									//Ext.Msg.alert('Error '+response.status, response.statusText, Ext.emptyFn);
									Ext.Msg.alert('Error','Oops, something went wrong!');
									if(backup_title){
										record.set('title',backup_title);
									}
									else{
										record.set('title','');
									}
									if(backup_time_planned){
										record.set('time_planned',backup_time_planned);
									}
									else{
										record.set('time_planned','');
									}
									if(backup_description){
										record.set('description',backup_description);
									}
									else{
										record.set('description','');
									}
								}
							}
							if(record){
								var values = form.getValues();
								if(values.title){
									backup_title = record.get('title');
									record.set('title',values.title);
								}
								if(values.time_planned){
									backup_time_planned = record.get('time_planned');
									record.set('time_planned',values.time_planned);
								}
								if(values.description){
									backup_description = record.get('description');
									record.set('description',values.description);
								}
								record.save(option);
							}
							else{
								option.url = 'goals';
								option.method = 'POST';								
								form.submit(option);
								AOS.Helper.refreshStore('Goals');
							}
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
