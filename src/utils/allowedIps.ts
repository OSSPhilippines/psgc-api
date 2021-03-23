import { IpFilter as ipfilter } from "express-ipfilter";

const ips = ["::1", "::ffff:127.0.0.1"];
const ipFiltered = ipfilter(ips, { mode: "allow" });
export default ipFiltered;
