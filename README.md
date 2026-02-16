# User Management CRUD Application

A robust, extensible, and user-friendly CRUD (Create, Read, Update, Delete) web application built with **React**, **Redux Toolkit**, and **Ant Design**.

## 🚀 Setup Instructions

### Prerequisites
*   Node.js (v14 or higher recommended)
*   npm (Node Package Manager)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

To run the application fully, you need to start both the mock backend API and the frontend development server.

1.  **Start the Mock API (Backend)**:
    Open a terminal and run:
    ```bash
    npm run api
    ```
    *   The API will run at `http://localhost:3000`.
    *   It uses `json-server` to mock a REST API based on `db.json`.

2.  **Start the Frontend**:
    Open a **second** terminal and run:
    ```bash
    npm run dev
    ```
    *   The application will be accessible at `http://localhost:5173`.

---

## 🛠️ How to Add New Fields

 The application is designed to be **configuration-driven** to maximize extensibility. You can add new fields to the User form and table without modifying the core component logic.

1.  Open the configuration file: `src/config/fields_config.ts`.
2.  Add a new field object to the `USER_FIELDS` array.

**Example: Adding a "Date of Birth" field**

```typescript
export const USER_FIELDS: FieldConfig[] = [
    // ... existing fields
    {
        name: 'dob',           // The key for the API/Database
        label: 'Date of Birth',// The label shown in the UI
        type: 'date',          // The input type ('text', 'email', 'tel', 'date')
        required: true,        // Validation rule
        placeholder: 'Select date'
    }
];
```

**That's it!** The application will automatically:
*   Display the new column in the **User List** table.
*   Add the input field to the **Add/Edit User** forms with appropriate validation.

---

## 💡 Assumptions & Design Decisions

### Design Decisions

1.  **Configuration-Driven UI**:
    *   **Decision**: To meet the requirement for "extensibility with minimal code changes," I implemented a configuration file (`fields_config.ts`) that drives both the form rendering and the table columns.
    *   **Benefit**: Non-developers or developers can quickly add fields without touching React components or JSX.

2.  **Redux Toolkit for State Management**:
    *   **Decision**: While React Context could handle simple state, **Redux Toolkit** was chosen to provide a scalable architecture.
    *   **Benefit**: This ensures the app is "future-proof" and can handle complex state interactions (like loading states, error handling, and caching) as the application grows.

3.  **Ant Design (AntD) Framework**:
    *   **Decision**: Used Ant Design for the component library.
    *   **Benefit**: Provides a polished, professional look "out of the box" with accessible, responsive, and rich components (Modals, Tables with pagination, Form validation).

4.  **Separation of Concerns**:
    *   **Architecture**:
        *   `src/store`: Manages global state and async API calls.
        *   `src/components`: pure UI components tied to the store or props.
        *   `src/config`: Static configuration for dynamic generation.
        *   `src/services`: decoupled HTTP logic using Axios.

### Assumptions

*   **API Structure**: It is assumed the API follows standard RESTful conventions (GET /users, POST /users, PUT /users/:id, DELETE /users/:id).
*   **Unique IDs**: The backend (or `json-server` in this case) handles the generation of unique IDs for new users.
*   **Data Flatness**: The user data object is flat (no nested objects for the configured fields) to simplify the dynamic table generation.
