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
                        {props.productList ? Object.keys(props.productList).map(key1 => {
                            

                            let key = Number(key1)
                           
                            if (props.productList[key] && props.productList[key]['quantity'] !== 0) {
                                totalAmount=totalAmount+props.productList[key].quantity * props.productList[key].Price
                                sno=sno+1
 console.log(key)
console.log(props.productList[key])
console.log(props.productList)
                             return <tr>
                                    <td>{sno}</td>
                                    <td>{props.productList[key].name}</td>
                                    <td>{props.productList[key].Price}</td>
                                    <td>{props.productList[key].quantity}</td>
                                    <td>Rs. {props.productList[key].quantity * props.productList[key].Price}</td>
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
