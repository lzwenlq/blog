/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Users
*/
'use strict';

var db = require('../db');

module.exports = db.model('User', {
    tableName: 'users',
    hasTimestamps: true,
});
