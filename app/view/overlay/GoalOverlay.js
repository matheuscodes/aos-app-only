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
 * Overlay for displaying Goal details.
 */
Ext.define('AOS.view.overlay.GoalOverlay',{
	extend: 'Ext.Panel',
	requires: [
		'Ext.TitleBar',
		'Ext.Anim',
		'AOS.form.Goal'
	],
	config:{
		modal:true,
		hideOnMaskTap: true,
		centered: true,
		width: '70%',
		height: '80%',
		scrollable: true,
		showAnimation:{
			type: 'popIn',
			duration: 250
		},
		hideAnimation:{
			type: 'popOut',
			duration: 250
		},
		items:[
			{
				xtype:'titlebar',
				itemId: 'goaldisplay-titlebar',
				docked: 'top',
				items: [
					{
						itemId: 'goaldisplay-edit',
						iconCls: 'aos-icon-edit',
						align: 'right',
						handler: function(){
							var grandgrandfather = this.parent.parent.parent;
							var selected = grandgrandfather.goal_record;
							if(grandgrandfather){
								if(selected){
									AOS.Helper.switchTo('AOS.form.Goal',{ type: 'slide', direction: 'left' });
									Ext.Viewport.getActiveItem().setRecord(selected);
								}
								grandgrandfather.hide();
							}
						}
					}
				]
			}
		]
	},

	/**
	 * Constructs the content based on a record.
	 *
	 * @param {Object/Ext.data.Record} Goal to be displayed.
	 */
	popUp: function(item){
		this.goal_record = item;
		var html = '<table width=70%>';
		html += '<tr><td class="aos-goal-field">Time Planned:</td>';
		html += '<td class="aos-goal-data">'+this.goal_record.get('time_planned')+' hours</td></tr>';
		html += '<tr><td class="aos-goal-field">Time Spent:</td>';
		html += '<td class="aos-goal-data">'+this.goal_record.get('total_time_spent')+' hours</td></tr>';
		if(this.goal_record.get('dedication')){
			html += '<tr><td class="aos-goal-field">Dedication:</td>';
			html += '<td class="aos-goal-data">'+this.goal_record.get('dedication')+'%</td></tr>';
		}
		html += '<tr><td class="aos-goal-field">Completion:</td>';
		html += '<td class="aos-goal-data">'+this.goal_record.get('completion')+'%</td></tr>';
		html += '<tr><td class="aos-goal-field">Description:</td><td/></tr>';
		html += '<tr><td class="aos-goal-data" colspan=2><p>'+this.goal_record.get('description')+'</p></td></tr>';
		html += '</table>';

		var goal_id = this.goal_record.get('id');
		var tasks = [];
		Ext.getStore('Tasks').each(function(rec) {
			if (rec.get('goal_id') == goal_id) {
				tasks.push(rec);
			}
		});
		html += '<table width="90%" align="center">';
		html += '<tr>';
		html += '<td class="aos-small-header">Task</td>';
		html += '<td class="aos-small-header">Initial</td>';
		html += '<td class="aos-small-header">Current</td>';
		html += '<td class="aos-small-header">Target</td>';
		html += '<td class="aos-small-header">Progress</td>'
		html += '</tr>';
		var i;
		for(i = 0; i < tasks.length; i++){
			html += '<tr>';
			html += '<td  width="100%" class="aos-small">'+tasks[i].get('name')+'</td>';
			html += '<td  class="aos-small-report">'+tasks[i].get('initial')+'</td>';
			html += '<td  class="aos-small-report">'+tasks[i].get('current')+'</td>';
			html += '<td  class="aos-small-report">'+tasks[i].get('target')+'</td>';
			html += '<td  class="aos-small-report">'+tasks[i].get('completion')+'%</td>';
			html += '</tr>';
		}
		html += '</table>';
		html += '<br/><br/>';
		this.setHtml(html);
		this.down('#goaldisplay-titlebar').setTitle(this.goal_record.get('title'));
		this.show();
	}
});
