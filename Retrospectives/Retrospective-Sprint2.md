Team P10 RETROSPECTIVE Sprint #1
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 6/6
- Total points committed vs done : 41/41
- Nr of hours planned vs spent (as a team) : 112h / 


### Definition of Done
- Unit Tests passing
- Code review completed
- Working code present on VCS
- No Blocker sonar code smells
- No bugs on sonar
- End-to-End tests performed



### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| 0      |    10     |    -   |     82h       |     80h 5m         |
| 1      |     3    |    8    |    8h        |    8h 40m          |
| 2      |    2     |     5   |    4h 30m        |   4h45m           |
| 3      |    1     |   3     |     1h       |   35m            |
| 4      |    3     |    5    |     9h       |     12h         |
| 5      |    3     |   3     |     8h       |         7h     |
| 6      |    3     |   3     |     8h       |         7h     |



- Hours per task (average, standard deviation) : 5h 10m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table : 1.006

  
## QUALITY MEASURES 

We don't have a separate task for unit and E2E but an unique task called 'test application' for wich we have the following measures :
<br> - Total hourse estimated : 3h<br> - Total hours spent : 8h<br>For the next sprint we will have two different tasks
- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases : 9
  - Coverage (if available) 
- E2E testing:
  - Total hours estimated
  - Total hours spent
- Code review 
  - Total hours estimated 
  - Total hours spent 
- Technical Debt management:
  - Total hours estimated : 4h
  - Total hours spent : 4h
  <br>We did the technical debt management entirely with sonar<br>
  - Hours estimated for remediation by SonarQube : 4h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues : we did not planned issues in this sprint , for the next sprint during the planning we will plan the remediation for some issues we encountered in this sprint
  - Hours spent on remediation  : 4h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") ; 0.7 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
  <br>Reliability : A <br>Security : A
  <br>Maintainability : A
  


## ASSESSMENT

- What caused your errors in estimation (if any)? <br>
Testing required more hours than eximated<br>
We over-estimated the 'solve git hub issues' task beacuse in the last demo we spent a lot of time on it but during this sprint , thanks to what we have learnt in the previous demo , we spent less time and managed better gitHub.

- What lessons did you learn (both positive and negative) in this sprint? <br>
Communication between front-end and back-end in very important , in particular for don't lose time
  
- Which improvement goals set in the previous retrospective were you able to achieve? <br>
  None(This was the first sprint)

- Which ones you were not able to achieve? Why?<br>
  None(This was the first sprint)

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
<br>Better coordination between Back-end and front-end, in particular for the API calls and function's paramters
<br>Connect Sonar with Jest and Cypress test to report sonar coverage 
<br>Add two separate task for testing (unit and E2E), add a task 'code review'
<br>Solve issues opened by the stakeholders<br>Add specific task for remediation of a specific issue by Sonar


- One thing you are proud of as a Team!!<br>
When we got a problem we go straight to a single and shared solution
