const baseUrl = Cypress.env("base_url");

describe("Add User", () => {
  it("should not submit without required values filled", () => {
    cy.visit(`${baseUrl}/users/add`);
    cy.get("form").submit();

    cy.get(".form-error").should("exist");
    cy.contains("Name is required!");
    cy.contains("Last name is required!");
    cy.contains("Email is required!");
    cy.contains("PhoneNumber is required!");
    cy.contains("Age is required!");
  });

  it("should show avatar image on selecting file", () => {
    cy.visit(`${baseUrl}/users/add`);
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.png");
    cy.get("[data-testid=img-avatar]").should("exist");
  });

  it("should submit form", () => {
    // enter all information
    cy.get("[data-testid=input-name]").type("name");
    cy.get("[data-testid=input-lastName]").type("lastname");
    cy.get("[data-testid=input-email]").type("email@email.com");
    cy.get("[data-testid=input-phoneNumber]").type("0987654321");
    cy.get("[data-testid=input-age]").type(25);
    cy.get("[data-testid=input-tags]").type("name,test,cypress");
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.png");
    cy.get("[data-testid=input-linkToWebsite]").type("https://google.com");
    cy.get("[data-testid=input-tags]").type("name,test,cypress");
    cy.get("[type=submit").click();

    cy.url().should("eq", baseUrl + "/");
  });
});
