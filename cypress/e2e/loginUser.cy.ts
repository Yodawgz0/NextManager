import { constants } from "../constant";

describe("Login Page", () => {
  it("Does the login", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.url().should("include", "/LoginPage");
    cy.get("input[placeholder='Email']").type(constants.username);
    cy.get("input[placeholder='Password']").type(constants.password);
    cy.contains("Login").click();
    
    
  });
});
