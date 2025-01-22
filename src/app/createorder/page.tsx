"use client";
import AddCustomerDetails from "@/components/AddCustomer";
import AddProductsForm from "@/components/AddProducts";
import { useState } from "react";

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
    const [open, setOpen] = useState(false);

    console.log(CustomerJson,"json");
    
  

  const [customerDetails, setCustomerDetails] = useState<{ id: number; name: string; mobile: string; email: string } | null>(null);
  const [isCustomer, setisCustomer] = useState(true);

  const handleAddNewCustomer = (newCustomer:any) => {
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
        }
  };

  return (
    <div className="p-10 mt-4 w-[80%] mx-auto border border-gray-300 rounded shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Create Order</h1>
      <p className="text-lg mb-6">Enter customer mobile number to create order</p>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-full bg-white shadow-md rounded-lg p-6"
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

      {customerDetails && isCustomer && (
        <div className="mt-6 p-6 bg-white rounded-md shadow-md text-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Details</h2>
          <p className="mb-2">
            <strong>Name:</strong> {customerDetails.name}
          </p>
          <p className="mb-2">
            <strong>Mobile:</strong> {customerDetails.mobile}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {customerDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {customerDetails.id}
          </p>
        </div>
      )}
      {
            !isCustomer && (
                <div className="mt-6 p-6 bg-white rounded-md shadow-md text-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer not found</h2>
                    <div className="flex gap-4 w-full bg-white shadow-md rounded-lg p-6">
                    <button
                        onClick={() => setOpen(true)
                        }
                        className="w-half bg-indigo-600 text-white py-3 px-6 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add New Customer
                    </button>
                    <button
                        type="submit"
                        className="w-half bg-indigo-600 text-white py-3 px-6 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Skip
                    </button>
                    </div>
                </div>
            )
      }
      {
        isCustomer && <AddProductsForm customerDetails={customerDetails}/>
      }
      <AddCustomerDetails open={open} setOpen={setOpen} handleAddNewCustomer={handleAddNewCustomer}/>
    </div>
  );
};

export default MobileNumberInput;
