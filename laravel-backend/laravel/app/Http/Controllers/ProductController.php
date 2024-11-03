<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

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
}
