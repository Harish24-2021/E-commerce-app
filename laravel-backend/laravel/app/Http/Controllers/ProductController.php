<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use PhpParser\Node\Stmt\Foreach_;

class ProductController extends Controller {

    public function createProduct(Request $request) {

        $productName = $request->input('productName');
        $productPrice = $request->input('productPrice');
        $productQuantity = $request->input('productQuantity');
        $productImage = $request->input('productImage');

        $product = Product::create([
            'name' => $productName,
            'price' => $productPrice,
            'quantity' => $productQuantity,
            'image' => $productImage
        ]);

        // Return success response
        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product
        ], 201);
    }

    public function fetchAmazonProducts($categoryId=1968024031, $page = 1) {
        $productsUrl = "https://real-time-amazon-data.p.rapidapi.com/products-by-category";
        $rapidApiKey = getenv('RAPID_API_KEY');

        $queryParams = http_build_query([
            'category_id' => $categoryId,
            'page' => $page,
            'country' => 'IN',
            'sort_by' => 'RELEVANCE',
            'product_condition' => 'ALL',
            'is_prime' => 'false',
            'deals_and_discounts' => 'NONE',
        ]);

        $curl = curl_init();
        curl_setopt_array($curl, [
        CURLOPT_URL => "$productsUrl?$queryParams",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT=>30,
        CURLOPT_HTTP_VERSION =>  CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST=> "GET",
        CURLOPT_HTTPHEADER=>[
        "x-rapidapi-host: real-time-amazon-data.p.rapidapi.com",
		"x-rapidapi-key: $rapidApiKey"
        ],

        ]);

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);
        if($error) {
            return ['error'=> $error];
        }

        // jkllkdf
        // lkdsfjklds
        // {
        //     "status": "OK",
        //     "request_id": "7d2711e2-8bec-4edf-bde5-0401513a08c0",
        //     "parameters": {
        //         "category_id": "1968024031",
        //         "country": "IN",
        //         "sort_by": "RELEVANCE",
        //         "page": 1,
        //         "is_prime": false
        //     },
        //     "data": {
        //         "total_products": 45643,
        //         "country": "IN",
        //         "domain": "www.amazon.in",
        //         "products": [
        //             {
        //                 "asin": "B0D8GT7F42",
        //                 "product_title": "SJeware 6 Pairs Sports Solid Ankle Length Socks for Men &amp; Women, Multicolor, Pack of 6, Free Size",
        //                 "product_price": "₹129",
        //                 "unit_price": "₹10.75",
        //                 "unit_count": 12,
        //                 "product_original_price": "₹1,299",
        //                 "currency": "INR",
        //                 "product_star_rating": "4.1",
        //                 "product_num_ratings": 0,
        //                 "product_url": "https://www.amazon.in/dp/B0D8GT7F42",
        //                 "product_photo": "https://m.media-amazon.com/images/I/61PVU00xgyL._AC_UL960_FMwebp_QL65_.jpg",
        //                 "product_num_offers": 1,
        //                 "product_minimum_offer_price": "₹129",
        //                 "is_best_seller": false,
        //                 "is_amazon_choice": false,
        //                 "is_prime": false,
        //                 "climate_pledge_friendly": false,
        //                 "sales_volume": "2K+ bought in past month",
        //                 "delivery": "FREE Delivery by Amazon",
        //                 "has_variations": false
        //             },
        //             {
        //                 "asin": "B0C3DH4XPJ",
        //                 "product_title": "SJeware Unisex Cotton Men And Women Solid Ankle Length Socks (Pack Of 5) Sjw-2013, Assorted",
        //                 "product_price": "₹119",
        //                 "unit_price": "₹11.90",
        //                 "unit_count": 10,
        //                 "product_original_price": "₹499",
        //                 "currency": "INR",
        //                 "product_star_rating": "4.1",
        //                 "product_num_ratings": 0,
        //                 "product_url": "https://www.amazon.in/dp/B0C3DH4XPJ",
        //                 "product_photo": "https://m.media-amazon.com/images/I/81XgZbmqFOL._AC_UL960_FMwebp_QL65_.jpg",
        //                 "product_num_offers": 1,
        //                 "product_minimum_offer_price": "₹119",
        //                 "is_best_seller": false,
        //                 "is_amazon_choice": false,
        //                 "is_prime": false,
        //                 "climate_pledge_friendly": false,
        //                 "sales_volume": "5K+ bought in past month",
        //                 "delivery": "FREE Delivery by Amazon",
        //                 "has_variations": false
        //             },


        $data = json_decode($response, true);
        $products = $data->products;
         
        foreach($products as $product) {

        }





    }
}
