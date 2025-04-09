const premierLeagueController = require("../controllers/premierLeague");
const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

jest.mock("../data/database");

describe("Premier League Controller Tests", () => {
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
    test("should return all Premier League clubs with status 200", async () => {
      const mockClubs = [
        { _id: "1", name: "Manchester City", position: "1" },
        { _id: "2", name: "Liverpool", position: "2" },
      ];
      mockCollection.toArray.mockResolvedValue(mockClubs);

      await premierLeagueController.getAll(mockRequest, mockResponse);

      expect(mongodb.getDatabase).toHaveBeenCalled();
      expect(mockCollection.find).toHaveBeenCalled();
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockClubs);
    });

    test("should handle errors and return status 400", async () => {
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      await premierLeagueController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });

  describe("getSingle function", () => {
    test("should return a single Premier League club with status 200", async () => {
      const mockClub = { _id: "1", name: "Manchester City", position: "1" };
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      mockCollection.toArray.mockResolvedValue([mockClub]);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await premierLeagueController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockClub);
    });

    test("should handle errors and return status 400", async () => {
      mockRequest.params = { id: "5f9d5c7df5a50e32b47b4b1a" };
      const mockError = new Error("Database error");
      mockCollection.toArray.mockRejectedValue(mockError);

      jest.spyOn(ObjectId, "isValid").mockReturnValue(true);

      await premierLeagueController.getSingle(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
  });
});
