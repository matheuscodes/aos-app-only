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
 * View for administrating Goals.
 */
Ext.define('AOS.view.Goals', {
	extend: 'Ext.Container',
	requires: [
		'Ext.dataview.List',
		'AOS.store.Goals',
		'AOS.model.Goal',
		'AOS.view.bar.TopToolbar',
		'AOS.view.overlay.GoalOverlay',
		'AOS.form.Task'
	],
	config: {
		layout: 'fit',
		items: [
			{
				docked: 'top',
				title: 'Goals',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
				xtype: 'list',
				store: 'Goals',
				itemId: 'list-display',
				itemTpl:	'<table width="100%"><tr>'+
							'<td class="aos-title" width="100%">{title}</td>'+
							'<td class="aos-goal-status"><b>Completed</b><br/>{completion}%</td>'+
							'<td class="aos-goal-status"><b>Spent</b><br/>{total_time_spent} hours</td>'+
							'<td class="aos-goal-status"><b>Dedication</b><br/>{dedication}%</td>'+
							'</tr></table>',
				listeners: {
					select: function() {
						this.parent.enableActions();
					}
				}
			},
			{
				xtype: 'toolbar',
				ui: 'neutral',
				docked: 'bottom',
				scrollable: 'horizontal',
				layout: {pack:'center'},
				items:[
					{
						disabled: true,
						itemId: 'goal-details',
						ui: 'small',
						text: 'Details',
						iconCls: 'aos-icon-details',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								if(!grandfather.overlay){
									grandfather.overlay = Ext.Viewport.add(Ext.create('AOS.view.overlay.GoalOverlay'));
								}
								grandfather.overlay.popUp(selected[0]);
							}
						}
					},
					{
						disabled: true,
						itemId: 'goal-remove',
						ui: 'small',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						handler: function(){
							var grandfather = this.parent.parent;
							var list = grandfather.down('#list-display');
							var selected = list.getSelection();
							if(selected && selected.length > 0){
								var before = list.getScrollable().getScroller().position.y;
								AOS.Helper.remove(selected[0],'Goals');
								AOS.Helper.purgeStore('Tasks');
								AOS.Helper.purgeStore('Worklog');
								list.getScrollable().getScroller().scrollTo(0, before);
								grandfather.disableActions();
							}
						}
					},
					{
						disabled: true,
						itemId: 'goal-tasks',
						ui: 'small',
						text: 'New Task',
						iconCls: 'aos-icon-tasks',
						align: 'left',
						handler: function(){
							var grandfather = this.parent.parent;
							var selected = grandfather.down('#list-display').getSelection();
							if(selected && selected.length > 0){
								AOS.Helper.switchTo('AOS.form.Task',{ type: 'slide', direction: 'left' });
								Ext.Viewport.getActiveItem().setGoal(selected[0].get('id'),selected[0].get('title'));
							}
						}
					},
					{
						itemId: 'new-goal',
						ui: 'small',
						text: 'New Goal',
						iconCls: 'aos-icon-new',
						handler: function(){
							AOS.Helper.switchTo('AOS.form.Goal',{ type: 'slide', direction: 'left' });
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
		this.down('#goal-details').enable();
		this.down('#goal-remove').enable();
		this.down('#goal-tasks').enable();
	},

	/**
	 * Disables all buttons related to selection.
	 */
	disableActions: function(){
		this.down('#goal-details').disable();
		this.down('#goal-remove').disable();
		this.down('#goal-tasks').disable();
	}
});
