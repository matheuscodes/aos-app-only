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
 * Form to create Goals.
 */
Ext.define('AOS.form.Goal',{
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.field.Text',
		'Ext.field.Hidden',
		'Ext.field.Number',
		'Ext.Button',
		'Ext.Toolbar',
		'AOS.Helper'
	],
	config:{
		items: [
			{
				docked: 'top',
				title: 'Goal',
				xtype:'titlebar',
				items:[
					{
						xtype:'button',
						ui: 'round',
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
						ui: 'round',
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
									Ext.Msg.alert('Success','Goal Saved!');
									me.disable();
									form.reset();
									form.setRecord(null);
									AOS.Helper.refreshStore('Goals');
									AOS.Helper.switchTo('AOS.view.Goals',{ type: 'slide', direction: 'right' });
								},
								failure: function(response) {
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

							var values = form.getValues();
							if(!values.title){
								Ext.Msg.alert('Wrong Input','Title is mandatory');
								return;
							}
							if(isNaN(values.time_planned)){
								Ext.Msg.alert('Wrong Input','Time needs to be a number');
								return;
							}
							else if(values.time_planned < 0){
								Ext.Msg.alert('Wrong Input','Time needs to be positive');
								return;
							}

							if(record){
								if(values.title){
									backup_title = record.get('title');
									record.set('title',values.title);
								}
								if(values.time_planned || (values.time_planned === 0)){
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
				disabled: true,
				readOnly: true
			},
			{
				xtype: 'numberfield',
				required: true,
				name: 'time_planned',
				label: 'Time Planned<br/>(hours)'
			},
			{
				xtype: 'textfield',
				name: 'total_time_spent',
				label: 'Time Spent<br/>(hours)',
				disabled: true,
				readOnly: true
			},
			{
				xtype: 'textfield',
				name: 'dedication',
				label: 'Dedication',
				disabled: true,
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
			labelWidth: '50%',
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
