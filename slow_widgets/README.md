Slow Widgets
=================

### Instructions:

Create a technical improvement plan given limited information

### Scenario:

An application that you have just assumed complete responsibility for is used for finding locations that sell widgets near a given user. This application has an integration with an external system that lets users filter the results by their favorite widgets. User complaints have come in, saying the system:

* Is slow looking up nearby widgets
* Does not provide user feedback when importing favorite widgets

The task is to plan out priorities for technical improvement for this application, given the following context:
* A team is in place to implement changes
* The metrics below are all that are currently captured for the application
* Assume a 6 week period with multiple deploy windows to improve the application


### Appendix A

| Web Transactions | App server time      |
|------------------|----------------------|
| IntegrationController#update | 1235 ms  |
| IntegrationController#lookup | 1145 ms  |
| LocationController#find      | 645 ms   |
| HomeController#index         | 126.9 ms |

### Appendix B - Transaction trace for LocationController#find

| Category       | Segment                            | % Time | Avg calls (per txn) | Avg time (ms) |
|----------------|------------------------------------|--------|---------------------|---------------|
| WebTransaction | /location/find                     | 100    | 1                   | 645           |
| Database       | Postgres DBRepo.FindByZip Query    | 41.9   | 6                   | 45            |
| Database       | Postgres DBRepo.LookupZip QueryRow | 7.9    | 12                  | 4.24          |
| Database       | Postgres DBRepo.FindUser Query     | 0.62   | 0.997               | 4.05          |


#### Submission

Answer the questions in under 600 words, and store as a plain text file.

When you are done, create a zip file containing that file, [create a candidate account on our recruiting site](https://people.adhoc.team/candidates/sign_up) and upload your solution.
