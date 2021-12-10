/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 * Copyright (C) 2017-2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
const path = require('path')
const { OrmLog } = require('../logger')

const config = process.env.NODE_ENV === 'production'
    ? {
        // 线上数据库名
        database: 'lesscode',
        // 线上数据库用户名
        username: 'root',
        // 线上数据库密码
        password: 'rrmcKyrRrdzU',
        // 线上host
        host: 'mysql-default.service.consul',
        // 线上端口
        port: 3306,
        dialect: 'mysql',
        // 线上记录日志类型，默认为记录 error 日志，可选为 ['error', 'info', 'warn']
        logging: ['error']
    }
    : {
        // 本地开发数据库名
        database: '',
        // 本地开发数据库用户名
        username: '',
        // 本地开发数据库密码
        password: '',
        // 本地开发host
        host: 'localhost',
        // 本地开发端口
        port: 3306,
        dialect: 'mysql',
        // 本地记录日志类型，默认为记录所有日志，可选为 ['error', 'info', 'warn']
        logging: 'all'
    }
module.exports = {
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [path.resolve(__dirname, '..', 'model/entities/!(base){.js,.ts}')],
    // 打印日志的类型
    logger: new OrmLog(config.logging),
    // 自动同步数据库表结构，有删除数据风险，推荐关闭
    synchronize: true,
    // 会自动执行更新SQL，推荐手动执行脚本，关闭该选项
    migrationsRun: true,
    extra: {
        connectionLimit: 5
    }
}
