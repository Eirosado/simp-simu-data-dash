import random
import datetime
import json
import logging

# Configure logging to track errors and data inconsistencies
logging.basicConfig(filename="simulation_log.txt", level=logging.WARNING, format="%(asctime)s - %(levelname)s - %(message)s")

def generate_simulation_data(n=150):
    """
    Generates a dataset of simulations with randomized timestamps, values, parameter sets, and statuses.
    Includes additional randomness variations and error handling.
    """
    parameter_sets = ["Alpha", "Beta", "GammaSet", "Delta"]
    statuses = ["completed", "running", "failed", "pending"]
    base_time = datetime.datetime.now()
    data = []

    for i in range(1, n+1):
        try:
            sim_id = f"sim_{i:03d}"  # Unique simulation ID

            # Generate timestamps with a slight bias toward recent dates
            ts = base_time - datetime.timedelta(seconds=int(random.gauss(15 * 24 * 3600, 5 * 24 * 3600)))
            timestamp = ts.isoformat() + "Z"

            # Assign value with controlled probabilities, including rare extreme cases
            rand_val = random.random()
            if rand_val < 0.1:
                value = None
            elif rand_val < 0.15:
                value = "invalid"
            elif rand_val > 0.98:  # Introduce rare extreme values
                value = random.uniform(-500, 500)  # Extreme values outside expected range
            else:
                value = round(random.uniform(0, 200), 2)

            # Randomly select a parameter set and status
            param, status = random.choices(parameter_sets)[0], random.choices(statuses)[0]

            # Validate generated data
            if isinstance(value, str) and value not in ["invalid", None]:
                logging.warning(f"Invalid numeric value detected: {value}")

            data.append({
                "id": sim_id,
                "timestamp": timestamp,
                "value": value,
                "parameter_set": param,
                "status": status
            })

        except Exception as e:
            logging.error(f"Error generating simulation data for entry {i}: {e}")

    return data

if __name__ == "__main__":
    try:
        sims = generate_simulation_data(150)
        with open("simulation_data.json", "w") as f:
            json.dump(sims, f, indent=2)
        print(f"simulation_data.json generated with {len(sims)} entries.")
    except Exception as e:
        logging.critical(f"Failed to write simulation data to JSON file: {e}")