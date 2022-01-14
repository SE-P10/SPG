Team P10 RETROSPECTIVE Sprint #4
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 3/3
- Total points committed vs done : 34/34
- Nr of hours planned vs spent (as a team) : 126h 30m  / 122h 55m 


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
| 0      |    20     |    -   |   98h 30m      |  102h 5m   |
| 1      |   1     |   13    |   12h        |    12h        |
| 2      |    4    |  13   |    12h      |     6h 45m       |
| 3      |     1    |   8   |     4h     |     2h      |




- Hours per task (average, standard deviation) : 4.7h , 1h 50m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table : 0.96

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 12h
  - Total hours spent : 7h
  - Nr of automated unit test cases : 59 ( +129 E2E test )
  - Coverage  : 85.6 %
- E2E testing:
  - Total hours estimated : 8h
  - Total hours spent : 21h 30m
- Code review 
  - Total hours estimated : 12h
  - Total hours spent : 11h 55m
- Technical Debt management:
  - Total hours estimated : 4h 
  - Total hours spent : 2h 15m (45 minutes were spent to no have too much code specialitation )
  - Hours estimated for remediation by SonarQube : 6h  (At the beginning of the sprint)
  - Hours estimated for remediation by SonarQube only for the selected and planned issues : 1h 50m (reduce replication, delete blocker code smells , reduce critical code smells, assert no bug present) 
  - Hours spent on remediation  : we spent 1h 30m to reduce duplications , minimize code smells and assert that there were no blocker code smells or bugs.
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") : 0.3 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
  <br>Reliability : A <br>Security : A
  <br>Maintainability : A
  
## ASSESSMENT

- What caused your errors in estimation (if any)? <br>
We didn't do the squash of commit beacuse we would not have obtained the desired result.<br>
As there have been some graphical improvements, some of the old E2E tests have had to be modified. We have decided to take time away from unit tests to dedicate it to E2E.



- What lessons did you learn (both positive and negative) in this sprint? <br>
The graphic improvment has the positive side that it makes the application more effective for the users, but at the same time it has the negative side that the old tests have to be modified.

- Which improvement goals set in the previous retrospective were you able to achieve? <br>
  We better managed our time, in particular we saved time at the beginning of the sprint to dedicate it to tasks that arose during the sprint.
  In the past sprints, during the planning of the hours we immediately assigned all the hours to be carried out, while in this we have taken into account the fact that different   tasks arise during development.<br>We also defined internal deadlines so that we had enough time to test and fix bugs.
  
- Which ones you were not able to achieve? Why?<br> 
  None

- One thing you are proud of as a Team!!<br>
When we got a problem we go straight to a single and shared solution
