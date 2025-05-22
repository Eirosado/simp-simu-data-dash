import { renderHook, waitFor } from "@testing-library/react"; 
import { useFetchSimulationData } from "../../hooks/use-fetch-simu-data"; 
import { SimulationDataService } from "../../services/simu-data-service"; 
import { DataTransformer } from "../../utils/data-transformer"; 

jest.mock("../../services/simu-data-service"); 
jest.mock("../../utils/data-transformer"); 

describe("useFetchSimulationData", () => { 
  const mockData = [ 
    { id: "1", timestamp: "2025-05-21T12:00:00Z", value: 42.5, parameter_set: "Alpha", status: "completed" }, 
    { id: "2", timestamp: "2025-05-21T12:30:00Z", value: null, parameter_set: "Beta", status: "failed" }, 
  ]; 

  beforeEach(() => { 
    jest.clearAllMocks(); 
  }); 

  it("should fetch and transform data correctly", async () => { 
    (SimulationDataService.fetchData as jest.Mock).mockResolvedValue(mockData); 
    (DataTransformer.transform as jest.Mock).mockReturnValue(mockData); 

    const { result } = renderHook(() => useFetchSimulationData()); 

    expect(result.current.loading).toBe(true); 
    
    await waitFor(() => expect(result.current.loading).toBe(false)); 

    expect(result.current.data).toEqual(mockData); 
    expect(result.current.error).toBeNull(); 
  }); 

  it("should handle API fetch error", async () => { 
    (SimulationDataService.fetchData as jest.Mock).mockRejectedValue(new Error("Fetch failed")); 

    const { result } = renderHook(() => useFetchSimulationData()); 

    await waitFor(() => expect(result.current.loading).toBe(false)); 

    expect(result.current.error).toBe("Fetch failed"); 
  }); 
});