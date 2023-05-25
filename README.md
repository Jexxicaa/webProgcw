
## Web Programming Coursework Intro

This repository stores coursework for the Web Programming Module. It creates a web application using HTML, CSS, and JavaScript. 

The overall goal of the coursework is to construct a Student Placement Diary that provides the ability for students to create an entry depicting what they done in that day on placement. The application displays the data entries in a table and a form for adding new entries.

## Features and how to use them:
These are all the core features i have implemented into my code:

- Display data entries in a table
- Add new entries using a form
- Edit pre-existing entries using a form
- Ability to delete an entry:

To display data entries in a table, simply fill out the form by either navigating to it or selecting the 'Click to scroll to input form' button. => You can fill out the date, work, knowledge and competencies. => Press Submit => The data is then loaded and saved to the table
To edit or delete a entry in the table, click the 'Edit' or 'Delete' Buttons on the row you wish to remove. If the edit button is clicked, the form will change to accomodate this request. => You can then fill out the date, work,knowledge and competencies. => Press Save Entry => The data is then loaded and saved to the table
If the delete button is pressed, the row will be immediately removed from the table and JSON file.

- Mobile-responsive design to allow viewing on differnt devices:
To view on a differnt device, right click => select 'Inspect'=> click the icon for 'Toggle device emulation' => select the device you wish to emulate

- Ability to print:  
CTRL + P

- A read only version that can be sent to managers or supervisors:
Load the page : http://localhost:8080/read-only.html 

- Saves each entry locally to be accessible another time 

## Optional features and how to use them:
- Random quote generator
Generates a random quote upon reloading the page

- IET competency code descriptive drop down
Cick the dropdown bar => select the competency you would like to find out the definition for => click off to hide the description

- To do list
Select the text box under To-Do => type in your entry => Press 'Add' => Click the added entry to strikethrough => press the cross delete the entry 

- scroller function
If the table is too long, press the 'Click here to scroll to input form' button to travel down toward the input fields

## Installation:

1. Extract files from the zip, or clone the repository
2. Run npm install in your terminal
3. If necessary npm run setup
4. npm start
5. The web application will be loaded in the browser. http://localhost:8080/

## References:
I used this video to assist me in coding the to-do list function:
How to create to-do list app using HTML CSS and JavaScript: Task app in JavaScript. YouTube. (2023, March 20). https://youtu.be/G0jO8kUrg-I 

I used this website to gather quotes:
50 powerful and inspirational quotes for students. Design Wizard. (2023, May 17). https://designwizard.com/blog/inspirational-quotes-for-students/ 

I used this to assist me in creating a drop down bar:
How to create a dropdown list using JavaScript. Tutorials Point. (n.d.). https://www.tutorialspoint.com/how-to-create-a-dropdown-list-using-javascript 

IET competency codes:
The Chartered Engineer Standard (ceng) - institution of engineering and ... (n.d.). https://www.theiet.org/media/6662/competence-and-commitment-standard-for-chartered-engineers.pdf 



Thank you! 






