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
        } else if (!strict || (strict && this.booleanize(item))) {
            res = item;
        }
    }

    return this.isDefined(res, default_);
}

exports.dynamicSQL = (action, obj, where = false) => {

    let sql = action + ' ';

    sql += (Object.keys(obj).join(' = ?, ') + ' = ? ');

    if (where)
        sql += "WHERE " + Object.keys(where).join(' = ? AND ') + " = ?";

    return { sql: sql, values: [...Object.values(obj), ...Object.values(where || {})] }
}

exports.bulkSQL = async (db, sql, rows) => {

    let processed = 0;

    if (!rows || !sql || !db)
        return 0;

    return new Promise(async (resolve, reject) => {

        await db.serialize(async () => {

            await db.run("BEGIN TRANSACTION;");

            for (let i = 0; i < rows.length; i++) {

                let res = await new Promise((resolve2, reject2) => {
                    db.run(sql, rows[i], function (err) {

                        if (err) {
                            db.run("ROLLBACK;");
                            return reject(err);
                        }

                        resolve2(this.lastID || true);
                    });
                })

                if (res) {
                    processed++;
                }
                else {
                    processed = 0;
                    break;
                }
            }

            await db.run("COMMIT;");

            resolve(processed);
        });
    });
}

exports.existValueInDB = async (db, table, field, value, returnDef = false) => {
    return new Promise(async (resolve, reject) => {
        db.get("SELECT 1 FROM " + table + " WHERE " + field + " = ?", [value], (err, row) => {
            if (err) {
                return resolve(false);
            }
            resolve(!!row ? value : returnDef);
        });
    })
}