let statement = {
    insert : 'insert into Books set ?',
    update : 'update Books set ? where id = ',
    delete : 'delete from Books where id = ? limit 1',
    selectId : 'select * from Books where id = ? limit 1',
    select : 'select * from Books'
};

module.exports = statement;