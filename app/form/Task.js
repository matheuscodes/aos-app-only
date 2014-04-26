Ext.define('AOS.form.Task',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.field.Text','Ext.field.Hidden','Ext.Button','Ext.Toolbar','AOS.Helper'],
	setGoal: function(goal_id,goal_name){
		if(goal_id > 0 && goal_name){
			this.down('#goal-id').setValue(goal_id);
			this.down('#goal-name').setValue(goal_name);
			//TODO set the back pointer to goals.
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
							AOS.Helper.fireEvent('switching','AOS.view.Tasks',{ type: 'slide', direction: 'right' });
							form.reset();
						}
					},
					{
						xtype:'button',
						itemId: 'save-button',
						text: 'Save',
						iconCls: 'aos-icon-save',
						align: 'right',
						handler: function(){
							var me = this;
							var form = this.parent.parent.parent;
							var record = form.getRecord();
							var option = {
								success: function(response) {
									//Ext.Msg.alert('Success','Form submitted successfully!',Ext.emptyFn);
									Ext.Msg.alert('Success','Saved Task!');
								},
								failure: function(response) {
									//Ext.Msg.alert('Error '+response.status, response.statusText, Ext.emptyFn);
									Ext.Msg.alert('Error','Oops, something went wrong!');
								}
							}
							if(record){
								record.save(option);
							}
							else{
								option.url = 'tasks';
								option.method = 'POST';								
								form.submit(option);
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
				xtype: 'hiddenfield',
				itemId: 'goal-id',
				name: 'goal_id',
				label: 'Goal ID'
			},
			{
				xtype: 'textfield',
				itemId: 'goal-name',
				name: 'goal_name',
				label: 'Goal Name',
				readOnly: true
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
		]
	}
});
