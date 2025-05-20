import datetime
import pytest
from generate_data import generate_simulation_data

PARAMETER_SETS = {"Alpha", "Beta", "GammaSet", "Delta"}
STATUSES = {"completed", "running", "failed", "pending"}

def test_default_length_and_keys():
    """Ensure the function returns 150 items with correct keys and data types."""
    data = generate_simulation_data()
    assert isinstance(data, list) and len(data) == 150

    for item in data:
        assert set(item.keys()) == {"id", "timestamp", "value", "parameter_set", "status"}
        assert isinstance(item["id"], str) and item["id"].startswith("sim_")
        datetime.datetime.fromisoformat(item["timestamp"].rstrip("Z"))
        assert item["parameter_set"] in PARAMETER_SETS
        assert item["status"] in STATUSES

def test_value_none(monkeypatch):
    """Test scenarios where value should be None."""
    monkeypatch.setattr('random.random', lambda: 0.05)
    data = generate_simulation_data(5)
    assert all(item['value'] is None for item in data)

def test_value_invalid(monkeypatch):
    """Test scenarios where value should be 'invalid'."""
    monkeypatch.setattr('random.random', lambda: 0.12)
    data = generate_simulation_data(5)
    assert all(item['value'] == 'invalid' for item in data)

def test_value_extreme(monkeypatch):
    """Test extreme numeric values."""
    monkeypatch.setattr('random.random', lambda: 0.99)
    monkeypatch.setattr('random.uniform', lambda *_: -123.456)
    
    data = generate_simulation_data(3)
    assert all(isinstance(item['value'], float) and item['value'] == -123.456 for item in data)

def test_value_normal(monkeypatch):
    """Test normal numeric values."""
    monkeypatch.setattr('random.random', lambda: 0.5)
    monkeypatch.setattr('random.uniform', lambda *_: 42.4242)

    data = generate_simulation_data(4)
    assert all(isinstance(item['value'], float) and item['value'] == round(42.4242, 2) for item in data)

if __name__ == '__main__':
    pytest.main()