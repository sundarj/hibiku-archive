module.exports = (function(app) {
    
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const config = require('./config');

    const postsSchema = new Schema({
        page: String,
        content: {}
    });

    const Post = mongoose.model('Post', postsSchema);
    
    function connect() {
        const db = mongoose.connect('mongodb://' + config.db.host +'/' + config.db.name).connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('db connected; listening on :8080');
            app.listen(8080);
        });
    }
    
    function createPostOrUpdate(opts) {
        Post.update({
            page: opts.page
        }, {
            content: opts.content
        }, {
            upsert: true
        }).exec();
    }
    
    return {
        post: Post,
        connect: connect,
        createPostOrUpdate: createPostOrUpdate
    }
    
});