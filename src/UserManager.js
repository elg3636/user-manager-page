import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Importing Material UI's DataGrid component for displaying the table
import { Button, TextField, Box, Menu, MenuItem, IconButton, Chip } from "@mui/material"; // Importing various Material UI components
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importing the "more" vertical icon for the actions menu
import './styles.css'; // Import the custom CSS for row styling


const UserManager = () => {
    // State variables to manage search input, selected users, and the action menu
    const [search, setSearch] = useState(""); //Store the search input value
    const [selectedUsers, setSelectedUsers] = useState([]); // Store the selected users for any bulk actions
    const [anchorEl, setAnchorEl] = useState(null); // Store anchor element for the action menu
    const [menuUserId, setMenuUserId] = useState(null); //Store the selected user ID for the actions menu
    
    // Sample users data with various attributes (can be replaced with dynamic data)
    const users = [
        { id: 1, user: "John Doe", email: "john@example.com", status: "Active", clients: "Client A", role: "Admin" },
        { id: 2, user: "Jane Smith", email: "jane@example.com", status: "Deactivated", clients: "Client B", role: "Owner" },
        { id: 3, user: "David Wilson", email: "david@example.com", status: "Active", clients: "Client A, Client C, Client D, Client F, Client R", role: "Employee" },
        { id: 4, user: "Mary Johnson", email: "mary.johnson@example.com", status: "Deactivated", clients: "Client F, Client G", role: "Employee" },
        { id: 5, user: "Chris Lee", email: "chris.lee@example.com", status: "Active", clients: "Client H, Client I", role: "Admin" },
        { id: 6, user: "Amanda Brown", email: "amanda.brown@example.com", status: "Active", clients: "Client J, Client K, Client L", role: "Employee" },
        { id: 7, user: "Emily Davis", email: "emily.davis@example.com", status: "Deactivated", clients: "Client M, Client N", role: "Owner" },
        { id: 8, user: "Michael Garcia", email: "michael.garcia@example.com", status: "Active", clients: "Client O", role: "Employee" },
        { id: 9, user: "Sarah Martinez", email: "sarah.martinez@example.com", status: "Active", clients: "Client P, Client Q", role: "Admin" },
        { id: 10, user: "James Wilson", email: "james.wilson@example.com", status: "Deactivated", clients: "Client R, Client S, Client T", role: "Owner" },
        { id: 11, user: "Olivia Taylor", email: "olivia.taylor@example.com", status: "Active", clients: "Client U, Client V", role: "Employee" },
        { id: 12, user: "William Harris", email: "william.harris@example.com", status: "Deactivated", clients: "Client W, Client A, Client G, Client Z", role: "Admin" },
        { id: 13, user: "Sophia Clark", email: "sophia.clark@example.com", status: "Active", clients: "Client X, Client Y, Client Z", role: "Employee" },
        { id: 14, user: "Jackson Lewis", email: "jackson.lewis@example.com", status: "Deactivated", clients: "Client AA", role: "Owner" },
        { id: 15, user: "Ava Walker", email: "ava.walker@example.com", status: "Active", clients: "Client AB, Client AC", role: "Admin" },
        { id: 16, user: "Liam Young", email: "liam.young@example.com", status: "Deactivated", clients: "Client AD", role: "Employee" },
        { id: 17, user: "Mason King", email: "mason.king@example.com", status: "Active", clients: "Client AE, Client AF", role: "Admin" },
        { id: 18, user: "Isabella Scott", email: "isabella.scott@example.com", status: "Active", clients: "Client AG", role: "Employee" },
        { id: 19, user: "Ethan Green", email: "ethan.green@example.com", status: "Deactivated", clients: "Client AH", role: "Owner" },
        { id: 20, user: "Amelia Harris", email: "amelia.harris@example.com", status: "Active", clients: "Client AI, Client AJ", role: "Admin" },
        { id: 21, user: "Lucas Turner", email: "lucas.turner@example.com", status: "Active", clients: "Client AK", role: "Admin" },
        { id: 22, user: "Charlotte Adams", email: "charlotte.adams@example.com", status: "Deactivated", clients: "Client AL, Client AM", role: "Owner" },
        { id: 23, user: "Benjamin Baker", email: "benjamin.baker@example.com", status: "Active", clients: "Client AN, Client AO", role: "Employee" },
        { id: 24, user: "Grace Perez", email: "grace.perez@example.com", status: "Active", clients: "Client AP, Client AQ", role: "Admin" },
        { id: 25, user: "Elijah Nelson", email: "elijah.nelson@example.com", status: "Deactivated", clients: "Client AR, Client AS", role: "Employee" },
        { id: 26, user: "Harper Carter", email: "harper.carter@example.com", status: "Active", clients: "Client AT", role: "Admin" },
        { id: 27, user: "Henry Mitchell", email: "henry.mitchell@example.com", status: "Active", clients: "Client AU, Client AV", role: "Employee" },
        { id: 28, user: "Lily Roberts", email: "lily.roberts@example.com", status: "Deactivated", clients: "Client AW", role: "Owner" },
        { id: 29, user: "Oliver White", email: "oliver.white@example.com", status: "Active", clients: "Client AX, Client AY", role: "Employee" },
        { id: 30, user: "Mia Harris", email: "mia.harris@example.com", status: "Deactivated", clients: "Client AZ", role: "Admin" },
        // Add more user data as needed
      ];

      // Columns configuration for DataGrid, including custom rendering for "status" and "action"
      const columns = [
        { field: "user", headerName: "User", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        { 
            field: "status", 
            headerName: "Account Status", 
            width: 200,
            renderCell: (params) => { //Custom render for the status column
                // Check if the user is deactivated and change text color to dark grey
                const textColor = params.row.status === "Deactivated" ? "#757575" : "#000000"; // Dark grey for deactivated users, black for active
                return (
                    <Chip
                        label={params.value}
                        style={{
                            backgroundColor: params.value === "Active" ? "#A5D6A7" : "#E0E0E0", // Light green for "Active", grey for others
                            color: textColor,
                            padding: "5px 10px",
                        }}
                    />
                );
            }
        },
        { 
            field: "clients",
            headerName: "Clients",
            width: 400,
            renderCell: (params) => {  // Custom render for the clients column
                const clients = params.value.split(", ");  // Split client names by comma and space
                const displayedClients = clients.slice(0, 3);  // Get the first 3 clients
                const remainingClients = clients.length - 3;  // Get the number of remaining clients

                // Set text color to dark grey if the user is deactivated
                const textColor = params.row.status === "Deactivated" ? "#757575" : "#000000"; // Dark grey for deactivated users
                return (
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "flex-start",
                        height: "100%",
                        gap: "5px",
                         }}
                    >
                        {displayedClients.map((client, index) => (
                            <Chip
                                key={index}
                                label={client}  // Display each client name inside a Chip
                                style={{
                                    backgroundColor: "#E0E0E0",  // Grey background for each client
                                    color: textColor, 
                                    
                                }}
                            />
                        ))}
                        {remainingClients > 0 && (
                            <span style={{ padding: "5px 10px", color: "#000000" }}>
                            and {remainingClients} more
                        </span>
                        )}
                    </div>
                );
            }
        },
        { field: "role", headerName: "Role", width: 150 },
        {
          field: "action", //Action column with menu options
          headerName: "Action",
          width: 75,
          renderCell: (params) => ( //Custom render for the action column
            <IconButton
            onClick={(event) => handleMenuOpen(event, params.id)}
            >
            <MoreVertIcon/>
            </IconButton>
          ),
        },
      ];

      // Function to handle the opening of the menu for the specific user
      const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setMenuUserId(userId);
      };
      
      // Function to handle the closing of the menu 
      const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuUserId(null);
      };
    
      // Function to handle actions like Edit, Delete and View
      const handleActionClick = (action) => {
        console.log(`Action ${action} clicked for user ${menuUserId}`);
        handleMenuClose();
      };

      //Filter users based on the search query (case insensitive)
      const filteredUsers = users.filter((user) => {
        const lowerSearch = search.toLowerCase();
        return (
            user.user.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch) ||
            user.status.toLowerCase().includes(lowerSearch) ||
            user.clients.toLowerCase().includes(lowerSearch) ||
            user.role.toLowerCase().includes(lowerSearch)
        );
    });
    
    return (
        <Box sx={{ maxWidth: "100%", padding: 3}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ 
                        width: "300px",
                        '& .MuiInputBase-input::placeholder': {
                        color: '#757575', // Dark grey placeholder text
                        }    
                    }}
                    placeholder="Name, email, etc..." // Set the placeholder text
                />
            <Box>
              <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
                Bulk
              </Button>
              <Button variant="contained" color="primary">
                Invite User
              </Button>
            </Box>
          </Box>

          {/* DataGrid to display the users with filtered data */}
          <box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onSelectionModelChange={(newSelection) => setSelectedUsers(newSelection)}
              getRowClassName={(params) => 
                params.row.status === "Deactivated" ? "deactivated-row" : "" // Apply a class to rows with Deactivated status
            }
            />
          </box>
          {/* Action menu */}
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleActionClick('Edit profile')}>Edit Profile</MenuItem>
        <MenuItem onClick={() => handleActionClick('Permissions')}>Permissions</MenuItem>
        <MenuItem onClick={() => handleActionClick('Deactivate')}>Deactivate</MenuItem>
      </Menu>
        </Box>
      );
};

export default UserManager;