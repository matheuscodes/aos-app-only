Ext.define('AOS.form.Task',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.field.Text','Ext.field.Hidden','Ext.Button','Ext.Toolbar','AOS.Helper'],
	setGoal: function(goal_id,goal_title){
		if(goal_id > 0 && goal_title){
			this.down('#goal-id').setValue(goal_id);
			this.down('#goal-title').setValue(goal_title);
		}
	},
	config:{
		items: [
			{
				docked: 'top',
				title: 'Task',
				xtype:'titlebar',
				items:[
					{
						xtype:'button',
						text: 'Back',
						iconCls: 'aos-icon-back',
						align: 'left',
						handler: function(){
							var form = this.parent.parent.parent;
							if(form.getRecord()){
								AOS.Helper.fireEvent('switching','AOS.view.Tasks',{ type: 'slide', direction: 'right' });
							}
							else{
								AOS.Helper.fireEvent('switching','AOS.view.Goals',{ type: 'slide', direction: 'right' });
							}
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
									Ext.Msg.alert('Success','Task Saved!');
									me.disable();
								},
								failure: function(response) {
									//Ext.Msg.alert('Error '+response.status, response.statusText, Ext.emptyFn);
									Ext.Msg.alert('Error','Oops, something went wrong!');
								}
							}
							if(record){
								var values = form.getValues();
								if(values.name){
									record.set('name',values.name);
								}
								if(values.initial){
									record.set('initial',values.initial);
								}
								if(values.target){
									record.set('target',values.target);
								}
								record.save(option);
								AOS.Helper.fireEvent('switching','AOS.view.Tasks',{ type: 'slide', direction: 'right' });
							}
							else{
								option.url = 'tasks';
								option.method = 'POST';								
								form.submit(option);
								Ext.getStore('Tasks').load();
								AOS.Helper.fireEvent('switching','AOS.view.Goals',{ type: 'slide', direction: 'right' });
							}
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
				xtype: 'hiddenfield',
				itemId: 'goal-id',
				name: 'goal_id',
				label: 'Goal ID',
				readOnly: true
			},
			{
				xtype: 'textfield',
				itemId: 'goal-title',
				name: 'goal_title',
				label: 'Goal Name'
			},
			{
				xtype: 'textfield',
				name: 'name',
				label: 'Task Name'
			},
			{
				xtype: 'textfield',
				name: 'initial',
				label: 'Initial'
			},
			{
				xtype: 'textfield',
				name: 'current',
				label: 'Current',
				readOnly: true
			},
			{
				xtype: 'textfield',
				name: 'target',
				label: 'Target'
			},
			{
				xtype: 'textfield',
				name: 'total_time_spent',
				label: 'Total Time Spent',
				readOnly: true
			}
		],
		defaults: {
		    listeners: {
		        change: function(field, newVal, oldVal) {
					if(oldVal){
						this.parent.down('#save-button').enable();
					}
		        }
		    }
		}
	}
});
