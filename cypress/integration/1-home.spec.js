const baseUrl = Cypress.env("base_url");

describe("Home page", () => {
  it("should show add user button", () => {
    cy.visit(baseUrl);
    const addUserButton = cy.get("[data-testid=add-user");
    addUserButton.should("exist");
    addUserButton.should("have.text", "Add User");
  });

  it("should navigate to /users/add on click add button", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=add-user]").click();
    cy.url().should("include", "/users/add");
  });
});
