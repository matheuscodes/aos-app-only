Ext.define('AOS.form.Work',{
	extend: 'Ext.form.Panel',
	requires: [
				'Ext.field.Text',
				'Ext.field.Hidden',
				'Ext.field.DatePicker',
				'Ext.field.TextArea',
				'Ext.field.Number',
				'Ext.Button',
				'Ext.TitleBar',
				'Ext.Ajax',
				'AOS.Helper'
	],
	setTask: function(task_id,task_name){
		if(task_id > 0 && task_name){
			this.down('#work-task-id').setValue(task_id);
			this.down('#work-task-name').setValue(task_name);
		}
	},
	pad: function(n) {
		if(n < 10){
			return '0'+ n
		}
		else{
			return n;
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
							AOS.Helper.switchTo('AOS.view.Tasks',{ type: 'slide', direction: 'right' });
							form.reset();
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
							//TODO Find a way to get rid of those.
							var form = this.parent.parent.parent;

							var date = form.down("#work-date").getFormattedValue('Y-m-d ');
							var hour = form.down("#work-hour").getValue();
							var minute = form.down("#work-minute").getValue();

							var full = date;
							full = full+' '+form.pad(hour);
							full = full+':'+form.pad(minute);
							full = full+':00.0';

							Ext.Ajax.request({
								url: 'worklog',
								method: 'POST',
								params: {
									task_id: form.down("#work-task-id").getValue(),
									time_spent: form.down("#work-time").getValue(),
									comment: form.down("#work-comment").getValue(),
									result: form.down("#work-result").getValue(),
									start: full
								},
								success: function (response) {
									Ext.Msg.alert('Success','Work Logged!');
									Ext.getStore('Worklog').load();
									Ext.getStore('Tasks').load();
									Ext.getStore('Goals').load();
									AOS.Helper.switchTo('AOS.view.Tasks',{ type: 'slide', direction: 'right' });
									form.reset();
									me.disable();
								},
								failure: function (response) {
									Ext.Msg.alert('Error','Oops, something went wrong!');
								}
							});
						}
					}
				]
			},
			{
				xtype: 'hiddenfield',
				itemId: 'work-task-id',
				name: 'task_id',
				value:0
			},
			{
				xtype: 'textfield',
				itemId: 'work-task-name',
				name: 'task_name',
				label: 'Task',
				readOnly: true
			},
			{
				xtype: 'datepickerfield',
				required: true,
				itemId: 'work-date',
				name: 'start',
				label: 'Date',
				destroyPickerOnHide: true,
				value: new Date(),
				picker: {
					yearFrom: 2014
				}
			},
			{
				xtype: 'spinnerfield',
				required: true,
				itemId: 'work-hour',
				name: 'hour',
				label: 'Hour',
				minValue: 0,
				maxValue: 23,
				stepValue: 1,
				cycle: true
			},
			{
				xtype: 'spinnerfield',
				required: true,
				itemId: 'work-minute',
				name: 'minute',
				label: 'Minute',
				minValue: 0,
				maxValue: 45,
				stepValue: 15,
				cycle: true
			},
			{
				xtype: 'numberfield',
				required: true,
				itemId: 'work-result',
				name: 'result',
				label: 'Added value',
				value: 1
			},
			{
				xtype: 'numberfield',
				required: true,
				itemId: 'work-time',
				name: 'time_spent',
				label: 'Spent Time (minutes)',
				value: 30
			},
			{
				xtype: 'textareafield',
				required: true,
				itemId: 'work-comment',
				name: 'comment',
				label: 'Comment'
			}
		],
		defaults: {
			listeners: {
				change: function(field, newVal, oldVal) {
					if(oldVal){
						//TODO fix the issue for item without parent here.
						this.parent.down('#save-button').enable();
					}
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



