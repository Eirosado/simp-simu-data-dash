# **🧪 Scientific Simulation Data Dashboard**

A full-stack project for generating, serving, and visualizing simulation data using **Python** and **React + TypeScript**.


## **🔗 Live Demo **
You can view and test the application directly at this link:

  https://codesandbox.io/p/github/Eirosado/simp-simu-data-dash/main

---

## **📁 Project Overview**

This project consists of two main parts:

1. **Data Generation (Python)**
2. **Interactive Web Dashboard (React + TypeScript)**

---

## **🔬 1. Data Generation**

* **Script-based Workflow**: Data generation and testing are triggered via `npm` scripts (no need to run Python directly).
* **Mock Data Server**: Powered by `json-server` to serve the generated simulation data.

### **📦 Key Files**

* `generate_data.py`: Main data generation script
* `simulation_data.json`: Generated mock data
* `tests/`: Python unit tests

### **📜 Available Commands**

Run from the **project root**:

```bash
npm run generate-data    # Generate new simulation data
npm run test-python      # Run Python unit tests
npm run serve-data       # Start JSON Server at http://localhost:4000
```

---

## **💻 2. Web Application (React + TypeScript)**

Interactive frontend dashboard built with React, TypeScript, Material UI, and Chart.js.

### **📁 Location**

`simulation-app/`

### **🔧 Features**

* Type-safe code with TypeScript
* Data fetching and transformation
* Filtering and sorting
* Responsive layout with Material UI
* Visualization with charts
* Fully tested using **Jest + React Testing Library**

### **📜 Commands**

Run from the `simulation-app/` directory:

```bash
npm run start       # Start development server
npm run build       # Build production app
npm run test        # Run React unit tests
npm run eject       # Optional: eject CRA config
```

---

## **📂 Directory Structure**

```
/ (root)
├── generate_data.py           # Python script for mock data
├── simulation_data.json       # Generated data
├── tests/                     # Python unit tests
├── requirements.txt           # Python dependencies
├── package.json               # Scripts for Python + json-server
├── README.md                  # You are here!
└── simulation-app/            # React + TypeScript dashboard
    ├── README.md              # React app docs
    ├── package.json           # Scripts for React
    ├── tsconfig.json          # TypeScript config
    ├── jest.config.ts         # Jest testing config
    ├── public/
    └── src/
        ├── components/        # UI components
            ├── charts/        # Chart components
            ├── data-table/    # Data table components & hooks
        ├── hooks/             # Custom hooks
        ├── services/          # service for data loading & parsing
        ├── types/             # TypeScript types
        ├── tests/             # Jest tests
        ├── utils/             # Helper functions
        ├── App.tsx
        ├── index.tsx
        └── index.css
```

---

## **🚀 Getting Started**

### **A. Generate & Serve Data**

From the **project root** open a **new terminal** and run:

```bash
npm install # Install dependencies 
npm run generate-data
npm run serve-data
```
    Note: Keep this terminal running to serve data continuously.

* Visit the data endpoint at: `http://localhost:4000/simulations`

### **B. Run the Web App**

From `simulation-app/` open a **new terminal** and run:

```bash
npm install # Install dependencies 
npm start
```

* App runs on: `http://localhost:3000`

### **C. Run Tests**

* **Python**:

  ```bash
  npm run test-python
  ```
* **React**:

  ```bash
  cd simulation-app
  npm run test
  ```
