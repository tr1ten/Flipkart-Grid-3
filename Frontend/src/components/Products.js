import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../assets/flipkart_logo.png";
let products = [];

export default function Products(props) {
  const URL = process.env.REACT_APP_BASE_URL;
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = async (event, product) => {
    event.preventDefault(); // Prevent page reload

    const userId = localStorage.getItem("id"); // Get user ID from localStorage
    const productUid = product.product_uid; // Get product_uid
    console.log(userId);
    console.log(productUid);

    const apiEndpoint = `${URL}api/add-cart-data/`;

    try {
      // Make the API call to add the item to the cart
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          q: productUid,
        }),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Item added to cart successfully!");
        // Handle the successful response if needed

        // Update the cart items in state and local storage
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
      } else {
        // Handle errors or failed response
        console.error("Error adding item to cart:", response.statusText);
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = (event, productUid) => {
    event.preventDefault();
    console.log(productUid);
    // const updatedCartItems = cartItems.filter(item => item.product_uid !== productUid);
    // setCartItems(updatedCartItems);
    // localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
  };

  if (props.Title === "Search Results")
    products = props.SearchedItems;
  else if (props.Title === "Your Recommendations")
    products = props.RecommendedItems;
  else {
    const storedCartItems = localStorage.getItem("CartItems");
    products = storedCartItems ? JSON.parse(storedCartItems) : [];
  }
  // products.sort((a, b) => b.users_interested - a.users_interested);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products?.length !== 0 && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {props.Title}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((product) => (
                  <div
                    style={{ height: "450px" }}
                    key={product.product_uid}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <a href="#" key={product.product_uid}>
                      <img
                        style={{ height: "250px" }}
                        className="p-8 rounded-t-lg"
                        src={product.product_img_url}
                        alt="product image"
                        onError={(e) => {
                          e.target.src = defaultImage; // Replace with default image on error
                        }}
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        {product.product_title.length > 18
                          ? `${product.product_title.slice(0, 18)}...`
                          : product.product_title}
                      </a>

                      <div className="flex items-center mt-2.5 mb-5">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index <= Math.random() * 1 + 4
                                ? "text-yellow-300"
                                : "text-gray-200 dark:text-gray-600"
                            } mr-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                          {`?`}
                        </span>
                      </div>

                      <div className="flex align-left justify-between">
                        <span className="text-3xl font-bold text-gray-900 mr-1 ">
                          ₹{product.product_price}
                        </span>
                        {props.Title === "Cart" ? (
                          <button
                            href="#"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 "
                            // onClick={(event) =>
                            //   handleRemoveFromCart(event, product.product_uid)
                            // }
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            href="#"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                            onClick={(event) => handleAddToCart(event, product)}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {!products?.length && props.Title === "Items Related to your Search" && (
        <h2
          className="mt-8"
          style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Your Searched Items will display Here
        </h2>
      )}
      {!products?.length && props.Title === "Cart" && (
        <h2
          className="mt-8"
          style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Cart is Empty
        </h2>
      )}
    </div>
  );
}
