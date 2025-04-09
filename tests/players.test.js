const playersController = require("../controllers/players");
const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

jest.mock("../data/database");

describe("Players Controller Tests", () => {
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
    test("should return all players with status 200", async () => {
      const mockPlayers = [
        {
          _id: "1",
          name: "Cristiano Ronaldo",
          club: "Al Nassr",
          position: "Forward",
        },
        {
          _id: "2",
          name: "Lionel Messi",
          club: "Inter Miami",
          position: "Forward",
        },
      ];
      mockCollection.toArray.mockResolvedValue(mockPlayers);

      await playersController.getAll(mockRequest, mockResponse);

      expect(mongodb.getDatabase).toHaveBeenCalled();
      expect(mockCollection.find).toHaveBeenCalled();
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPlayers);
    });

    test("should handle errors and return status 400", async () => {
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      await playersController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });

  describe("getSingle function", () => {
    test("should return a single player with status 200", async () => {
      const mockPlayer = {
        _id: "1",
        name: "Cristiano Ronaldo",
        club: "Al Nassr",
        position: "Forward",
      };
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      mockCollection.toArray.mockResolvedValue([mockPlayer]);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await playersController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPlayer);
    });

    test("should handle errors and return status 400", async () => {
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await playersController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });
});
