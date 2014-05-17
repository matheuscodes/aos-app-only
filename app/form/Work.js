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
 * Form to create Work entries.
 */
Ext.define('AOS.form.Work',{
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.field.Text',
		'Ext.field.Hidden',
		'Ext.field.DatePicker',
		'Ext.field.TextArea',
		'Ext.field.Number',
		'Ext.field.Spinner',
		'Ext.Button',
		'Ext.TitleBar',
		'Ext.Ajax',
		'AOS.Helper'
	],

	/**
	 * Sets up reference information for the Task the work entry belongs to.
	 *
	 * @param {Number} Task ID of the Work entry's goal.
	 * @param {String} Task Name for UI reference only.
	 */
	setTask: function(task_id,task_name){
		if(task_id > 0 && task_name){
			this.down('#work-task-id').setValue(task_id);
			this.down('#work-task-name').setValue(task_name);
			this.down('#save-button').disable();
		}
	},

	/**
	 * @private
	 * Simple helper function for padding numbers.
	 * 
	 * @param {Number} Value to be add 0 or not.
	 * @return {String} Value corrected.
	 */
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
									AOS.Helper.refreshStore('Worklog');
									AOS.Helper.refreshStore('Tasks');
									AOS.Helper.refreshStore('Goals');
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
				disabled: true,
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
				stepValue: 15,
				value: 30,
				minValue: 0
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
					if(this.parent){
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



