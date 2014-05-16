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

Ext.define('AOS.view.Worklog', {
    extend: 'Ext.Container',
    requires: [	'AOS.store.Worklog',
				'AOS.model.Work',
				'Ext.dataview.List',
				'AOS.view.bar.TopToolbar'],
    config: {
        layout: 'fit',
        items: [
			{
				docked: 'top',
				title: 'Worklog',
				xtype:'aos-toolbar-toptoolbar'
			},
			{
		        xtype: 'list',
		        store: 'Worklog',
				itemId: 'list-display',
		        itemTpl:	' <table width="100%">'+
							'<tr><td class="aos-date" width="100%">{start}</td>'+
							'<td class="aos-goal-status" rowspan="4"><b>Spent</b><br/>{time_spent} hours</td></tr>'+
							'<tr><td class="aos-normal" width="100%">{task_name}</td></tr>'+
							'<tr><td class="aos-small" width="100%">{comment}</td></tr>'+
							'<tr><td class="aos-small" width="100%">{goal_title}</td></tr>'+
							'</table>',
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
				scrollable: null,
				layout: {pack:'center'},
				items:[
					{
						disabled: true,
						itemId: 'work-remove',
						ui: 'small',
						text: 'Remove',
						iconCls: 'aos-icon-remove',
						handler: function(){
							var grandfather = this.parent.parent;
							var list = grandfather.down('#list-display');
							var selected = list.getSelection();
							if(selected && selected.length > 0){
								var before = list.getScrollable().getScroller().position.y;
								AOS.Helper.remove(selected[0],'Worklog');
								AOS.Helper.refreshStore('Tasks');
								AOS.Helper.refreshStore('Goals');
								list.getScrollable().getScroller().scrollTo(0, before);
								grandfather.disableActions();
							}
						}
					}
				]
			}
		]
    },
	enableActions: function(){
		this.down('#work-remove').enable();
	},
	disableActions: function(){
		this.down('#work-remove').disable();
	}
});
