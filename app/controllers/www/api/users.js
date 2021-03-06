/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-users
 */
'use strict';

exports.init = function(app) {
    const router = app.router;
    const User = app.models.User;
    const Users = app.db.Collection.extend({
        model: User
    });

    router.get('/api/users', function *() {
        let query = this.query;
        let users = Users.forge();

        users = yield users.fetchItems(qb => {
            qb.orderBy('id', 'asc'); //desc
        }, {
            page: query.page,
            per_page: query.per_page,
        });

        this.body = users;
    });
};
