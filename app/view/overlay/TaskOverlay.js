Ext.define('AOS.view.overlay.TaskOverlay',{
		extend: 'AOS.form.Task',
		requires: ['Ext.TitleBar','Ext.Anim','AOS.form.Task'],
		config:{
			modal:true,
			hideOnMaskTap: true,
			centered: true,
			width: '60%',
			height: '40%',
			scrollable: true/*,
			showAnimation:{
				type: 'popIn',
				duration: 250
			},
			hideAnimation:{
				type: 'popOut',
				duration: 250
			}*/
		},
		popUp: function(item){
			this.setRecord(item);
			if(!this.down('#goaldisplay-titlebar')){
				this.add({
						xtype:'titlebar',
						itemId: 'goaldisplay-titlebar',
						docked: 'top',
						items: {
							itemId: 'goaldisplay-edit',
							iconCls: 'aos-icon-edit',
							align: 'right'
						}
					});
			}
			this.down('#goaldisplay-titlebar').setTitle(item.get('goal_title'));
			this.show();
		}
	});
