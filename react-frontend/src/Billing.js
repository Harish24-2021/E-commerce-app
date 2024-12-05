import './App.css';


function Billing(props) {
    

let handlePlaceOrder=()=>{
props.handlePlaceOrder()
}
let totalAmount=0,sno=0


    return (

        <div className='billing-details'>
            
            <div class="card">
                <div class="container">
                    <table>
                        <tr>
                            <th>S.no</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                        {props.productsData ? Object.keys(props.productsData).map(key1 => {
                            

                            let key = Number(key1)
                           
                            if (props.productsData[key] && props.productsData[key]['quantity'] !== 0) {
                                totalAmount=totalAmount+props.productsData[key].quantity * props.productsData[key].price
                                sno=sno+1
 console.log(key)
console.log(props.productsData[key])
console.log(props.productsData)
                             return <tr>
                                    <td>{sno}</td>
                                    <td>{props.productsData[key].name}</td>
                                    <td>{props.productsData[key].price}</td>
                                    <td>{props.productsData[key].quantity}</td>
                                    <td>Rs. {props.productsData[key].quantity * props.productsData[key].price}</td>
                                </tr>

                            }
                            return []

                        }) : null}

                                      <tr>
                                    <td><b>Total</b></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>Rs. {totalAmount}</b></td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><button className='placeOrderButton' onClick={handlePlaceOrder}>Place Order</button></td>
                                </tr>
                    </table>


                </div>

            </div>
        </div>
    );
}

export default Billing;
