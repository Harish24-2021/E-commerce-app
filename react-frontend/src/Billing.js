import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { productsDataSelector } from "./Business/Store/productsSlice";

function Billing(props) {
  const dispatch = useDispatch();
  const productsData = useSelector(productsDataSelector);

  const handlePlaceOrder = () => {
    alert("Order placed..Thank you for shopping");
    window.location.reload();
  };
  let totalAmount = 0,
    sno = 0;

  return (
    <div className="billing-details">
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
            {productsData
              ? productsData?.map((product) => {
                //   let key = Number(key1);

                  if (
                    
                    product["quantity"] !== 0
                  ) {
                    totalAmount =
                      totalAmount +
                      product.quantity * product.price;
                    sno = sno + 1;

                    console.log(productsData);
                    return (
                      <tr>
                        <td>{sno}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          Rs.{" "}
                          {product.quantity * product.price}
                        </td>
                      </tr>
                    );
                  }
                  return [];
                })
              : null}

            <tr>
              <td>
                <b>Total</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Rs. {totalAmount}</b>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="placeOrderButton" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Billing;
