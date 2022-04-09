# 2022-04-08 Project Planning Meeting
## Agenda Items
- [x] select a project
- [x] git assignment
- [x] [user stories](./user_stories.md)
- [x] [ERD](./wikimap_ERD.png)
- [x] [routes](./routes_and_mvp.md)

## Notes
* Selected Project: Wiki Map

* Git Assignment Question:
  * Question 1: During this linear process, where Dev B changed the document after Dev A had already committed and pushed their change to the remote (GitHub), what extra step(s) could Developer B have taken to completely avoid this merge conflict?
  * Answer 1: Use git pull (fetch & then merge) before pushing
  * Question 2: Given your answer in Q1, does this mean that merge conflicts can be completely (always) avoided in the real world? Why or why not?
  * Answer 2: No? Because always a small window between pulling and pushing where the remote repo could be updated

* Ask Andy and/or mentor about using ElephantSQL instead of local psql

## What's next
* Check out how Google Maps API works to complete ERD and clarify the endpoint for `GET /pins/:id`
* Complete task tree
