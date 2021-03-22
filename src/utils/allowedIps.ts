const ipfilter = require("express-ipfilter").IpFilter;

const ips = ["::1"];

const ipFiltered = ipfilter(ips, { mode: "allow" });

export default ipFiltered;
