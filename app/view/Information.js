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

Ext.define('AOS.view.Information', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Ext.TitleBar',
		'AOS.view.statistics.CompletionGraph',
		'AOS.view.statistics.DedicationGraph',
		'AOS.view.statistics.ProductivityGraph',
		'AOS.view.statistics.FocusGraph',
		'AOS.view.button.Logout',
		'AOS.view.button.MainMenu'],
	config: {
		tabBarPosition: 'bottom',
		scrollable: 'horizontal',
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Information',
				items: [
					{
						xtype:'button',
						text: 'Back',
						iconCls: 'aos-icon-back',
						align: 'left',
						handler: function(){
							AOS.Helper.switchTo('AOS.view.Login',{ type: 'slide', direction: 'right' });
						}
					}
				]
			},
			{
				title: 'About',
				iconCls: 'aos-icon-about',
				styleHtmlContent: true,
				scrollable: true,
				html:	'<div class="aos-copyright">'+
						'<p> AOS - Arkanos Organizer Suite</p>'+
						'<p> Copyright (C) 2014 Matheus Borges Teixeira</p>'+
						'<p><br/><br/><br/></p>'+
						'<p> PW Small Icons<br/>'+
						'Copyright (C) 2013 <a href="http://www.peax-webdesign.com">Peax Webdesign</a></p>'+
						'<p> Kingthings Trypewriter<br/>'+
						'Copyright (C) 2005 <a href="http://www.kingthingsfonts.co.uk/">Kingthings</a></p>'+
						'<p> Crypto JS<br/>'+
						'Copyright (c) 2009  <a href="https://code.google.com/p/crypto-js/wiki/License">Jeff Mott</a></p>'+
						'</div>',
				items: []
			},
			{
				title: 'Instructions',
				iconCls: 'aos-icon-instructions',
				styleHtmlContent: true,
				scrollable: true,
				html:	'<div class="aos-copyright">'+
						'<p> AOS - Arkanos Organizer Suite</p>'+
						'<p> Copyright (C) 2014 Matheus Borges Teixeira</p>'+
						'<p><br/><br/><br/></p>'+
						'<p> PW Small Icons<br/>'+
						'Copyright (C) 2013 <a href="http://www.peax-webdesign.com">Peax Webdesign</a></p>'+
						'<p> Kingthings Trypewriter<br/>'+
						'Copyright (C) 2005 <a href="http://www.kingthingsfonts.co.uk/">Kingthings</a></p>'+
						'<p> Crypto JS<br/>'+
						'Copyright (c) 2009  <a href="https://code.google.com/p/crypto-js/wiki/License">Jeff Mott</a></p>'+
						'</div>',
				items: []
			},
			{
				title: 'Copyright',
				iconCls: 'aos-icon-copyright',
				styleHtmlContent: true,
				scrollable: true,
				html:	'<div class="aos-copyright">'+
						'<p> AOS - Arkanos Organizer Suite</p>'+
						'<p> Copyright (C) 2014 Matheus Borges Teixeira</p>'+
						'<p><br/><br/><br/></p>'+
						'<p> PW Small Icons<br/>'+
						'Copyright (C) 2013 <a href="http://www.peax-webdesign.com">Peax Webdesign</a></p>'+
						'<p> Kingthings Trypewriter<br/>'+
						'Copyright (C) 2005 <a href="http://www.kingthingsfonts.co.uk/">Kingthings</a></p>'+
						'<p> Crypto JS<br/>'+
						'Copyright (c) 2009  <a href="https://code.google.com/p/crypto-js/wiki/License">Jeff Mott</a></p>'+
						'</div>', 
				items: []
			}
		]
	}
});
