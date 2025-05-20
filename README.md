# Scientific Simulation Data Dashboard

This project consists of two main parts:

## 1. Data Generation (Python)

- **Script**: `generate_data.py` creates mock simulation data and writes it to `simulation_data.json`.
- **Virtual Environment**: Uses a `venv/` directory (ignored by Git) to isolate dependencies.
- **Dependencies**: Optionally install `pandas` and `numpy`:
  ```bash
  python3 -m venv venv
  source venv/bin/activate     # Windows: .\venv\Scripts\Activate.ps1
  pip install pandas numpy
  ```
- **Run the Script**:
  ```bash
  python generate_data.py
  ```
- **Output**: The file `simulation_data.json` will appear in the project root.

## 2. Web Application (React + TypeScript)

- Located in the `simulation-app/` folder, a standalone Create React App initialized with TypeScript.
- Uses **TypeScript** for type safety and **React Testing Library** + **Jest** for component and utility tests.

## Project Structure

/ (root)
├── generate_data.py         # Python script for data generation
├── simulation_data.json     # Generated mock data
├── venv/                    # Python virtual environment (git-ignored)
├── tests/                   # Python unit tests for data generation
├── .gitignore               # Root ignores (venv/, __pycache__/, .vscode/)
├── requirements.txt         # (Optional) Python dependencies lock file
├── README.md                # Project overview and setup instructions
└── simulation-app/          # React + TypeScript application
    ├── README.md            # React app-specific instructions
    ├── .gitignore           # React-specific ignores 
    ├── package.json         # Dependencies and scripts for React app
    ├── tsconfig.json        # TypeScript configuration for React app
    ├── jest.config.ts      # Jest configuration for TypeScript tests
    └── src/                 # React application source
        ├── components/      # React components (DataTable.tsx, StatusChart.tsx)
        ├── utils/           # Helper functions (fetchData.ts, transformData.ts)
        ├── tests/           # React component and util tests 
        ├── types.ts         # Shared TypeScript interfaces
        ├── App.tsx          # Main app component
        ├── index.tsx        # App entry point
        └── index.css        # Global styles

## Getting Started

### A. Generate Simulation Data (Python)

1. Activate the virtual environment:
   ```bash
   source venv/bin/activate     # Windows: .\venv\Scripts\Activate.ps1
   ```
2. (Optional) Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the data generation script:
   ```bash
   python generate_data.py
   ```

### B. Run the React Application

1. Navigate to the React app directory:
   ```bash
   cd simulation-app
   ```
2. Install dependencies and start the development server:
   ```bash
   npm install
   npm start
   ```
3. Open your browser at `http://localhost:3000`.

### C. Run Tests

- **Python Tests**:
  ```bash
  pytest
  ```

- **React Tests**:
  ```bash
  cd simulation-app
  npm test
  ```


