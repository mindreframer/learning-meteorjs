jobManagement = {
		setTaskEstimatedTime: function(taskid, seconds)
		{
			Tasks.update({_id:taskid},
				{
				$set:{
					'estimatedSecs':seconds

					}
				});
		},
		getSelectedTasks : function()
		{
			var search = Session.get( 'taskSearch' );
			var res =[];
			if(search)
			{
				var mongoDbArr = [];
				mongoDbArr.push({'details.name': new RegExp(search,"i")});
				mongoDbArr.push({'details.notes': new RegExp(search,"i")});
				mongoDbArr.push({'details.tags.name': new RegExp(search,"i")});
				res= Tasks.find( { $or: mongoDbArr } ).fetch();
			}
			else
			{
				res = Tasks.find().fetch();
			}
			// no subfield in minimongo (YET)
			return _.sortBy(res,
					function(val){
				if(!val.details || !val.details.due_on){return 60*60*24*365*1000;}//if not set default to 1 yr
				return 1*(Date.parse(val.details.due_on)- (new Date()));
				}
			);
			return res;
		},
		getSelectedTasksCount:function()
		{
			return jobManagement.getSelectedTasks().length;
		},
		haveRunningJobs : function()
		{
			return !Session.equals('runningTaskId',null);

		},
		stopRunningJobs : function()
		{
			var currentRunning = Session.get('runningTaskId');
			if(currentRunning)
			{

				var elapsed = Session.get('runningTaskSeconds');
				var id = currentRunning;
				
				if(elapsed)
				{
					var theTask = Tasks.find({_id:id}).fetch();
					theTask = theTask[0];
					var theDate = new Date();
					var theDateString = ''+theDate.getFullYear()+((theDate.getMonth()>9)?'':'0')+(theDate.getMonth()+1)+((theDate.getDate()>9)?'':'0')+theDate.getDate();
					/*console.log(theTask);
					console.log(theTask.details);		*/			
					if(!(theTask.journal) || !(theTask.journal[theDateString]) || !(theTask.journal[theDateString][Meteor.userId()]) )
					{

						var setModifier = { $set: {} };
						setModifier.$set['journal.' + theDateString + '.'+Meteor.userId()] = elapsed;
						
						Tasks.update({_id:id},setModifier);
						
					}
					else
					{
						var setModifier = { $inc: {} };
						setModifier.$inc['journal.' + theDateString + '.'+Meteor.userId()] = elapsed;
						
						Tasks.update({_id:id},setModifier);
						//console.log(setModifier);
					}
					
					Tasks.update({_id:id}, {$inc:{workedSecs:elapsed}});
					jobManagement.addSessionTimeOnTask(elapsed, id );
				}



				Session.set('runningTaskName',null);
				Session.set('runningTaskId',null);
				Session.set('runningTaskSeconds', 0 );

				TaskTimer.stop();
				TimerElapsedTime=0;
				Meteor.users.update({_id:Meteor.userId()},
						{
						$set:{
							'currentlyWorkingOn.elapsedSeconds':null


							}
						});
			}

		},
		startTask : function(task)
		{
			TaskTimer.play();
			Session.set('runningTaskName',task.details.name);
			Session.set('runningTaskId',task._id);
			var estimated = (task.estimatedSecs || 0);
			var workedSecs = (task.workedSecs || 0);
			Session.set('runningTaskSeconds', 0 );
			
			Meteor.users.update({_id:Meteor.userId()},
				{
				$set:{
					'currentlyWorkingOn':
						{
							'name':task.details.name,
							'taskId':task._id,
							'estimatedSecs':estimated,
							'workedSecs':workedSecs
						}
					}
				});
		},

		addSessionTimeOnTask : function(secs, taskId)
		{
			var st = Session.get('timeOnTasks') || {};
			if(st[taskId]){st[taskId]+=secs;}
			else st[taskId]=secs;
			Session.set('timeOnTasks', st);
		},
		setRunningTaskElapsedSeconds : function(secs)
		{

			Session.set('runningTaskSeconds', secs );
			if (secs % 30 == 0)
			{
				
				Meteor.users.update({_id:Meteor.userId()},
						{
						$set:{
							'currentlyWorkingOn.elapsedSeconds':secs
							}
						});
			}
		}


};













