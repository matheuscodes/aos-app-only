Ext.define('AOS.Helper', {
		extend: 'Ext.Component',
		xtype: 'aos-helper',
		alias: 'widget.principal',
		singleton: true,
		given_colors: {},
		color_count: 0,
		colors:[
			'rgba(200,0,0',
			'rgba(0,200,0',
			'rgba(0,0,200',
			'rgba(0,150,150',
			'rgba(150,0,150',
			'rgba(150,150,0',
			'rgba(200,75,0',
			'rgba(200,250,0',
			'rgba(0,250,200',
			'rgba(200,0,200',
			'rgba(150,250,150',
			'rgba(250,250,150',
			'rgba(100,0,0',
			'rgba(0,100,0',
			'rgba(0,0,100',
			'rgba(0,100,100',
			'rgba(100,0,100',
			'rgba(100,100,0',
			'rgba(0,0,0',
			'rgba(150,150,150'
		],		
		getKeyColor: function(key,transparency){
			var t = ',1.0)';
			if(transparency){
				t = ','+transparency+')';
			}
			if(!this.given_colors[key]){
				this.given_colors[key] = this.colors[this.color_count++];
				if(this.color_count >= this.colors.length){
					this.color_count = 0;
				}
			}
			return this.given_colors[key]+t;
		}
	});
