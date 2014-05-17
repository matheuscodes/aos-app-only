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
 * Button to trigger main menu.
 */
Ext.define('AOS.view.button.MainMenu', {
	extend: 'Ext.Button',
	xtype: 'aos-button-mainmenu',
	requires: ['Ext.Ajax'],
	config: {
		ui: 'round',
		handler: function() {
			Ext.Viewport.toggleMenu('top');
		}
	}
});
