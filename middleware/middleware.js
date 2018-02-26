module.exports = (req, res, next) => {
    if(!req.body.title) {
        return res.send({message: 'title must not null'});
    }
    /** @namespace req.body.author */
    if(!req.body.author) {
        return res.send({message: 'author must not null'});
    }
    if(req.body.author.length > 99) {
        return res.send({message: 'author must < 100 character'});
    }
    if(req.body.title.length >39) {
        return res.send({message: 'title must < 40 character'});
    }
    next();
};