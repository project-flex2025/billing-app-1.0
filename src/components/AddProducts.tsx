// "use client";
// import { useRouter } from "next/router";
// import { useState } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// interface ProductCategory {
//   category: string;
//   products: Product[];
// }

// interface SelectedProduct extends Product {
//   quantity: number;
// }

// const AddProductsForm = (customerDetails:any) => {
//   const [categories] = useState<ProductCategory[]>([
//     {
//       category: "Electronics",
//       products: [
//         { id: 1, name: "Mobile", price: 20000 },
//         { id: 2, name: "Laptop", price: 60000 },
//       ],
//     },
//     {
//       category: "Groceries",
//       products: [
//         { id: 3, name: "Rice", price: 40 },
//         { id: 4, name: "Sugar", price: 50 },
//       ],
//     },
//   ]);
//   const router = useRouter()

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [addedProducts, setAddedProducts] = useState<SelectedProduct[]>([]);

//   const handleAddProduct = () => {
//     if (!selectedProduct || quantity <= 0) return;

//     setAddedProducts((prev) => {
//       const existingProduct = prev.find((p) => p.id === selectedProduct.id);
//       if (existingProduct) {
//         return prev.map((p) =>
//           p.id === selectedProduct.id
//             ? { ...p, quantity: p.quantity + quantity }
//             : p
//         );
//       }
//       return [...prev, { ...selectedProduct, quantity }];
//     });

//     setSelectedProduct(null);
//     setQuantity(1);
//   };

// //   const handleGenerateBill = () => {
// //     const total = addedProducts.reduce(
// //       (sum, product) => sum + product.price * product.quantity,
// //       0
// //     );
// //     alert(`Total Bill: ₹${total}`);
// //   };

//   const handleGenerateBill = () => {
//     const billProducts = addedProducts.map((product) => ({
//       id: product.id,
//       name: product.name,
//       quantity: product.quantity,
//       price: product.price,
//     }));
//     console.log(customerDetails,"cdetails");
    
  
//     console.log("Generated Bill Products:", JSON.stringify(billProducts, null, 2));
//     console.log({
//         invoiceNumber: "INV-000003",
//         invoiceDate: "18 May 2023",
//         terms: "Due on Receipt",
//         dueDate: "18 May 2023",
//         taxRate: 5,
//         companyName: "Zytech solar",
//         companyAddress: "jbs hyd",
//         billTo: {
//           name: customerDetails.customerDetails.name,
//           address: customerDetails.customerDetails.address,
//         },
//         shipTo: {
//           address: customerDetails.customerDetails.address,
//         },
//         products: billProducts,
//       },"created json");

//       localStorage.setItem("customerData", JSON.stringify({
//         invoiceNumber: "INV-000003",
//         invoiceDate: "18 May 2023",
//         terms: "Due on Receipt",
//         dueDate: "18 May 2023",
//         taxRate: 5,
//         companyName: "Zytech solar",
//         companyAddress: "jbs hyd",
//         billTo: {
//           name: customerDetails.customerDetails.name,
//           address: customerDetails.customerDetails.address,
//         },
//         shipTo: {
//           address: customerDetails.customerDetails.address,
//         },
//         products: billProducts,
//       }));

//     //   router.push('/billgenration')
//       router.push("/billgenration");

      
    
//     // alert("Check the console for the generated bill products JSON!");
//   };
  

//   return (
//     <div className="max-full mt-4 mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Add Products</h2>
//       <div className="flex gap-6">
//            {/* Select Category */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select Category
//         </label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => {
//             setSelectedCategory(e.target.value);
//             setSelectedProduct(null);
//           }}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((cat) => (
//             <option key={cat.category} value={cat.category}>
//               {cat.category}
//             </option>
//           ))}
//         </select>
//       </div>
//             {/* Select Product */}
//             {selectedCategory && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Product
//           </label>
//           <select
//             value={selectedProduct?.id || ""}
//             onChange={(e) => {
//               const productId = parseInt(e.target.value);
//               const product = categories
//                 .find((cat) => cat.category === selectedCategory)
//                 ?.products.find((prod) => prod.id === productId);
//               setSelectedProduct(product || null);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//           >
//             <option value="">-- Select Product --</option>
//             {categories
//               .find((cat) => cat.category === selectedCategory)
//               ?.products.map((product) => (
//                 <option key={product.id} value={product.id}>
//                   {product.name} - ₹{product.price}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}
      
//       {/* Quantity Input */}
//       {selectedProduct && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Quantity
//           </label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//           />
//         </div>
//       )}

//       </div>


//       {/* Add Product Button */}
//       {selectedProduct && (
//         <button
//           onClick={handleAddProduct}
//           className="w-half bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           Add Product
//         </button>
//       )}

//       {/* Display Added Products */}
//       {addedProducts.length > 0 && (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold text-gray-800 mb-4">
//       Added Products
//     </h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr className="bg-blue-100">
//             <th className="border px-4 py-2 text-left text-sm font-medium text-gray-600">
//               #
//             </th>
//             <th className="border px-4 py-2 text-left text-sm font-medium text-gray-600">
//               Item & Description
//             </th>
//             <th className="border px-4 py-2 text-center text-sm font-medium text-gray-600">
//               Qty
//             </th>
//             <th className="border px-4 py-2 text-center text-sm font-medium text-gray-600">
//               Rate
//             </th>
//             <th className="border px-4 py-2 text-center text-sm font-medium text-gray-600">
//               Amount
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {addedProducts.map((product, index) => (
//             <tr key={product.id} className="border-b">
//               <td className="border px-4 py-2 text-center text-sm text-gray-700">
//                 {index + 1}
//               </td>
//               <td className="border px-4 py-2 text-sm text-gray-700">
//                 <div className="font-medium">{product.name}</div>
//                 <div className="text-gray-500 text-xs">
//                   {/* Add description here if available */}
//                   Description of {product.name}
//                 </div>
//               </td>
//               <td className="border px-4 py-2 text-center text-sm text-gray-700">
//                 {product.quantity}
//               </td>
//               <td className="border px-4 py-2 text-center text-sm text-gray-700">
//                 ₹{product.price}
//               </td>
//               <td className="border px-4 py-2 text-center text-sm text-gray-700">
//                 ₹{product.price * product.quantity}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// )}


//       {/* Generate Bill Button */}
//       {addedProducts.length > 0 && (
//         <button
//           onClick={handleGenerateBill}
//           className="mt-4 w-half bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           Generate Bill
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddProductsForm;






"use client";

import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCategory {
  category: string;
  products: Product[];
}

interface SelectedProduct extends Product {
  quantity: number;
}

const AddProductsForm = (customerDetails: any) => {
  const router = useRouter(); // Ensure this is inside a client component.

  const [categories] = useState<ProductCategory[]>([
    {
      category: "Electronics",
      products: [
        { id: 1, name: "Mobile", price: 20000 },
        { id: 2, name: "Laptop", price: 60000 },
      ],
    },
    {
      category: "Groceries",
      products: [
        { id: 3, name: "Rice", price: 40 },
        { id: 4, name: "Sugar", price: 50 },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedProducts, setAddedProducts] = useState<SelectedProduct[]>([]);

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

  const handleGenerateBill = () => {
    const billProducts = addedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    }));

    const generatedBill = {
      invoiceNumber: "INV-000003",
      invoiceDate: "22 Jan 2025",
      terms: "Due on Receipt",
      dueDate: "22 Jan 2025",
      taxRate: 5,
      companyName: "Evega Technologies",
      companyAddress: "durgam cheruvu madhapur",
      billTo: {
        name: customerDetails.customerDetails.name,
        address: customerDetails.customerDetails.address,
      },
      shipTo: {
        address: customerDetails.customerDetails.address,
      },
      products: billProducts,
    };

    // Save to local storage and navigate to bill generation
    localStorage.setItem("customerData", JSON.stringify(generatedBill));
    router.push("/billgenration");
  };

  return (
    <div className="max-w-full mt-4 mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Products</h2>
      <div className="flex gap-6">
        {/* Select Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
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
          </select>
        </div>

        {/* Select Product */}
        {selectedCategory && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <option value="">-- Select Product --</option>
              {categories
                .find((cat) => cat.category === selectedCategory)
                ?.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₹{product.price}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Quantity Input */}
        {selectedProduct && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Item & Description</th>
                <th className="border px-4 py-2">Qty</th>
                <th className="border px-4 py-2">Rate</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">₹{product.price}</td>
                  <td className="border px-4 py-2">
                    ₹{product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Bill Button */}
      {addedProducts.length > 0 && (
        <button
          onClick={handleGenerateBill}
          className="mt-4 w-half bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Generate Bill
        </button>
      )}
    </div>
  );
};

export default AddProductsForm;
