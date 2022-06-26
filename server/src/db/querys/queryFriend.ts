const queryConstructor: string =
  'SELECT * FROM FRIEND_REQUEST AS FR WHERE FR.receiver = (?) AND FR.accepted =';

const queryConstructor2: string =
  "SELECT JSON_OBJECT('id',U.id,'username',U.username,'firstname',U.firstname,'lastname',U.lastname,'image',U.image,'age',U.age,'province',U.province,'country',JSON_OBJECT('id',C.id,'name',C.name,'code',C.code),'gender',JSON_OBJECT('id',G.id,'name',G.name),'metaData',JSON_OBJECT('friends',U.friends,'posts',U.posts,'likes',U.likes)) AS user";

// Friend_Request
export const queryFetchFriendRequestSingle: string =
  'SELECT * FROM FRIEND_REQUEST AS FR WHERE FR.id = (?)';

export const queryFetchFriendRequestRecived: string =
  queryConstructor + ' 2 AND FR.active = 1';

export const queryFetchFriendRequestAlreadyExistPending: string =
  queryConstructor + ' 2';

export const querySendFriendRequest: string =
  'INSERT INTO FRIEND_REQUEST (sender,receiver) VALUES (?,?)';

export const queryResponseFriendRequest: string =
  'UPDATE FRIEND_REQUEST AS FR SET FR.accepted = (?) WHERE FR.id = (?)';

export const queryFetchFriendRequestReceived: string =
  queryConstructor2 +
  ", JSON_OBJECT('id',FR.id,'state',JSON_OBJECT('state',FR.accepted,'name',AC.name)) as requestData FROM FRIEND_REQUEST AS FR INNER JOIN USER AS U ON U.id=FR.sender INNER JOIN COUNTRY AS C ON C.id=U.country INNER JOIN GENDER AS G ON G.id=U.GENDER INNER JOIN ACCEPTED AS AC ON AC.id=FR.accepted WHERE FR.receiver = (?) AND FR.active =1 AND FR.accepted= 2";

// Friend_List
export const queryCheckAlreadyYourFriend: string =
  'SELECT * FROM FRIEND_LIST AS FL WHERE FL.user1 = (?) AND FL.user2 = (?) AND FL.active = 1;';

export const queryGetFriendList: string =
  queryConstructor2 +
  ' FROM FRIEND_LIST AS FL INNER JOIN USER AS U ON U.id=FL.user2 INNER JOIN COUNTRY AS C ON C.id=U.country INNER JOIN GENDER AS G ON G.id=U.GENDER WHERE FL.user1 = (?) AND FL.active = 1';

export const queryAddFriend: string =
  'INSERT INTO FRIEND_LIST (user1,user2) VALUES (?,?),(?,?)';

export const queryRemoveFriend: string =
  'UPDATE FRIEND_LIST AS FL SET FL.active = 0 WHERE ((FL.user1 = (?) and FL.user2 = (?)) or (FL.user1= (?) and FL.user2= (?)))';

export const queryFriendHandleQuantity: string =
  'UPDATE USER SET friends = friends + (?) WHERE id = (?) OR id = (?)';
