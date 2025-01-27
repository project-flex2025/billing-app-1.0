"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

const ListofComponents = ["Modules","Components"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SubcompArray = {Modules:["Create order"],Components:["table"]}

const SubModules = ["Create order"];
const SubComponents = ["table"];

const Setup2Page = () => {
  const router = useRouter();
  const [components, setComponents] = React.useState('');
  const [personName, setPersonName] = React.useState<string[]>([]);

  

  const [config, setConfig] = useState({
    header: true,
    footer: true,
    // enableCards: false,
    // cards: [""],
    navBarType: "side", // "side" or "horizontal"
    menuItems: [{ name: "", enableSubMenu: false, subMenuItems: [{name:"",components:"",subComponents:[]}],components:"",subComponents:[] }],
  });

  const handleSubMenuToggle = (menuIndex: number) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].components =  "";
    updatedMenuItems[menuIndex].subComponents =  [];
    updatedMenuItems[menuIndex].enableSubMenu =
      !updatedMenuItems[menuIndex].enableSubMenu;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
    setComponents("");
    setPersonName([]);    
  };

  const handleToggle = (key: keyof typeof config) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddMenuItem = () => {
    const newMenuItem = {
      name: "", // Default empty name for the new menu item
      enableSubMenu: false, // By default, sub-menu is not enabled
      subMenuItems: [{ name: "", components: "", subComponents: [] }], // Initial sub-menu item with default values
      components: "", // No components selected initially
      subComponents: [] // No sub-components selected initially
    };
  
    // Add the new menu item to the current list of menu items
    setConfig((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, newMenuItem],
    }));
  };

  const handleMenuItemChange = (index: number, value: string) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[index].name = value;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };



  const handleAddSubMenuItem = (menuIndex: number) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems.push({name:"",components:"",subComponents:[]});
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
    setComponents("");
    setPersonName([]);
  };

  const handleSubMenuItemChange = (
    menuIndex: number,
    subMenuIndex: number,
    value: string
  ) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems[subMenuIndex].name = value;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleSubMenuChange = (menuIndex: number,subMenuIndex:number, event: SelectChangeEvent) => {
    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems[subMenuIndex].components = event.target.value as string;
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
    setComponents(event.target.value as string);
  }

  const handleSave = () => {
    localStorage.setItem("dashboardConfig", JSON.stringify(config));
    router.push("/dashboard");
  };

  const handleChange = (menuIndex: number, event: SelectChangeEvent) => {
      const updatedMenuItems = [...config.menuItems];
      console.log(event.target.value, "event.target.value");  
      
      updatedMenuItems[menuIndex].components = event.target.value as string;
      setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  
      setComponents(event.target.value as string);
      
    };

  const handleChangeSubComponent = (event: SelectChangeEvent<typeof personName>,menuIndex:number) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subComponents = value as [];
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
    
  };

  const handleChangeSubMenuComponent = (event: SelectChangeEvent<typeof personName>,menuIndex:number,subMenuIndex:number) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    const updatedMenuItems = [...config.menuItems];
    updatedMenuItems[menuIndex].subMenuItems[subMenuIndex].subComponents = value as [];
    setConfig((prev) => ({ ...prev, menuItems: updatedMenuItems }));
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-800 mb-2">
            Setup Your  Dashboard
          </h1>
        </div>

        {/* Header and Footer Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {["header", "footer"].map((key) => (
            <div
              key={key}
              className={`p-6 rounded-lg shadow-md border transition ${
                config[key as keyof typeof config]
                  ? "bg-purple-50 border-purple-400 hover:shadow-lg"
                  : "bg-gray-100 border-gray-300 hover:shadow-md"
              } cursor-pointer`}
              onClick={() => handleToggle(key as keyof typeof config)}
            >
              <h2 className="text-xl font-bold text-gray-800 capitalize text-center">
                {key}
              </h2>
              <p
                className={`mt-2 text-center ${
                  config[key as keyof typeof config]
                    ? "text-purple-600"
                    : "text-gray-500"
                }`}
              >
                {config[key as keyof typeof config] ? "Enabled" : "Disabled"}
              </p>
            </div>
          ))}
        </div>
        {/* Nav Bar Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Nav Bar</h2>
          <div className="flex space-x-8">
            {["side", "horizontal"].map((type) => (
              <label key={type} className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="navBarType"
                  value={type}
                  checked={config.navBarType === type}
                  onChange={() => setConfig((prev) => ({ ...prev, navBarType: type }))}
                  className="w-5 h-5 text-purple-600 focus:ring focus:ring-purple-300"
                />
                <span className="text-gray-800 capitalize">{type} Nav Bar</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-purple-700 mb-2">
              Configure Menu Items
            </h3>
            {config.menuItems.map((menuItem, menuIndex) => (
              <div key={menuIndex} className="mb-6 space-x-4">
                <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={menuItem.name}
                  onChange={(e) =>
                    handleMenuItemChange(menuIndex, e.target.value)
                  }
                  placeholder={`Menu Item ${menuIndex + 1}`}
                  className="w-half px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-900 placeholder-gray-500"
                />
            { !menuItem.enableSubMenu &&
       <Box sx={{ minWidth: 180 }}>
       <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Select Features</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={components}
           label="Add Components"
           onChange={(e) =>  handleChange(menuIndex,e)}
         >
           {ListofComponents.map((item, index) => (
             <MenuItem key={index} value={item}>{item}</MenuItem>
           ))}
         </Select>
       </FormControl>
     </Box>
            }
          
    {  !menuItem.enableSubMenu && components &&  <Box>     
       <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select {menuItem.components}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={(e) => handleChangeSubComponent(e,menuIndex)}
          input={<OutlinedInput label="Add Sub Components" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          { (menuItem.components == "Modules" ? SubModules: SubComponents).map((name:string) => (
            <MenuItem sx={{maxHeight:"60px"}} key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>}
                  </div>
                <label className="flex items-center space-x-4 mt-2">
                  <input
                    type="checkbox"
                    checked={menuItem.enableSubMenu}
                    onChange={() => handleSubMenuToggle(menuIndex)}
                    className="w-5 h-5 text-purple-600 focus:ring focus:ring-purple-300"
                  />
                  <span className="text-gray-800">Enable Sub Menu</span>
                </label>
                {menuItem.enableSubMenu && (
                  <div className="mt-4 space-y-4">

                    
                    {menuItem.subMenuItems.map((subMenuItem, subMenuIndex) => (
                         <div className="flex items-center space-x-4">

                      <input
                        key={subMenuIndex}
                        type="text"
                        value={subMenuItem?.name}
                        onChange={(e) =>
                          handleSubMenuItemChange(
                            menuIndex,
                            subMenuIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Sub Menu Item ${subMenuIndex + 1}`}
                        className="w-half px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-900 placeholder-gray-500"

                      />
     <Box sx={{ minWidth: 180 }}>
       <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Select Features</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={config.menuItems[menuIndex].subMenuItems[subMenuIndex].components || ""}
           label="Add Components"
           onChange={(e) =>  handleSubMenuChange(menuIndex,subMenuIndex,e)}
         >
           {ListofComponents.map((item, index) => (
             <MenuItem key={index} value={item}>{item}</MenuItem>
           ))}
         </Select>
       </FormControl>
     </Box>
     {  config.menuItems[menuIndex].subMenuItems[subMenuIndex].components &&  <Box>     
       <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Add {config.menuItems[menuIndex].subMenuItems[subMenuIndex].components}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={config.menuItems[menuIndex].subMenuItems[subMenuIndex].subComponents || []}
          onChange={(e) => handleChangeSubMenuComponent(e,menuIndex,subMenuIndex)}
          input={<OutlinedInput label="Add Sub Components" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {(config.menuItems[menuIndex].subMenuItems[subMenuIndex].components == "Modules" ? SubModules: SubComponents).map((name) => (
            <MenuItem sx={{maxHeight:"60px"}} key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>}
       </div>
                    ))}

                    <button
                      onClick={() => handleAddSubMenuItem(menuIndex)}
                      className="mt-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
                    >
                      Add More Sub Menu Items
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleAddMenuItem}
              className="mt-4 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
            >
              Add More Menu Items
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Save & Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setup2Page;




