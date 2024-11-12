# prog track

## ./client

nextjs ts tailwind reduxjs redux-toolkit RTK-query

- globals.css:
  - css reset
  - tailwind conf default styles
- .prettierrc:
  - prettier conf auto sorts classes based on our recommended class order
- tailwind.config.ts:
  - darkMode conf
  - tailwind conf extend colors object custom colors values
- dashboardWrapper.tsx:
  - DashboardWrapper component for parting layout, flex into sidebar and main section of navbar component & children _(page.tsx)_
- component Navbar:
  - input search bar
  - icon setting link
- component Sidebar:
  - top logo
  - team section
- app/redux.ts:
  - redux toolkit store conf
  - persist conf
  - store provider conf
  - sidebar collapse/expand state
  - store provider component
- src/state/index.ts:
  - redux toolkit slice conf
  - reducer fn for sidebar and dark mode
- .env.local:
  - for local development api base url
- src/state/api.ts:
  - rtk query api conf
- dashboardWrapper.tsx(1):
  - accessing the global states & conditional tailwind classes for sidebar & theme mode in dashboardWrapper component
- component Navbar(1):
  - access global state & dispatching theme toggle logic
  - based on window size & sidebar collapse state do the conditonal rendering of button _(toggle theme btn)_ with conditional icons
  - conditional tailwind classes
- component Sidebar(1):
  - inclusion of SidebarLink component for sidebar links (application pages) that uses usePathname hook of nextjs to check if the requested link is current/active or not to highlight _(UI)_ the link
  - access the global state and do the conditional tailwind classes for sidebar collapse state
  - collapse button to dispatching sidebar collapse state toggle logic
  - condional rendering of collapse button for sidebar
  - navbar links using SidebarLink component
  - boolean states _(UI)_ of buttons for project list & priority list toggle
  - based on priority state conditional rendering of priority list links using SidebarLink component
- src/state/api.ts(1):
  - interfaces, enums for api endpoints
  - endpints object for api requests
    - projects
    - tasks
- src/app/api/projects/[id]/page.tsx:
  - for browsing the particular project dash using params id
  - tab items to include for tab view components
    - Board
    - List
    - Timeline
    - Table
    - filers
    - search
    - new task btn
  - states for activeTab and setIsModalNewTaskOpen (UI)
  - ProjectHeader component for consistency of tabs list & btns accross every project page
  - activeTab state for conditinal rendering of the corresponding tab view component.
- src/app/api/projects/ProjectHeader.tsx:

  - component has activeTab and setActiveTab as props
  - returning jsx
    - Header component for consistency of name (can be dynamic if needed) & btn for new project model state toggle logic
    - sub component TabButton for consistency of tabs list accross every project page
      - TabButton accepts name, icon, setActiveTab and activeTab as props
      - conditionly highlights (tailwind class) the active tab
    - div consisting of filter & share btn also search input field

- component Header:
  - component has name,buttonComponent and isSmallText as props both optional
  - h1 tag for name
- component Sidebar(2):
  - fetch data from api for all projects
  - conditionaly render (map) the projects data to SidebarLink component
- src\app\api\projects\BoardView:
  - purpose for rendering tasks on board view tab of project page
  - purpose toggle the status of task on board view tab using react-dnd
  - component accepts id (project) & setIsModalNewTaskOpen as props
  - fetch data of tasks for requested project id using RTK query api
  - moveTask Fn for Drag and Drop the task in diffent status columns to trigger tsk status update mutation api call
    - Fn accepts taskId & toStatus as props for task status update
    - loading & error returns from RTK query api on fetched tasks data
  - DndProvider for drag and drop task
  - array taskStatus for all tasks status string literals used for mapping a sub component for columns in DnD
  - sub component TaskColumn:
    - component accepts status, tasks[], moveTask, setIsModalNewTaskOpen as props
    - useDrop hook for drag and drop task
    - tasks count for each status column based on matching status
    - map of status color hex code based on status string literal
    - conditional styling of returning jsx based on DND instance
    - jsx includes status, status color edge div, tasks count, ellipsis btn for menu, btn for new task modal opn state toggle logic & mapping of sub component (Task) for tasks array with filtering logic of seperating task into status columns.
    - sub component Task:
      - component accepts task as props
      - returning jsx div with conditional styling based on this instance of useDrag hook of react-dnd
      - constants:
        - tags splitting logic for task cause its a string with comma separator used
        - format the date for a task start & due date
        - number of comments for a task
      - PriorityTag fn of returning jsx element :
        - fn accepts priority as props of type TaskType["priority"]
        - returning jsx div with conditional tailwind styling based on priority for tag text
      - Image when task has attachment
      - another div containing
        - pritory tag
        - task tags with mapping on array of splitted tags
        - ellipsis btn of menu for task
        - task author profile img
        - task title
        - task points
      - another div containing start & due dates
      - paragraph containing task description
      - another div containing assignee profile img & comments count for a task
      - !PENDING! functionality to open up comments modal
- src\app\api\projects\ListView:
  - purpose for rendering tasks on list view tab of project page in simpler format
  - component accepts id (project) & setIsModalNewTaskOpen as props
  - fetch data of tasks for requested project id using RTK query api
  - loading & error returns from RTK query api on fetched tasks data
  - Used Header component for ListView tab header & passed button jsx with onclick fn to setIsModalNewTaskOpen as props
  - grid containing map fn of tasks with a component TaskCard for each task
- component TaskCard:
  - component accepts task as props
  - constants for date with formatting
  - returning jsx
    - div containing heading for title & paragraph for description
    - div with span tags for status, priority & conditionaly for points
    - unordered list for tags, dates, author, assignee
      & conditionaly Image for attachments
- src\app\api\projects\TimelineView:
  - purpose for rendering tasks on timeline view tab of project page with Gantt chart
  - component accepts id (project) & setIsModalNewTaskOpen as props
  - state of darkmode from global state
  - fetch data of tasks for requested project id using RTK query api
  - state for displayoptions conf from gantt-task-react for default view mode
  - constant for formatting the chart jsx with mapping fn of tasks & creating it within useMemo hook to reduce re-renders will update ui as needed
  - loading & error returns from RTK query api on fetched tasks data
  - Fn for viewmode change event for select element of view mode options
  - returning jsx
    - div containing heading & select element of view mode options
    - div containing Gantt chart (this div is wrapped in an div with classname="timeline" for global styling of chart)
    - div containing button for new task modal open state toggle logic
- src\app\api\projects\TableView:
  - purpose for rendering tasks on table view tab of project page with table
  - component accepts id (project) & setIsModalNewTaskOpen as props
  - state of darkmode from global state
  - fetch data of tasks for requested project id using RTK query api
  - loading & error returns from RTK query api on fetched tasks data
  - returning jsx
    - div containing heading for title & button for new task modal open state toggle logic
    - DataGrid table component from mui/x-data-grid for tasks
      - tasks as props or empty array
      - columns as props of GridColDef[] type
      - className as props of dataGridClassNames from lib/utils
      - sx as props of dataGridSxStyles from lib/utils
    - colums constant of GridColDef[] type includes objects as for every column fields mapping data of tasks:
      - title
      - description
      - status
      - priority
      - tags
      - startDate
      - dueDate
      - author
      - assignee
- src/lib/utils.ts:
  - constant for dataGridClassNames tailwind classes
  - constant for dataGridSxStyles function which accepts isDarkmode as props returns object of sx custom styles
- src/app/api/projects/ProjectHeader.tsx(1):

  - returning jsx
    - ModalNewProject component for new project model state toggle logic
      - case: when isOpen is true
      - case: onClose call state toggle logic

- component Modal:
  - component accepts ReactNode children, onclose fn, name & isOpen as props
  - purpose for rendering common modal component that is out of the page DOM to render children of like new task or new project modal form jsx
  - returning jsx
    - div with full screen size background mask for children modals
      - div with Header component with close btn of modal & children
- src/app/api/projects/ModalNewProject.tsx:

  - component accepts isOpen & onClose fn as props
  - purpose for rendering new project modal form
  - mutation hook from api for RTK query api to create a new project
  - states for form inputs
  - submit handler
    - checks required fields
    - constants for formating dates with formatISO
    - calls mutation hook with form data
  - fn for validation of required fields to use in submit button of form
  - constant of common tailwind classes for input fields
  - returning jsx
    - Modal component with children jsx
      - form with inputs with onChange for state setters of projectName, description, startDate & endDate
    - submit btn with conditional tailwind styling, disabled property conditionally & text based on isFormValid fn & isLoading from mutation hook

- src/app/api/projects/[id]/page.tsx(1):

  - ModalNewTask component for form model of adding new task to project

- component ModalNewTask:

  - component accepts id,isOpen & onClose (setIsModalNewTaskOpen) fn as props
  - purpose for rendering new task modal form
  - mutation hook from api for RTK query api to create a new task
  - states for form inputs
  - submit handler

    - checks required fields
    - constants for formating dates with formatISO
    - calls mutation hook with form data

  - fn for validation of required fields to use in the submit btn of form
  - constant of common tailwind classes for input fields and select element
  - returning jsx - Modal component with children jsx - form includes inputs with onChange for state setters of title, description, tags, startDate, dueDate, authorUserId,assigneeUserId,projectId conditionally - select elements of status & priority with onChange for state setters of status, priority enums value for options - submit btn with conditional tailwind styling, disabled property conditionally & text based on isFormValid fn & isLoading from mutation hook

- src/app/api/timeline.tsx:
  - purpose for rendering timeline with gantt chart for projects as a individual page
  - constants
    - darkmode from global state
    - projects data from RTK query api
    - state for displayoptions conf from gantt-task-react for default view mode
  - constant for formatting the chart jsx with mapping fn of projects & creating it within useMemo hook to reduce re-renders will update ui as needed
  - fn for viewmode change event for select element of view mode options
  - loading & error returns from RTK query api on fetched tasks data
  - returning jsx
    - div containing heading & select element of view mode options
    - div containing Gantt chart (this div is wrapped in an div with classname="timeline" for global styling of chart)
- src/state/api.ts(2):
  - endpint object for api requests of query
    - search
- src/app/api/search.tsx:
  - purpose for rendering search page as standalone page for searching within projects tasks users fields
  - state hook for searchTerm (used to pass into search query api)
  - searchResults data from RTK query api & conf
  - search handler with debounce conf from pkg lodash
  - useEffect to cancel debounce on handleSearch.cancel from lodash
  - returning jsx
    - Header component
    - search input with onChange for handler of searchTerm
    - div containing:
      - loading & error returns from RTK query api on query searchResults data
      - conditionally jsx components for searchResults, map fn on searchResults for tasks, projects, users
- component ProjectCard:
  - component accepts project as props
  - returning jsx
    - div containing heading & paragraphs for name, description, dates
- component UserCard:
  - component accepts user as props
  - returning jsx conditionlly Image for profilePictureUrl, heading for username
- src/app/api/Settings.tsx:

  - purpose for rendering settings page (dummy for now)

- src/state/api.ts(3):
  - endpint object for api requests of user
    - getUsers
- src/app/api/users.tsx:
  - purpose for rendering users data in a Data grid like list page which can be filtered searched etc
  - darkmode from global state
  - users data from RTK query api
  - loading & error returns from RTK query api on fetched users data
  - returning jsx
    - Header component
    - div containing DataGrid component from mui/x-data-grid
      with properties:
      - columns as props of GridColDef[] type having userId, username, profilePictureUrl objects
      - getRowId as userId
      - pagination
- src/state/api.ts(4):
  - endpint object for api requests of team
    - getTeams
- src/app/api/teams.tsx:
  - purpose for rendering teams data in a Data grid like list page which can be filtered searched etc
  - darkmode from global state
  - teams data from RTK query api
  - loading & error returns from RTK query api on fetched teams data
  - returning jsx
    - Header component
    - div containing DataGrid component from mui/x-data-grid
    - with properties:
      - columns as props of GridColDef[] type having id, teamName, productOwnerUsername, ProductManagerUsername objects
      - pagination
      - slots with toolbar object of custom toolbar for DataGrid component filters & search features
- src/app/home.tsx:
  - purpose for rendering HomePage as page at root with charts & tasks of projects
  - Tasks data from RTK query api for specified project id (_pending_ later on passed as props as per strategy of home page reqirements)
  - Projects data from RTK query api
  - darkmode from global state
  - loading & error returns from RTK query api on fetched tasks & projects data
  - constant of object from reduce fn onto the tasks data of a project to accumulate priority count data for from enum Priority for each task
  - constant of Array of objects of name & count properties its data from getting keys through map fn on priorityCount with Object.keys fn
  - constant for statusCount for Projects data same as taskDistribution, status of Completed of Active depending of endDate of project
  - constant for projectStatus an Array of Objects map fn on Object.key for
    statusCount
  - returning jsx:
    - Header component
    - grid container
      - BarChart from recharts (distribution of tasks based on priority)
      - PieChart from recharts (
        section of pie based on all projects status of dueDate Completed or Active
        )
      - DataGrid component from mui/x-data-grid (for tasks data of project)
- src/state/api.ts(5):
  - endpint object for api requests of task
    - getTasksByUser
- src/app/api/priority/reusablePriorityPage/index.tsx:
  - purpose for rendering a commmon component that will be used for tasks data of specific user fetching based on priority
  - component accepts priority as props from enum Priority
  - states
    - view
    - isModalNewTaskOpen
    - Tasks data of specific user from RTK query api
    - darkMode state from global state
    - filteredTasks by priority prop
    - isTasksError returns from RTK query api on fetched tasks data
  - returning jsx
    - ModalNewTask component
    - Header component
    - div containing buttons for setView setter to eather list or table
    - conditionally rendering filteredTasks with TaskCard map fn for list view or table view with DataGrid component from mui/x-data-grid
- src/app/api/priority/high/page.tsx:
  - purpose rendering ReusablePriorityPage component for High priority tasks
- src/app/api/priority/urgent/page.tsx:
  - purpose rendering ReusablePriorityPage component for Urgent priority tasks
- src/app/api/priority/medium/page.tsx:
  - purpose rendering ReusablePriorityPage component for Medium priority tasks
- src/app/api/priority/low/page.tsx:
  - purpose rendering ReusablePriorityPage component for Low priority tasks
- src/app/api/priority/backlog/page.tsx:
  - purpose rendering ReusablePriorityPage component for Backlog priority tasks

## ./server

node express ts prisma postgresql

- package.json:
  - dependencies/dev dependencies
- tsconfig.json:
  - conf
- index.ts:
  - express app conf
  - express mw, pkg mw conf
- prisma init:
  - schama.prisma conf
- prisma/seedData/\*.json:
  - mock data for seeding
- prisma/seed.ts:
  - main fn for seeding data
  - deleteAllData fn for clearing all existing data
- prisma/schema.prisma:
  - schema definition for models
    - User
    - Project
    - Team
    - Task
    - ProjectTeam
    - Attachment
    - Comment
    - TaskAssignment
- .env:
  - PORT
  - DATABASE_URL
- _npx prisma generate_: generate models from schema.prisma in nodemodules
- _npx prisma migrate dev --name init_: migrate models database sync with schema.
- _seed script_: "ts-node prisma/seed.ts"
- scripts:
  - "build": "rimraf dist && npx tsc"
  - "start": "npm run build && node dist/index.js"
  - "dev": "npm run build && concurrently \"npx tsc -w\" \"nodemon --exec ts-node src/index.ts\""
- _Note_:
  - test api route in terminal - _curl localhost:8000_
- src/controllers:
  - projectController.ts:
    - fn getProjects
    - fn createProject
  - taskController.ts:
    - fn _getTasks_
    - fn _createTask_
    - fn _updateTaskStatus_
    - fn _getUserTasks_
  - searchController.ts:
    - fn _search_
      - tasks: title, description
      - projects: name, description
      - users: username
  - userController.ts:
    - fn _getUsers_
  - teamController.ts:
    - fn _getTeams_
      - teams data with additionally fetched usernames of productOwner & projectManager
- src/routes:

  - projectRoutes.ts: express router conf
    - GET / - _getProjects_
    - POST / - _createProject_
  - taskRoutes.ts: express router conf
    - GET / - _getTasks_
    - POST / - _createTask_
    - PATCH /:taskId/status - _updateTaskStatus_
    - GET /user/:userId - _getUserTasks_
  - searchRoutes.ts: express router conf
    - GET / - _search_
  - userRoutes.ts: express router conf
    - GET / - _getUsers_
  - teamRoutes.ts: express router conf
    - GET / - _getTeams_

- src/index.ts(1):
  - /api/projects project routes mw
  - /api/tasks tasks routes mw
  - /api/search search routes mw
  - /api/users user routes mw
  - /api/teams team routes mw

## challenges

- have a consistent navbar & sidebar across all pages: dashboardWrapper.tsx for layout.tsx

- have a global state of sidebar collapse/expand state : redux.tsx Redux setup utilizing Redux Toolkit and Redux Persist for state management and persisting state in local storage ensuring that the state is preserved even when the user refreshes the page or closes the browser.

- integrate api calls store the recived datain global store: RTK Query

- Data model: lucid.app

- Database: PostgreSQL-17.0 pgadmin4

- ORM: Prisma

- scalable backend APIs: api server with nodejs, express, ts

- intergate backend APIs with nextjs frontend RTK Query createApi method: ts interfaces for api endpoints

- use DND for changing the status of tasks on project view page:

- !PENDING! open up comments modal to see comments on a task

- component (Modal) for creating 2 modals of new task and new project

- when rendering the tasks on priority based pages, the tasks fetching logic should use the id on the logged in user to fetch the tasks of that user: cognito auth call in page to grab user id, then use tasks fetching RTK query api but with skip feature.

- some stategy for rendering the priority based pages gives the user authored & assigneed tasks in same list with no visual diffrentiation between them.

The provided file is a Prisma schema definition for a database using PostgreSQL. It outlines the structure of several models that represent entities in an application, likely for a task management system. Here's a summary of the key components:

1. **Generators and Datasources**:

   - **Generator**: Specifies the use of the Prisma Client for JavaScript.
   - **Datasource**: Connects to a PostgreSQL database using an environment variable for the database URL.

2. **Models**:
   - **User**: Represents users with fields for user ID, Cognito ID, username, profile picture, and relationships to tasks, attachments, comments, and teams.
   - **Team**: Represents teams with fields for team ID, name, and relationships to users and project teams.
   - **Project**: Represents projects with fields for project ID, name, description, dates, and relationships to tasks and project teams.
   - **ProjectTeam**: Represents the association between teams and projects.
   - **Task**: Represents tasks with fields for task ID, title, description, status, priority, dates, points, and relationships to projects, authors, assignees, and comments.
   - **TaskAssignment**: Represents the assignment of users to tasks.
   - **Attachment**: Represents files associated with tasks, including fields for file URL, name, and relationships to tasks and users.
   - **Comment**: Represents comments on tasks, including fields for text and relationships to tasks and users.

Overall, this schema defines a relational structure for managing users, teams, projects, tasks, and their associated data in a task management application.

aws pw

KLPm5$Vu%?@Jk67g
KLPm5$Vu%?@Jk67g
