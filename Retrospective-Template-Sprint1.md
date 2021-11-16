TEMPLATE FOR RETROSPECTIVE (Team P10)
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 5/5
- Total points committed vs done : 24/24
- Nr of hours planned vs spent (as a team) : 112h 30m / 113h 15m


### Definition of Done
- Unit Tests passing
- Code review completed
- Working code present on VCS
- No critical sonar code smells
- No bugs on sonar
- End-to-End tests performed



### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| 0      |    10     |    -   |     82h       |     79h 5m         |
| 1      |     3    |    8    |    8h        |    8h 40m          |
| 2      |    2     |     5   |    4h 30m        |   4h45m           |
| 3      |    1     |   3     |     1h       |   35m            |
| 4      |    3     |    5    |     9h       |     12h         |
| 5      |    3     |   3     |     8h       |         7h     |




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
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 
  - Hours spent on remediation  : 3h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
Testing requires more hours than eximated
We didn't considered problem of having different idea between back-end and front-end

- What lessons did you learn (both positive and negative) in this sprint?
Communication between front-end and back-end in very important , in particular for don't lose time
  
- Which improvement goals set in the previous retrospective were you able to achieve? 
  None(This was the first sprint)

- Which ones you were not able to achieve? Why?
  None(This was the first sprint)

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
<br>Better coordination between Back-end and front-end, in particular for the API calls and function's paramters
<br>Connect Sonar with Jest and Cypress test to report sonar coverage 
<br>Add two separate task for testing (unit and E2E), add a task 'code review'
<br>Solve issues opened by the stakeholders


- One thing you are proud of as a Team!!
When we got a problem we go straight to a single and shared solution