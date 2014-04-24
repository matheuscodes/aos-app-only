Ext.define('AOS.view.goals.GoalDisplay',{
		extend: 'Ext.Panel',
		requires: ['Ext.TitleBar','Ext.Anim'],
		config:{
			modal:true,
			hideOnMaskTap: true,
			centered: true,
			width: '60%',
			height: '40%',
			scrollable: true,
			styleHtmlContent: true,
			html: 'bla bla',
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
					items: {
						itemId: 'goaldisplay-edit',
						iconCls: 'aos-icon-edit',
						align: 'right'
					}
				}
			]
		},
		popUp: function(item){
			var html = '<table>';
			//TODO field names need to be configurable as in API
			html += '<tr><td class="aos-goal-field">Time Planned:</td>';
			html += '<td class="aos-goal-data">'+item.get('time_planned')+' hours</td></tr>';
			html += '<tr><td class="aos-goal-field">Time Spent:</td>';
			html += '<td class="aos-goal-data">'+item.get('total_time_spent')+' hours</td></tr>';
			if(item.get('dedication')){
				html += '<tr><td class="aos-goal-field">Dedication:</td>';
				html += '<td class="aos-goal-data">'+item.get('dedication')+'%</td></tr>';
			}
			html += '<tr><td class="aos-goal-field">Completion:</td>';
			html += '<td class="aos-goal-data">'+item.get('completion')+'%</td></tr>';
			html += '<tr><td class="aos-goal-field">Description:</td><td/></tr>';
			html += '<tr><td class="aos-goal-data" colspan=2><p>'+item.get('description')+'</p></td></tr>';
			html += '</table>';
			this.setHtml(html);
			this.down('#goaldisplay-titlebar').setTitle(item.get('title'));
			this.show();
		}
	});
