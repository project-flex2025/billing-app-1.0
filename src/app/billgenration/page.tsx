"use client";

import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// const CompanyDetails = {
//   name: "Zylker Electronics Hub",
//   address: "148B, Northern Street Greater South Avenue, New York, NY 10001 U.S.A",
//   GSTIN: "GSTIN: 1234567890",
//   taxrate: 5.0,
// };

// const CustomerDetails = {
//   name: "Ms. Mary D. Dunton",
//   address: "1324 Hinkle Lake Road, Needham, 02192 Maine",
//   shipTo: {
//     address: "1324 Hinkle Lake Road, Needham, 02192 Maine",
//   },
// };

// const Products = [
//   {
//     id: 1,
//     name: "Camera",
//     description: "DSLR camera with advanced shooting capabilities",
//     quantity: 1,
//     price: 899.0,
//   },
//   {
//     id: 2,
//     name: "Fitness Tracker",
//     description: "Activity tracker with heart rate monitoring",
//     quantity: 1,
//     price: 129.0,
//   },
//   {
//     id: 3,
//     name: "Laptop",
//     description: "Lightweight laptop with a powerful processor",
//     quantity: 1,
//     price: 1199.0,
//   },
// ];

const InvoiceJson = {
  invoiceNumber: "INV-000003",
  invoiceDate: "18 May 2023",
  terms: "Due on Receipt",
  dueDate: "18 May 2023",
  taxRate: "",
  companyName: "",
  companyAddress: "",
  billTo: {
    name: "",
    address: "",
  },
  shipTo: {
    address: "",
  },
  products: [],
};

// Invoice Component
interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const Invoice = () => {
    const [billJson, setBillJson] = useState<typeof InvoiceJson | null>(null);
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const data = localStorage.getItem("customerData");
        // if (data) setCustomerData(JSON.parse(data));
      if (data)  setBillJson(JSON.parse(data))
        console.log(data,"dddddddddd");
        
      }, []);

      useEffect(() => {
        setProducts(billJson?.products || [])
      })

  const calculateSubTotal = (): number => {
    return billJson?.products?.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0) || 0;
  };

  const totalAmount = calculateSubTotal() + 5 * calculateSubTotal() / 100;

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  // Handle Download PDF
  const handleDownload = async () => {
    if (typeof window === "undefined") return;
  
    const invoiceElement = document.querySelector(".p-10") as HTMLElement;
    if (!invoiceElement) {
      console.error("Invoice element not found.");
      return;
    }
  
    try {
      const canvas = await html2canvas(invoiceElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };  

  // Placeholder functions for email and SMS
  const handleSendEmail = () => {
    alert("Email functionality is not implemented yet.");
  };

  const handleSendSMS = () => {
    alert("SMS functionality is not implemented yet.");
  };

  if(!billJson){
    return "No Data"
  }

  console.log(billJson?.products,"billjson");
  

  return (
    <div className="p-10 max-w-3xl mx-auto border border-gray-300 rounded shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{billJson && billJson?.companyName}</h1>
        <p className="text-sm">{billJson.companyAddress}</p>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 text-sm mb-6">
        <div>
          <p><strong>Invoice#</strong>: {billJson.invoiceNumber}</p>
          <p><strong>Invoice Date</strong>: {billJson.invoiceDate}</p>
          <p><strong>Terms</strong>: {billJson.terms}</p>
          <p><strong>Due Date</strong>: {billJson.dueDate}</p>
        </div>
      </div>

      {/* Billing and Shipping */}
      <div className="mb-6">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="font-bold">Bill To</h2>
            <p>{billJson.billTo.name}</p>
            <p>{billJson.billTo.address}</p>
          </div>
          <div>
            <h2 className="font-bold">Ship To</h2>
            <p>{billJson.shipTo.address}</p>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full text-sm border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Item & Description</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
  {products.map((product, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{product?.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product?.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product?.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">${product?.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">${product?.price * product?.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>Thanks for shopping with us.</p>
        </div>
        <div>
          <table className="w-full text-sm border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-right">Total</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${calculateSubTotal().toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-right">Tax {billJson.taxRate}%</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${((5 * calculateSubTotal()) / 100).toFixed(2)}</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">Net Payable</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="text-sm">
        <h2 className="font-bold">Terms & Conditions</h2>
        <p>Full payment is due upon receipt of this invoice. Late payments may incur additional charges or interest as per the applicable laws.</p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs mt-6">
        <p>Powered by PROJECT FLEX</p>
      </div>

      {/* Actions */}
      <div className="text-center mt-4 space-x-4">
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Print Invoice</button>
        <button onClick={handleDownload} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Download Invoice</button>
        <button onClick={handleSendEmail} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">Send Email</button>
        <button onClick={handleSendSMS} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Send SMS</button>
      </div>
    </div>
  );
};

export default Invoice;
