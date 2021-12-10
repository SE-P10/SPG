'use strict';

const dayjs = require("dayjs");

exports.getVirtualTimestamp = (req, offset = false, asDayJS = false) => {

    let time = ((req.session || req).timeOffset || 0) + (offset ? 0 : dayjs().unix());

    if (!offset && asDayJS) {

        return dayjs.unix(time);
    }

    return time
}