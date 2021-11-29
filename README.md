# ScheduleAI: Smart Scheduling Assistant

Available online at `https://scheduleaicmpe.herokuapp.com`

ScheduleAI is an automatic hour-by-hour scheduling system designed for students and professionals who seek to
improve their productivity and focus. The web application utilizes an algorithm that balances the workload for any
number of tasks for the user. Its design is focused on organization, ease of use, and seamlessness. Our team, Company25,
hopes that ScheduleAI becomes a useful tool for everyone.

# Development Requirements

1. NodeJS (v17.1.0 or later)
2. npm (v17.24.0 or later)

# Build Instruction

1. Clone this repository
   `git clone https://github.com/gggonzalez03/schedule-ai.git`
2. `cd` into the folder `schedule-ai`
3. Run `npm install`
4. Run `npm start`

At this point, default browser will open and load `http://localhost:3000/`, which is the login page of ScheduleAI

# Folder Structure

```
- schedule-ai/
  - src/
    - actions/
      --- api.js
      --- calendar.js
      --- dummyData.js
      --- taskedit.js
      --- taskview.js
      --- template.js
      --- user.js
    - components/
      - AddTaskBar/
      - CommitmentEdit/
      - CommitmentsList/
        - CommitmentItem/
          - img/
        - img/
      - DashboardBar/
      - TaskEdit/
      - TaskList/
        - TaskItem/
        - TaskListSection/
          - img/
    - pages/
      - TaskDashboard/
        - img/
      - home/
        - img/
    - reducers/
      --- index.js
      --- store.js
      --- taskview.js
      --- user.js
    --- App.js
    --- index.js
  --- package.json
  - README.md
```
