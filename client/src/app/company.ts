export class company {
 
    b_name: string;
    b_type:string;
    pre_mobile: string;
    mobile: string;
    pre_phone: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    budgetTotal: string;
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
 
}