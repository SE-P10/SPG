Team P10 RETROSPECTIVE Sprint #2
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 6/6
- Total points committed vs done : 41/41
- Nr of hours planned vs spent (as a team) : 117h 20m / 111h 30m 


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
| 0      |    29     |    -   |     88h 20m       |    91h 10m  |
| 1      |    1    |    5   |    2h        |    2h 30m          |
| 2      |     1    |  5   |     1h 30m       |   1h 30m           |
| 3      |     1    |   5    |     4h       |    3h 5m           |
| 4      |      3   |  13    |     15h 30m      |     9h 15m         |
| 5      |     2    |  8     |     3h 30m      |        1h 30m    |
| 6      |    1     |    5   |     2h 30m       |        2h 30m    |



- Hours per task (average, standard deviation) : 2.9h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table : 0.95

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 6h 30m
  - Total hours spent : 6h 30m
  - Nr of automated unit test cases : 43
  - Coverage  : 82.6 %
- E2E testing:
  - Total hours estimated : 6h
  - Total hours spent : 8h
- Code review 
  - Total hours estimated : 1d 2h 30m
  - Total hours spent : 1d 7h 15m
- Technical Debt management:
  - Total hours estimated : 1h
  - Total hours spent : 2h
  - Hours estimated for remediation by SonarQube : 1h 30m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues : we spent 1h 30m to reduce duplications , minimize code smells and assert that there were no blocker code smells 
  - Hours spent on remediation  : 1h 30m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") : 0.5 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
  <br>Reliability : A <br>Security : A
  <br>Maintainability : A
  
## ASSESSMENT

- What caused your errors in estimation (if any)? <br>
Code review and Tecnical debt management required more hours than eximated<br> Some tasks required less time than expected thanks to reuse of code <br>Task 'switch dark mode' not implemented because it had a lower priority than testing


- What lessons did you learn (both positive and negative) in this sprint? <br>
Before doing unit test wait for a defined structure of the code<br>
- Which improvement goals set in the previous retrospective were you able to achieve? <br>
<br>We were able to achieve better coordination between Back-end and front-end, in particular for the API calls and function's paramters
<br>We managed to Connect Sonar with Jest and Cypress test to report sonar coverage 
<br>We add two separate task for testing (unit and E2E), add a task 'code review'
<br>Solve issues opened by the stakeholders
- Which ones you were not able to achieve? Why?<br>
  We didn't added a task for remediation of a specific issue by sonar because all issues were included in the task 'tecnical debt management'

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
<br> Dedicate more hours for technical debt management and sonar<br>
Employ more people for testing <br>  


- One thing you are proud of as a Team!!<br>
When we got a problem we go straight to a single and shared solution
