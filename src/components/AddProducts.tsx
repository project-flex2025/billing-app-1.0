"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCategory {
  default:string;
  category: string;
  products: Product[];
}

interface SelectedProduct extends Product {
  quantity: number;
}

const AddProductsForm = ({customerDetails,Categories}: any) => {
  const router = useRouter(); // Ensure this is inside a client component.

  const [categories] = useState<ProductCategory[]>(Categories);

  // console.log(categories.length);
  console.log(Categories.filter((ele:any) => ele.default == "true")[0].category,"Categories");
  

  const [selectedCategory, setSelectedCategory] = useState<string>(Categories.filter((ele:any) => ele.default == "true")[0].category);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedProducts, setAddedProducts] = useState<SelectedProduct[]>([]);

  console.log(addedProducts,"selectedCategory");

  const updateQuantity = (id:any, newQuantity:any) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id == id
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const deleteProduct = (id:any) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) return;

    setAddedProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === selectedProduct.id);
      if (existingProduct) {
        return prev.map((p) =>
          p.id === selectedProduct.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { ...selectedProduct, quantity }];
    });

    setSelectedProduct(null);
    setQuantity(1);
  };

  const generateInvoiceNumber = () => {
    const prefix = "INV-"; // Optional prefix
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    return `${prefix}${randomNumber}`;
  };
  
const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);

  const handleGenerateBill = () => {
    const billProducts = addedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    }));

    const generatedBill = {
      invoiceNumber: `${generateInvoiceNumber()}`,
      invoiceDate: formattedDate,
      terms: "Due on Receipt",
      dueDate: formattedDate,
      taxRate: 5,
      companyName: "Zylker Inc",
      companyAddress: "148B, Northern Street South Avenue, New York, NY 10001 U.S.A",
      billTo: {
        name: customerDetails.name,
        address: customerDetails?.address || "",
      },
      shipTo: {
        name: customerDetails.name,
        address: customerDetails?.address || "",
      },
      products: billProducts,
    };

    // Save to local storage and navigate to bill generation
    localStorage.setItem("customerData", JSON.stringify(generatedBill));
    router.push("/billgenration");
  };

  const calculateSubTotal = (): number => {
    return addedProducts?.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0) || 0;
  };

  return (
    <div className="max-w-full mt-4 mx-auto p-6 bg-gray-50">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Products</h2>
      <div className="flex gap-6">
        {/* Select Category */}
        <div className="mb-4">
          {/* <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label> */}
          {/* <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.category} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select> */}
          <Autocomplete sx={{minWidth:"280px"}}
  freeSolo
  id="free-solo-2-demo"
  disableClearable
  options={categories.map((option) => option.category)}
  value={selectedCategory}
  onChange={(_, newValue) => {
    setSelectedCategory(newValue);
    setSelectedProduct(null);
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Category"
      InputProps={{
        ...params.InputProps,
        type: 'search',
      }}
    />
  )}
/>
        </div>

        {selectedCategory && (
          <div className="mb-4">
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Product
            </label>
            <select
              value={selectedProduct?.id || ""}
              onChange={(e) => {
                const productId = parseInt(e.target.value);
                const product = categories
                  .find((cat) => cat.category === selectedCategory)
                  ?.products.find((prod) => prod.id === productId);
                setSelectedProduct(product || null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              {categories.length > 1 && (
                <>
                  <option value="">-- Select Product --</option>
                  {categories
                    .find((cat) => cat.category === selectedCategory)
                    ?.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ₹{product.price}
                      </option>
                    ))}
                </>
              )}
              {/* {categories.length == 1 && } */}
  
            {/* </select> */}
            <Autocomplete sx={{minWidth:"280px"}}
  id="product-autocomplete"
  options={
    categories
      .find((cat) => cat.category === selectedCategory)
      ?.products || []
  }
  getOptionLabel={(option) =>
    `${option.name} - ₹${option.price}` || ""
  }
  value={selectedProduct || null}
  onChange={(_, newValue) => {
    setSelectedProduct(newValue || null);
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Product"
      placeholder="Choose a product"
      variant="outlined"
      fullWidth
    />
  )}
  isOptionEqualToValue={(option, value) =>
    option.id === value?.id
  }
/>

          </div>
        )}

        {/* Quantity Input */}
        {selectedProduct && (
          <div className="mb-4">
            <TextField
  id="quantity"
  label="Quantity"
  type="number"
  value={quantity}
  onChange={(e) =>
    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
  }
  variant="outlined"
  fullWidth
  InputProps={{
    inputProps: { min: 1 }, // Prevents typing values less than 1
  }}
  className="text-sm"
/>
          </div>
        )}
      </div>

      {/* Add Product Button */}
      {selectedProduct && (
        <button
          onClick={handleAddProduct}
          className="w-half bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      )}

      {/* Display Added Products */}
      {addedProducts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Added Products
          </h3>
          <table className="min-w-full bg-white border-black">
            <thead>
              <tr className="bg-blue-100 text-left ">
                <th className="border px-4 py-2 border-gray-300">#</th>
                <th className="border px-4 py-2 border-gray-300 w-3/5">Item & Description</th>
                <th className="border px-4 py-2 border-gray-300 w-1/12">Qty</th>
                <th className="border px-4 py-2 border-gray-300">Rate</th>
                <th className="border px-4 py-2 border-gray-300">Amount</th>
                <th className="border px-4 py-2 border-gray-300">Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((product, index) => (
                <tr key={product.id} className="">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <TextField
                id={`quantity-${product.id}`}
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  updateQuantity(
                    product.id,
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
                variant="outlined"
                fullWidth
                InputProps={{
                  inputProps: { min: 1 },
                }}
                className="text-sm"
              />
                  {/* <td className="border px-4 py-2">{product.quantity}</td> */}
                  <td className="border px-4 py-2">₹{product.price}</td>
                  <td className="border px-4 py-2">
                    ₹{product.price * product.quantity}
                  </td>
                  <td  className="border px-4 py-2">
                    <div  className="flex justify-center">
                    <DeleteIcon onClick={() => deleteProduct(product?.id)
                    } sx={{ color: '#EE4B2B' }}></DeleteIcon>
                      </div>
                  
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
          <table className="w-half text-xl border border-gray-300 mt-2 w-3/12">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-right">Total</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${calculateSubTotal().toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-right">Tax {5}%</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${((5 * calculateSubTotal()) / 100).toFixed(2)}</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">Net Payable</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">${(calculateSubTotal() + 5 * calculateSubTotal() / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      )}

      {/* Generate Bill Button */}
      {addedProducts.length > 0 && (
        <div className="flex justify-center">

        <button
          onClick={handleGenerateBill}
          className="mt-4 text-xl w-half bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Generate Bill
        </button>
        </div>
      )}
    </div>
  );
};

export default AddProductsForm;
