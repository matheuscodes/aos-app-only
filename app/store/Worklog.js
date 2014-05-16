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

Ext.define("AOS.store.Worklog", {
		extend: 'Ext.data.Store',
		requires: ['AOS.model.Work','Ext.data.proxy.Ajax'],
		alias: 'store.Worklog',
		config: {
		    sorters: {
				property: 'start',
				direction: 'DESC'
			},
			autoLoad: true,
			model: 'AOS.model.Work'			
		}
	});
