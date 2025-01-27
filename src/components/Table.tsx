"use client";
import { Card } from "@mui/material";
interface Product {
  id: string;
  category: string;
  productName: string;
  amount: number;
}

const data: Product[] = [
    { id: "1", category: "Skin Care", productName: "Peel Treatment", amount: 2000 },
    { id: "2", category: "Skin Care", productName: "Laser Treatment", amount: 3000 },
    { id: "3", category: "Hair", productName: "Hair Cut", amount: 140 },
    { id: "4", category: "Hair", productName: "Beard", amount: 100 },
    { id: "5", category: "Skin Care", productName: "Facial", amount: 300 },
  ];

export default function Table() {
  return (
    <Card sx={{p:4}}>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Id</th>
            <th className="border border-gray-300 p-2">Model</th>
            <th className="border border-gray-300 p-2">Month</th>
            <th className="border border-gray-300 p-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">{product.productName}</td>
              <td className="border border-gray-300 p-2 text-green-500">{product.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
