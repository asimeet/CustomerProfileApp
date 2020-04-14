import {CustomerBasic} from "./customer-basic";
import {CustomerAddress} from "./customer-address";

export class CustomerDetail {
    _id: String;
    basic: CustomerBasic;
    addresses: CustomerAddress[];
}
