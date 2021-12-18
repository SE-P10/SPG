'use strict';

const dayjs = require("dayjs");

exports.getVirtualTimestamp = (req, offset = false, asDayJS = false) => {

    let time = ((req.session || req).timeOffset || 0) + (offset ? 0 : dayjs().unix());

    if (!offset && asDayJS) {

        return dayjs.unix(time);
    }

    return time
}

// function to controll if a option is good to exucute at a specific time
exports.is_possible = (req) => {

    let time = this.getVirtualTimestamp(req, false, true);

    let d = time.format("d");
    let h = time.format("H");

    const possible = {
        farmer_estimation: false,
        farmer_confirm_orders: false,
        farmer_deliver_products: false,
        clients_send_orders: false,
        clients_pickup_orders: false
    };

    if ((d == 5 && h >= 18) || (d == 6 && h < 9)) {
        possible.farmer_estimation = true;
    }

    if ((d == 6 && h > 9) || (d == 1 && h < 9)) {
        possible.farmer_confirm_orders = true;
    }

    if ((d == 1 && h > 9) || (d == 2 && h < 23)) {
        possible.farmer_deliver_products = true;
    }

    if (!((d == 0 && h > 23) || (d == 1 && h < 9))) {
        possible.clients_send_orders = true;
    }

    if ((d == 3 && h > 9) || (d == 4) || (d == 5 && h < 23)) {
        possible.clients_pickup_orders = true;
    }

    return possible;
}