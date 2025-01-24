"use client";
import AddCustomerDetails from "@/components/AddCustomer";
import AddProductsForm from "@/components/AddProducts";
import { useState } from "react";

 const Categories = [
    {
      default:"false",
      category: "Regular Services",
      products: [
        { id: 1, name: "Hair Cut", price: 140 },
        { id: 2, name: "Beard", price: 100 },
        { id: 3, name: "Facial", price: 300 },
        { id: 4, name: "Manicure", price: 500 },
      ],
    },
    {
      default:"true",
      category: "Treatments",
      products: [
        { id: 5, name: "Peel Treatment", price: 2000 },
        { id: 6, name: "Laser Treatment", price: 3000 }
      ],
    },
    // {
    //   category: "Electronics",
    //   products: [
    //     { id: 1, name: "Mobile", price: 20000 },
    //     { id: 2, name: "Laptop", price: 60000 },
    //   ],
    // },
    // {
    //   category: "Groceries",
    //   products: [
    //     { id: 3, name: "Rice", price: 40 },
    //     { id: 4, name: "Sugar", price: 50 },
    //   ],
    // },
  ]

const MobileNumberInput = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [CustomerJson, setCustomerJson] = useState([
    {
        "id": 1,
        "name": "John Doe",
        "mobile": "9876543210",
        "email": "John@gmail.com",
        "address": "Hyderabad"
    },
    {
        "id": 2,
        "name": "vignesh",
        "mobile": "7995454161",
        "email": "pingili.vignesh@gmail.com",
        "address": "Hyderabad"
    },
    {
        "id": 3,
        "name": "siva",
        "mobile": "7995454162",
        "email": "shiva@gmail.com",
        "address": "Hyderabad"
    }
])
    const [isModified, setisModified] = useState(false);
    const [open, setOpen] = useState(false); 


  const [customerDetails, setCustomerDetails] = useState<{ id: number; name: string; mobile: string; email: string;address:string } | null>(null);
  const [isCustomer, setisCustomer] = useState(true);

  const handleAddNewCustomer = (newCustomer:any) => {
    setisCustomer(true);
    setCustomerJson([...CustomerJson,newCustomer]);
    setCustomerDetails(newCustomer);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Allow only numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(input)) {
      setMobileNumber(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = CustomerJson.find((customer) => customer.mobile === mobileNumber);
    if (customer) {
      setisCustomer(true);
      setCustomerDetails(customer || null);
    } else {
        setisCustomer(false);
        setOpen(true);
        }
        setisModified(false);
  };

  console.log(customerDetails,"customer details...");
  

  const handleModify = (e:any) => {
    const { name, value } = e.target;
    setCustomerDetails(customerDetails ? {...customerDetails, [name]: value} : null);
    // localStorage.setItem("Customers", JSON.stringify(retrievedArray.map((customer:any) =>
    //   customer.id === customerDetails.id ? customerDetails : customer
    // )));

    // setCustomerJson((prev) =>
    //   prev.map((customer) =>
    //     customer.id === customerDetails.id ? customerDetails : customer
    //   )
    // );

    // setEditableDetails({ ...editableDetails, [name]: value });
  };

  const handleCustomerModify = () => {
      if (customerDetails) {
        setCustomerJson((prev) =>
          prev.map((customer) =>
            customer.id === customerDetails.id ? customerDetails : customer
          )
        );
      }


      setisModified(true);

  }

  const handleModifySubmit = (e:any) => {
    e.preventDefault();
    // setCustomerJson()

      if (customerDetails) {
        setCustomerJson((prev) =>
          prev.map((customer) =>
            customer.id === customerDetails.id ? customerDetails : customer
          )
        );
      }

    
  }

  return (
    <div>
    <div className="p-10 mt-4 w-[80%] mx-auto border border-gray-300 rounded shadow-lg">
      <div className="flex gap-12">
            <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Create Order</h1>
      <p className="text-xl">Enter customer mobile number to create order</p>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-full bg-white rounded-lg "
      >
        <input
          type="text"
          id="mobile-number"
          name="mobile-number"
          value={mobileNumber}
          onChange={handleChange}
          placeholder="Enter mobile number"
          className="w-half px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        />
        <button
          type="submit"
          className="w-half bg-indigo-600 text-white py-3 px-6 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      </div>

      {customerDetails && isCustomer && (
           <div className="bg-white rounded-md text-lg flex gap-4 justify-items-center items-center">
           <div>
             <table className="table-auto border-collapse border border-gray-300 w-full">
               <tbody>
                 <tr>
                   <td className="border border-gray-300 px-4  font-bold">Name</td>
                   <td className="border border-gray-300 appearance-none">
                     <input
                       type="text"
                       name="name"
                       value={customerDetails.name}
                       onChange={handleModify}
                       className="w-full p-2 border border-gray-300 rounded none"
                     />
                   </td>
                 </tr>
                 <tr>
                   <td className="border border-gray-300 px-4  font-bold">Mobile</td>
                   <td className="border border-gray-300 ">
                     <input
                       type="text"
                       name="mobile"
                       value={customerDetails.mobile}
                       onChange={handleModify}
                       className="w-full p-2 border border-gray-300 rounded"
                     />
                   </td>
                 </tr>
                 <tr>
                   <td className="border border-gray-300 px-4 font-bold">Email</td>
                   <td className="border border-gray-300">
                     <input
                       type="email"
                       name="email"
                       value={customerDetails.email}
                       onChange={handleModify}
                       className="w-full p-2 border border-gray-300 rounded"
                     />
                   </td>
                 </tr>
                 <tr>
                   <td className="border border-gray-300 px-4 font-bold">Address</td>
                   <td className="border border-gray-300">
                     <input
                       type="text"
                       name="address"
                       value={customerDetails.address}
                       onChange={handleModify}
                       className="w-full p-2 border border-gray-300 rounded"
                     />
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
           <div >
               <button
                 onClick={handleCustomerModify}
                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
               >
                 Modify
               </button>
               {isModified && <p className="text-green-600">Details Modified Succesfully.</p>}
             </div>
         </div>
      )}
            </div>
      <AddCustomerDetails open={open} setOpen={setOpen} handleAddNewCustomer={handleAddNewCustomer} mobileNumber={mobileNumber}/>
    </div>
{
  customerDetails?.mobile &&  <div className="p-10 mt-4 w-[80%] mx-auto border border-gray-300 rounded shadow-lg">
  <AddProductsForm customerDetails={customerDetails} Categories={Categories}/>
</div>
}
   
       </div>
  );
};

export default MobileNumberInput;
