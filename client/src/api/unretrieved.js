import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear);

/* Return the unretrieved products as an array of objects like 
   {product_id: 0, timestamp: 0, client: 'client@demo.it', quantity: 0, name: 'apple', farmer: 'farmer@demo.it'} */
async function getUnretrievedProducts() {
    // call: GET /api/products
    const response = await fetch('/api/products/unretrieved');
    const productsJson = await response.json();
    if (response.ok) {
      	return productsJson.map(p => ({ product_id: p.id, timestamp: p.timestamp, quantity: p.quantity, name: p.name, farmer: p.farmer, client: p.client }));
    } else {
      	throw productsJson;  // an object with the error coming from the server
    }
}

/* Receive an array of products and return the monthly or weekly (according to the value of base) statistics of unretrieved products, 
   return an array of objects like {product_id: 0, month/week: 0, year: 2022, name: 'apple', quantity: 0, farmer: 'farmer@demo.it'} */
const getSatistics = (products, base, single_products = true) => products.reduce((prv, crr) => {
        //get the index of the current product for the related month/week
        const index = prv.findIndex(e => 
            (base === 'week' ? e.week === dayjs.unix(crr.timestamp).week() : e.month === dayjs.unix(crr.timestamp).month()) && e.year === dayjs.unix(crr.timestamp).year() && (e.product_id === crr.id || !single_products) );
        if(index >= 0) //the product has already been considered for the corresponding month
            return prv.map((e, i) => i !== index ? e : 
                Object.fromEntries([...Object.entries(e).filter(k => !k.includes('quantity')), ['quantity', e.quantity + crr.quantity]]));
                //return the same objects with the incremented quantity
        else //add a new object to the array
            return [...prv, Object.fromEntries([
                [base, base === 'month' ? dayjs.unix(crr.timestamp).month() : dayjs.unix(crr.timestamp).week()],
                ["year", dayjs.unix(crr.timestamp).year()], ["quantity", crr.quantity],
                ...(single_products ? [["product_id", crr.product_id], ["name", crr.name], ["farmer", crr.farmer]] : [])
            ])];
}, []);

const unrtrievedAPI = { getUnretrievedProducts, getSatistics }

export default unrtrievedAPI;