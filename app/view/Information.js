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
 * View for displaying instructions and disclaimers.
 */
Ext.define('AOS.view.Information', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Ext.TitleBar',
		'AOS.view.statistics.CompletionGraph',
		'AOS.view.statistics.DedicationGraph',
		'AOS.view.statistics.ProductivityGraph',
		'AOS.view.statistics.FocusGraph',
		'AOS.view.button.Logout',
		'AOS.view.button.MainMenu'
	],
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
						ui: 'round',
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
				html:	'<div class="aos-about">'+
						'<h1>About</h1>'+
						'<p> AOSv0.2.1 - Arkanos Organizer Suite<br/>Matheus Borges Teixeira</p>'+
						'<p> This is a tool for managing personal goals, with possibility of breaking down into tasks and logging work, allowing statistical analysis on performance. It was created by Matheus Borges Teixeira. This application is offered free of charge under the GNU Affero General Public License. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY.</p>'+
						'<p> Contact the Author via matheus.bt at gmail or via his <a href="https://github.com/matheuscodes/">GitHub</a>.'+
						
						'<h1>Important links</h1>'+
						'<p><a href="https://github.com/matheuscodes/aos">Complete Source Code</a></p>'+
						'<p><a href="https://github.com/matheuscodes/aos/issues">Report issues</a></p>'+
						'<p><a href="https://github.com/matheuscodes/aos-app-only">Source Code of the App</a></p>'+
						
						'<h1>Cookie Policy</h1>'+
						'<p> Cookies are only used to store the authentication token.</p>'+

						'<h1>Security</h1>'+
						'<p>All passwords are hashed in the client, so they are never stored. The problem with security is that this first version of the application can do all network comunication without secured connection. Make sure always to use the application with HTTPS if you want protection.</p>'+
						'</div>',
				items: []
			},
			{
				title: 'Instructions',
				iconCls: 'aos-icon-instructions',
				styleHtmlContent: true,
				scrollable: true,
				html:	'<div class="aos-instructions">'+

						'<h1>General Instructions</h1>'+
						'<h2>Login and Sign Up</h2>'+
						'<p> There is no mistery here. Either a user can log in using an existing account or create a new one. For users who forgot their credentials, AOS offers a reset via the "Forgot password?" button.</p>'+
						'<h3>Creating new accounts</h3>'+
						'<p>No confirmation is needed after the account is created for the user to start operating the application, but unconfirmed emails will be removed (along with any other user data) after one week. Please check your inbox and spam folder and follow the email instructions to confirm the email.</p>'+
						'<h2>Authentication and Security</h2>'+
						'<p>Due to technical limitations on the hosting server, unfortunately the credentials will not last more than a couple hours. The design is set to a day, so this is the max, but depending on traffic for the app it will last mostly less than that. Your password is secured via a MD5 hash, but for the first version of the application all communication is performed through an unsecure protocol.</p>'+

						'<h2>Main operations</h2>'+
						'<h3>'+AOS.Helper.wrapInIcon('aos-icon-back','Back Button')+'</h3>'+
						'<p>Will always return you to the previous screen.</p>'+
						'<h3>'+AOS.Helper.wrapInIcon('aos-icon-mainmenu','Menu Button')+'</h3>'+
						'<p>Displays the drop down menu with all possible views from the application.</p>'+
						'<h3>'+AOS.Helper.wrapInIcon('aos-icon-logout','Logout Button')+'</h3>'+
						'<p> Either on the drop menu or in the top right corner, it will invalidate the user\'s authentication and remove local data, requiring a new login to be made.</p>'+
						'<h3>'+AOS.Helper.wrapInIcon('aos-icon-save','Save Button')+'</h3>'+
						'<p>For Goals, Tasks and Work entries, makes the changes effective.</p>'+
						
						'<h1>'+AOS.Helper.wrapInIcon('aos-icon-statistics','Statistics')+'</h1>'+
						'<p> Here you will be able to see how things are going with your goals and some graphical display of interesting metrics.</p>'+
						'<h2>Important</h2>'+
						'<p> All legend labels are scrollable horizontally.</p>'+
						//TODO: better sizing
						'<img src="/resources/images/labels.png" height="4%" />'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-overview','Overview')+'</h1>'+
						'<p>Most of the numbers in this tab are really straightforward, with exception of some:</p>'+
						'<h3>Surplus/Deficit</h3>'+
						'<p>The server will do a simple calculation of how much time have you should have spent based on the amount of days passed, comparing this number to the actual count of spent hours. Please note that this system assumes a linear progression (i.e. your planning is based on a fixed amount of hours per day) which should be fine for most of the cases and over the days the difference will average itself out. For a non-uniform distribution, keep in mind this metric might be off.</p>'+
						'<h3>Expected Completion</h3>'+
						'<p>Based on the current day, estimates how your progression should be. Basically this metric will always show how much of the year has actually passed.</p>'+
						'<h3>Dedication</h3>'+
						'<p>It is defined by the percentage of time spent on a goal in relation to the original planned time.</p>'+
						'<h3>Productivity</h3>'+
						'<p>Simple relation between the dedication and completion. Closer this value is to 1.0, means that plan is proceeding as expected. Lower productivity indicates initial planned time might have been not enough and higher values indicate overestimation.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-completion','Completion')+'</h2>'+
						'<p>Simple line chart with the progression over time for each goal.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-dedication','Dedication')+'</h2>'+
						'<p>Simple line chart with the dedication over time for each goal.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-productivity','Productivity')+'</h2>'+
						'<p>Bar chart indicating the effective productivity for each goal. It is very important to note that the productivity in a particular time takes into consideration the time up to that point. This means the last (most recent) information indicates the most correct effective productivity. Regarding usability, the graph only displays half of the available time range, but it is possible to pan over the entire period.</p>'+
						'<img src="/resources/images/pan.png" height="4%"/>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-focus','Focus')+'</h2>'+
						'<p>Displays the distribution of the time spent by each goal over time. The distribution is only within the actual logged work, and does not show relation to the time planned. It also does not consider the obtained results.</p>'+

						'<h1>'+AOS.Helper.wrapInIcon('aos-icon-goals','Goals')+'</h1>'+
						'<p>In this view the user can see a list and a brief status of all the current goals, ordered by completion ascending.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-details','Details')+'</h2>'+
						'<p>Opens an overlay with more detailed information about the selected goal.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-remove','Remove')+'</h2>'+
						'<p>Removes the selected goal.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-tasks','New Task')+'</h2>'+
						'<p>Creates a new task for the selected goal.</p>'+
						'<h3>Creating Tasks</h3>'+
						'<p>Only three fields are possible to be set: "Task Name", "Initial", "Target" and all are required.</p>'+
						'<h3>How to select the values</h3>'+
						'<p>It is very important that appropriate values are selected both in the initial and target fields. The system will use them in a linear progression (from:0%, to:100%) to calculate completion. Once logging work, it will have an "result" that accumulates in this progression.</p>'+
						'<p>Any numeric value is accepted. Suggested and most common strategies are based on number of parts, or simply, if the task is atomic, a binary value. If the task is hard to quanticize, it is suggested that an arbitrary progression from 0 to 100 to be used.</p>'+
						'<p>The selected strategy must be in mind once work will be logged, as the result will accumulate here.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-new','New')+'</h2>'+
						'<p>Creates a new goal. Only three fields are possible to be set: "Goal Title", "Total Time Planned" in hours and "Description".</p>'+
						'<h3>'+AOS.Helper.wrapInIcon('aos-icon-edit','Edit')+'</h3>'+
						'<p>This is inside the Details overlay, but basically opens the same view with a preselected Goal to be changed.</p>'+

						'<h1>'+AOS.Helper.wrapInIcon('aos-icon-tasks','Tasks')+'</h1>'+
						'<p>In this view the user can see a list and a brief status of all the current tasks. Those are ordered alphabetically by the "Goal Name" where they belong to.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-details','Edit')+'</h2>'+
						'<p>Opens the same view as the task creation on the "Goals" view, but with a preselected task to be edited.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-remove','Remove')+'</h2>'+
						'<p>Removes the selected task.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-worklog','Log Work')+'</h2>'+
						'<p>Here the user can add an entry to the worklog. Only one field cannot be edited, the "Task Name". All others can, and the only optional is the "Comment".</p>'+
						'<h3>Date</h3>'+
						'<p>The date unfortunately follows the US pattern and by default is always the current day, but any date, now, before on in the future can be selected.</p>'+
						'<h3>Hour and Minute</h3>'+
						'<p>The hour is standard 24 hour time, and the minute is restricted to quarters. This time indicates when the work actually started.</p>'+
						'<h3>Added Value</h3>'+
						'<p>This field is very important, as it will be added to the "Initial" value of the task to define completion towards the "Target". The user must have in mind what kind of strategy was selected on the task creation, to define an adequate value in this log entry.</p>'+
						'<h3>Spent Time</h3>'+
						'<p>Total time spent, in minutes, with the given work.</p>'+
						
						'<h1>'+AOS.Helper.wrapInIcon('aos-icon-worklog','Worklog')+'</h1>'+
						'<p>In this view the user can see a complete list of the work entries logged in the application. The worklog is ordered by date descending.</p>'+
						'<h2>'+AOS.Helper.wrapInIcon('aos-icon-remove','Remove')+'</h2>'+
						'<p>Removes the selected work entry.</p>'+
						'<br/>'+
						'<p> AOS - Arkanos Organizer Suite </p>'+
						'<p> Copyright (C) 2014 Matheus Borges Teixeira</p>'+
						'<p><br/></p>'+
						'</div>',
				items: []
			},
			{
				title: 'Copyrights',
				iconCls: 'aos-icon-copyright',
				styleHtmlContent: true,
				scrollable: true,
				html:	'<div class="aos-copyright">'+
						'<p> AOS - Arkanos Organizer Suite</p>'+
						'<p> Copyright (C) 2014 Matheus Borges Teixeira</p>'+
						'<p><br/><br/></p>'+
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
