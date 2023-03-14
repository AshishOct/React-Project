import React, { PureComponent } from 'react';

class OutOfStockButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <input name="addToCart" value="Out Of Stock" className="cart_add_product_btn stockout-btn" type="button" />
         );
    }
}
 
export default OutOfStockButton;