# midterm project

## Resources

Object for trails <br />
Attributes:

* rideName (string)
* difficulty (string)
* description (string)
* likes (number)
* comments(list of objects) <br>
&nbsp;&nbsp;&nbsp;&nbsp;  author (string) <br>
&nbsp;&nbsp;&nbsp;&nbsp;  content (string) <br>
* miles (number)
* latitude (number)
* longitude (number)


## REST ENDPOINTS

Name                           | Method | Path
-------------------------------|--------|-------------------------
Retrieve trails collection     | GET    | /trails
Create trail                   | POST   | /trails
Get trail based of difficulty  | GET    | /trails/filter/:diff
Create comment                 | POST   | /trails/:trailId/comments
Update trail info              | PUT    | /trails/:trailId
Delete trail                   | DELETE | /trails/:trailId

