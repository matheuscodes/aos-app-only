Ext.define('AOS.view.overlay.GoalOverlay',{
		extend: 'Ext.Panel',
		requires: ['Ext.TitleBar','Ext.Anim','AOS.form.Goal'],
		config:{
			modal:true,
			hideOnMaskTap: true,
			centered: true,
			width: '60%',
			height: '40%',
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
							text: 'Edit',
							iconCls: 'aos-icon-edit',
							align: 'right',
							handler: function(){
								var grandgrandfather = this.parent.parent.parent;
								var selected = grandgrandfather.goal_record;
								if(grandgrandfather){
									if(selected){
										AOS.Helper.fireEvent('switching','AOS.form.Goal',{ type: 'slide', direction: 'left' });
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
		popUp: function(item){
			this.goal_record = item;
			var html = '<table>';
			//TODO field names need to be configurable as in API
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
			this.setHtml(html);
			this.down('#goaldisplay-titlebar').setTitle(this.goal_record.get('title'));
			this.show();
		}
	});
