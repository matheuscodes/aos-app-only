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
 * View for administrating Tasks.
 */
Ext.define('AOS.view.Tasks', {
	extend: 'Ext.Container',
	requires: [
		'Ext.dataview.List',
		'AOS.store.Tasks',
		'AOS.model.Task',
		'AOS.form.Task',
		'AOS.form.Work',
		'AOS.Helper',
		'AOS.view.bar.TopToolbar'
	],
	config: {
		layout: 'fit',
		items: [
			{
				docked: 'top',
				title: 'Tasks',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
				xtype: 'list',
				store: 'Tasks',
				itemId: 'list-display',
				itemTpl:	'<table width="100%"><tr>'+
							'<td class="aos-title">{name}</td>'+
							'<td class="aos-goal-status"  width="40%">'+
							'<b>Initial:</b> {initial}<br/>'+
							'<b>Current:</b> {current}<br/>'+
							'<b>Target:</b> {target}<br/>'+
							'<b>Progress:</b> {completion}%<br/>'+
							'<b>Spent</b> {total_time_spent} hours</td>'+
							'</tr></table>',
				grouped: true,
				listeners: {
					select: function(){
						this.parent.enableActions();
					}
				}
			},
			{
				xtype: 'toolbar',
				ui: 'neutral',
				docked: 'bottom',
				scrollable: null,
				layout: {pack:'center'},
				items:[
					{
						itemId: 'task-edit',
						ui: 'small',
						text: 'Edit',
						iconCls: 'aos-icon-details',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.switchTo('AOS.form.Task',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setRecord(selected[0]);
							}
						}
					},
					{
						disabled: true,
						itemId: 'task-remove',
						ui: 'small',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var list = grandfather.down('#list-display');
							var selected = list.getSelection();
							if(selected && selected.length > 0){
								var before = list.getScrollable().getScroller().position.y;
								AOS.Helper.remove(selected[0],'Tasks');
								AOS.Helper.purgeStore('Worklog');
								AOS.Helper.refreshStore('Goals');
								list.getScrollable().getScroller().scrollTo(0, before);
								grandfather.disableActions();
							}
						}
					},
					{
						itemId: 'task-worklog',
						ui: 'small',
						text: 'Log work',
						iconCls: 'aos-icon-worklog',
						disabled: true,
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.switchTo('AOS.form.Work',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setTask(selected[0].get('id'),selected[0].get('name'));
							}
						}
					}
				]
			}
		],
		listeners: {
			show: function() {
				var list = this.down('#list-display');
				if(list){
					AOS.Helper.moveToSelection(list);
				}
			}
		}
	},

	/**
	 * Enables all buttons related to selection.
	 */
	enableActions: function(){
		this.down('#task-edit').enable();
		this.down('#task-remove').enable();
		this.down('#task-worklog').enable();
	},

	/**
	 * Disables all buttons related to selection.
	 */
	disableActions: function(){
		this.down('#task-edit').disable();
		this.down('#task-remove').disable();
		this.down('#task-worklog').disable();
	}
});
