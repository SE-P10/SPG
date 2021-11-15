'use strict';

exports.filter_args = (default_, ...sources) => {

    if (!this.isObject(default_))
        return Object.assign({}, ...sources);

    let merged = Object.assign({}, ...sources);

    for (const key in default_) {
        if (key in merged) {
            Object.assign(default_, { [key]: merged[key] });
        }
    }

    return default_;
}

exports.filter_args_deep = (default_, ...sources) => {
    if (!sources.length) return default_;
    const source = sources.shift();

    if (this.isObject(default_) && this.isObject(source)) {
        for (const key in source) {
            if (key in default_) {
                if (this.isObject(default_[key])) {
                    if (!source[key])
                        Object.assign(source, { [key]: {} });
                    this.filter_args_deep(default_[key], source[key]);
                } else {
                    Object.assign(default_, { [key]: source[key] });
                }
            }
        }
    }

    return this.filter_args_deep(default_, ...sources);
}

exports.isEmptyObject = (obj) => {
    var name;

    for (name in obj) {
        return false;
    }
    return true;
}

exports.isDefined = (value, not = false) => {
    return !(value === null || typeof value === 'undefined' || typeof value === undefined) ? (not === false ? true : value) : not;
}


exports.isArray = (item, not = false) => {
    return this.isDefined(item) && (typeof item === 'object' && Array.isArray(item)) ? (not === false ? true : item) : not
}

exports.isObject = (item, not = false) => {
    return this.isDefined(item) && (typeof item === 'object' && !Array.isArray(item)) ? (not === false ? true : item) : not
}

exports.booleanize = (string) => {

    if (!string)
        return false;

    if (typeof string === 'string')
        string.toLowerCase().trim();

    switch (string) {
        case "true":
        case "yes":
        case "1":
        case "on":
            return true;
        case "false":
        case "no":
        case "0":
        case "off":
        case null:
            return false;
        default:
            return Boolean(string);
    }
}

exports.removeEmpty = (item, default_ = null, strict = false) => {
    let res = null;

    if (this.isDefined(item)) {

        if (this.isObject(item) && !this.isEmptyObject(item)) {

            for (let propName in item) {

                item[propName] = this.removeEmpty(item[propName], null, strict);

                if (!this.isDefined(item[propName])) {
                    delete item[propName];
                }
            }

            if (!this.isEmptyObject(item)) {
                res = item;
            }

        } else if (this.isArray(item)) {
            if (item.length > 0) {

                res = item.map(el => {
                    return this.removeEmpty(el, null, strict);
                }).filter(el => {
                    return this.isDefined(el) && (this.isArray(el) ? el.length > 0 : true);
                });

            }
        } else if (strict ? this.booleanize(item) : !!item) {
            res = item;
        }
    }

    return this.isDefined(res, default_);
}

exports.dynamicSQL = (action, obj, where = false) => {

    let sql = action + ' ';

    if (!this.isEmptyObject(obj))
        sql += (Object.keys(obj).join(' = ?, ') + ' = ? ');

    if (where)
        sql += "WHERE " + Object.keys(where).join(' = ? AND ') + " = ?";

    return { sql: sql, values: [...Object.values(obj), ...Object.values(where || {})] }
}

exports.bulkSQL = async (db, sql, rows, callbacks = {}, transaction = true) => {

    let processed = [];

    let { before, after } = callbacks;

    let beforeRes, afterRes;

    return new Promise(async (resolve, reject) => {

        if (!rows || !sql || !db)
            return reject('Empty bulkSQL arguments');

        db.serialize(async () => {

            if (transaction) {
                db.run("BEGIN TRANSACTION;");
            }

            for (let i = 0; i < rows.length; i++) {

                if (before) {

                    beforeRes = await before(rows[i]);
                    if (!beforeRes) {
                        if (transaction) {
                            db.run("ROLLBACK;");
                        }
                        return reject("Query not passed checks");
                    }
                }

                let res = await new Promise((resolve2, reject2) => {
                    db.run(sql, rows[i], async function (err) {

                        if (err) {
                            if (transaction) {
                                db.run("ROLLBACK;");
                            }
                            return reject(err);
                        }

                        if (after) {

                            afterRes = await after(rows[i], this.lastID, beforeRes);
                            if (!afterRes) {
                                if (transaction) {
                                    db.run("ROLLBACK;");
                                }
                                return reject("Query not passed actions");
                            }
                        }

                        resolve2(this.lastID || true);
                    });
                })

                if (res) {
                    processed.push(res);
                }
                else {
                    processed = [];
                    break;
                }
            }

            if (transaction) {
                db.run("COMMIT;");
            }

            resolve(processed);
        });
    });
}

exports.existValueInDB = async (db, table, fieldValue, returnDef = false) => {
    return new Promise(async (resolve, reject) => {

        let dinoSQL = this.dynamicSQL("SELECT * FROM " + table, {}, fieldValue);

        db.get(dinoSQL.sql, [...dinoSQL.values], (err, row) => {
            if (err) {
                console.log(err)
                resolve(false);
            }
            else {
                resolve(!!row ? (dinoSQL.values.length === 1 ? dinoSQL.values[0] : dinoSQL.values) : returnDef);
            }
        });
    })
}

exports.getQuerySQL = async (db, sql, values, objDef = {}, returnFail = null, single = false) => {

    return new Promise((resolve, reject) => {

        if (single) {
            db.get(sql, [...values], (err, row) => {

                if (err || !row) {
                    resolve(returnFail);
                }
                else {
                    resolve({ ...this.filter_args(objDef, row) });
                }
            });
        }
        else {
            db.all(sql, [...values], (err, rows) => {

                if (err || !rows) {
                    resolve(returnFail);
                }
                else {
                    const rets = rows.map((row) => { return { ...this.filter_args(objDef, row) } });
                    resolve(rets);
                }
            });
        }
    });
}

exports.runQuerySQL = async (db, sql, values, res = false) => {

    return new Promise((resolve, reject) => {

        db.run(sql, [...values], function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve(res ? (this.lastID || this.changes) : true);
            }
        });
    })
}
