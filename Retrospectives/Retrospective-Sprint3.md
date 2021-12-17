Team P10 RETROSPECTIVE Sprint #3
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 5/5
- Total points committed vs done : 40/40
- Nr of hours planned vs spent (as a team) : 112h 30m / 139h 


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
| 0      |    16     |    -   |    84h       |  114 45m   |
| 1      |    2    |    5   |    3h        |    2h 45m          |
| 2      |     1    |  3   |    1h 30m      |      2h        |
| 3      |    4     |   21    |    11h 30m       |    13h 10m           |
| 4      |    2     |  3    |     7h 30m      |   4h 20m          |
| 5      |    2     |   8    |     5h     |   2h         |



- Hours per task (average, standard deviation) : 5h, 2h 30m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table : 0.81

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 13h 30m
  - Total hours spent : 17h 50m
  - Nr of automated unit test cases : 66 (43 old)
  - Coverage  : 82.6 %
- E2E testing:
  - Total hours estimated : 6h
  - Total hours spent : 7h
- Code review 
  - Total hours estimated : 12 h
  - Total hours spent : 19h 25m
- Technical Debt management:
  - Total hours estimated : 4h
  - Total hours spent : 3h 15m
  - Hours estimated for remediation by SonarQube : 4h 22m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues : 2h (reduce replication, delete blocker code smells , reduce critical code smells, assert no bug present) 
  - Hours spent on remediation  : we spent 2h 5m to reduce duplications , minimize code smells and assert that there were no blocker code smells
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") : 0.2 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
  <br>Reliability : A <br>Security : A
  <br>Maintainability : A
  
## ASSESSMENT

- What caused your errors in estimation (if any)? <br>
We underestimated the manage of the virtual clock, we were not able to complete the task related to it <br>Unit test required more time beacuse some people started approaching it for the first time <br> Some tasks required less time than expected thanks to reuse of code , for example to create page for product confirmation and order change<br>


- What lessons did you learn (both positive and negative) in this sprint? <br>
Meetings in presence are better than virtual ones<br>
Time is a difficult aspect to manage, to not be understimate and take in account since the beginning of the development<br>

- Which improvement goals set in the previous retrospective were you able to achieve? <br>
<br>We dedicate more hours for Technical debt management and Sonar
<br>We were able to start Sonar analysis also in different branches, beyond the master 
<br>We were able to squash commit  
<br>We employed more people for testing
<br>Solve issues opened by the stakeholders

- Which ones you were not able to achieve? Why?<br> 
  We could improve testing now that we have more people involved

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.) 
<br> We want to better manage our time<br>


- One thing you are proud of as a Team!!<br>
When we got a problem we go straight to a single and shared solution
