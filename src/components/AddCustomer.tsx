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

export default function AddCustomerDetails({open,setOpen,handleAddNewCustomer,mobileNumber}:any) {
  // const [open, setOpen] = React.useState(false);

  const [isCustomer, setisCustomer] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    mobile: mobileNumber,
    email: "",
    address: "",
  });

  React.useEffect(()=> {
    setFormData({
      name: "",
      mobile: mobileNumber,
      email: "",
      address: "",
    })
  },[mobileNumber])


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
    setisCustomer(false);
    handleAddNewCustomer(formData)
    setSubmitted(true);
    setOpen(false);
    setFormData({
      name: "",
      mobile:  "",
      email: "",
      address: "",
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setisCustomer(false);
    setFormData( {name: "",
      mobile: "",
      email: "",
      address: ""})


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
          { !isCustomer &&
            <div className='flex gap-4 justify-items-center items-center'>

      <h2 className="text-xl font-bold text-gray-800 mb-4 text-red-600">Customer Not Found</h2>
      <button
          onClick={() => setisCustomer(true)}
          className="w-half bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Customer
        </button>
        </div>
          }

          {
            isCustomer && 
             <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name*
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
                Mobile Number*
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
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Customer
            </button>
          </div>
          }


    </div>
    </Box>
        
      </Dialog>
    </React.Fragment>
  );
}
