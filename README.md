# taskCompleter

What is this thing?
This is a web application that allows you to schedule tasks for yourself by posting a new Task using the + button and filling out the form boxes and posting it to the server. You can also search and sort for Tasks using the forms and buttons on the left.

How does it work?
You can post a new Task by clicking the + button on the right which opens a set of forms to fill out. Fill them out according to these guidelines and it will post successfully.

Title: Titles are required and need to be at least 1 character long and shorter than 33 characters.
Author: An author must be provided and need to be at least 2 characters long and shorter than 33 characters.
Description: Descriptions are optional but if provided, need to be shorter than 350 characters long.
Date: Dates are required for when the Task is to be done. Clicking on the form will open a popup date selection.
Start and End Times: Start and End Times are required and start times need to be before end times.
The list of tasks are searchable and sortable using the parameters provided to you on the left.

Title: Searching by title returns all the tasks with the exact title you specified.
Author: Searching by author returns all the tasks with that author.
Date: Selecting a date will show all of the tasks that have been set to that particular date. Cannot use date in conjunction with Time Parameters.
Start and End Time: Selecting the specific time will show tasks that have been set to start and end at those specific times only.
Complete and Incomplete: Selecting one or the other will show only completed or incompleted tasks. Deselecting both will show both completed and incomplete tasks.
Time Paramters: Here is a selection of time based sorting parameters which will return today's tasks, this week's tasks (current day + 7 days), this month's tasks, and this year's tasks. These parameters will not work in conjunction with the Date selection.