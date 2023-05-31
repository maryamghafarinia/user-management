const baseUrl = Cypress.env("base_url");

describe("Delete User", () => {
  let lenBefore;

  it("creates a user", () => {
    cy.visit(`${baseUrl}/users/add`);
    cy.get("[data-testid=input-name]").type("DeleteMe");
    cy.get("[data-testid=input-lastName]").type("lastname");
    cy.get("[data-testid=input-email]").type("delete.me@test.com");
    cy.get("[data-testid=input-phoneNumber]").type("1234567890");
    cy.get("[data-testid=input-age]").type(25);
    cy.get("[data-testid=input-tags]").type("name,test,cypress");
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.png");
    cy.get("[data-testid=input-linkToWebsite]").type("https://google.com");
    cy.get("[data-testid=input-tags]").type("name,test,cypress");
    cy.log("[Before] submit");
    cy.get("[type=submit").click();
    cy.url().should("eq", baseUrl + "/");
  });

  it("get the number of users before delete", () => {
    cy.visit(baseUrl);
    cy.get("table")
      .find("[data-testid=delete-icon]")
      .its("length")
      .then((len) => {
        lenBefore = len;
      });
  });

  it("should not delete when user does not confirm", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").first().click();
    cy.on("window:confirm", () => false);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore);
  });

  it("should delete when user confirms", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").last().click();
    cy.on("window:confirm", () => true);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore - 1);
  });
});
