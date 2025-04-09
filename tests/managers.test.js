const managersController = require("../controllers/managers");
const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

jest.mock("../data/database");

describe("Managers Controller Tests", () => {
  let mockRequest;
  let mockResponse;
  let mockCollection;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    mockRequest = {};

    mockCollection = {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
    };

    mongodb.getDatabase.mockReturnValue({
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnValue(mockCollection),
    });
  });

  describe("getAll function", () => {
    test("should return all managers with status 200", async () => {
      const mockManagers = [
        {
          _id: "1",
          name: "Pep Guardiola",
          club: "Manchester City",
          nationality: "Spanish",
        },
        {
          _id: "2",
          name: "Jurgen Klopp",
          club: "Liverpool",
          nationality: "German",
        },
      ];
      mockCollection.toArray.mockResolvedValue(mockManagers);

      await managersController.getAll(mockRequest, mockResponse);

      expect(mongodb.getDatabase).toHaveBeenCalled();
      expect(mockCollection.find).toHaveBeenCalled();
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockManagers);
    });

    test("should handle errors and return status 400", async () => {
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      await managersController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });

  describe("getSingle function", () => {
    test("should return a single manager with status 200", async () => {
      const mockManager = {
        _id: "1",
        name: "Pep Guardiola",
        club: "Manchester City",
        nationality: "Spanish",
      };
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      mockCollection.toArray.mockResolvedValue([mockManager]);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await managersController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockManager);
    });

    test("should handle errors and return status 400", async () => {
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await managersController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });
});
