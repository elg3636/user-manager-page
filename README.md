# User Manager

A React based user management system that allows administrators to view, manage, and update user data. The project utilizes Material UI's DataGrid component for displaying user information and includes functionality for filtering users by name, email, status, client, and role.

## Features

- **Search Bar**: Allows filtering users by name, email, status, clients, or role.
- **User Data**: Displays user details such as name, email, account status (active/deactivated), clients, and role.
- **Action Menu**: Provides options for editing user profiles, managing permissions, and deactivating accounts.



## Libraries Used

- **@mui/material**
- **@mui/icons-material**
- **@mui/x-data-grid**

## Installation

To get started with the project locally:

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/user-manager-page.git
    ```

2. Navigate to the project directory:
    ```bash
    cd user-manager
    ```

3. Install the project dependencies:
    ```bash
    npm install
    ```

## Usage

To run the project locally:

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

You should now see the user management interface where you can test the search functionality and view user data.

## Project Structure

- **`src/`**: Contains the main React components and styles.
    - **`UserManager.js`**: The main component responsible for rendering the user management table.
    - **`styles.css`**: Contains custom styles (e.g., for deactivated rows).
- **`public/`**: Contains the public assets and index.html file.
- **`package.json`**: The project configuration and dependencies.

---
Thank you for checking out this project! Feel free to reach out if you have any questions or suggestions.
