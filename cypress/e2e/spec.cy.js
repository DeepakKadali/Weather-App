// Main suite for Weather Application
describe("Weather Application Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  // Suite for testing search functionality
  it("Search Functionality Tests - Enter City and Search", () => {
    cy.get('input[type="text"]').type("Paris");
    cy.get("button").click();
    cy.get(".weather-cards").should("be.visible");
  });

  it("Search Functionality Tests - Handle Invalid City Search", () => {
    cy.get('input[type="text"]').type("InvalidCity123");
    cy.get("button").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Failed to fetch weather data");
    });
  });

  // Suite for testing UI states
  it("UI State Tests - Display Loading State During Data Fetch", () => {
    cy.get('input[type="text"]').type("New York");
    cy.get("button").click();
    cy.get("p").contains("Loading data...").should("be.visible");
  });

  it("UI State Tests - Display Weather Data After Fetch", () => {
    cy.get('input[type="text"]').type("London");
    cy.get("button").click();
    cy.get(".weather-card").should("have.length", 4);
  });
  it("API Interaction Tests - Error Handling on API Failure", () => {
    cy.intercept(
      "GET",
      "https://api.weatherapi.com/v1/current.json?key=2a2bc82f88df41f089163800240901&q=Delhi",
      {
        statusCode: 500,
        body: "Internal Server Error",
      }
    ).as("getWeather");

    cy.get('input[type="text"]').type("Delhi");
    cy.get("button").click();
    cy.wait("@getWeather");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Failed to fetch weather data");
    });
  });
});
