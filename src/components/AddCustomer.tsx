import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCustomerDetails({open,setOpen,handleAddNewCustomer}:any) {
  // const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddNewCustomer(formData)
    console.log("Customer Details:", formData);
    setSubmitted(true);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{minWidth:"500px"}}>
        <div className="p-8 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => {
              if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
            }}
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Customer
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Added</h3>
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Mobile:</strong> {formData.mobile}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {formData.address}
          </p>
        </div>
      )}
    </div>
    </Box>
        
      </Dialog>
    </React.Fragment>
  );
}
