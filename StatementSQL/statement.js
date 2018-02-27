let statement = {
    insert : "insert into Books set ?, `isDelete` = 0",
    selectId : 'select * from Books where id = ? and isDelete = 0 limit 1',
    select : 'select * from Books where isDelete = 0',
    update : 'update Books set ? where id = ',
    softDelete : "update Books set isDelete = 1 where id =?",
    delete : 'delete from Books where id = ? ',
    restore : "update Books set isDelete = 0 where isDelete = 1",
    restoreID : "update Books set isDelete = 0 where id =? limit 1",
    storeDelete : "select * from Books where isDelete =1"
};

module.exports = statement;