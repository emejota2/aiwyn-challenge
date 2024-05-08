describe("Validate invoice and login test suite", () => {
  beforeEach(() => {
    cy.visit("/client-portal/login");
    cy.login('qa@aiwyn.ai', 'password1')
  });
  it("Validate invoices", () => {
    //actions
    cy.get('input[type="checkbox"]').first().click();
    cy.get("tbody td").first().click();
    cy.get('tbody').children().eq(2).find('td').first().click()
    //assertion
    cy.contains('2 invoices selected (subtotal)').should('be.visible')
    //proceed to payment of addition invoices
    cy.get('[data-cy="add-on-button"]').click();
    cy.get("h3").contains("Add additional service");
    //select an account
    cy.get(".form-select").select(2);
    cy.get(".form-input.mb--050").type("test");
    cy.get('[data-cy="payment-amount"]').clear();
    cy.get('[data-cy="payment-amount"]').type("3000");
    cy.get('[data-cy="add-to-payment-button"]').click();

    //assert misselaneous

    cy.get("h4").contains("Miscellaneous");
    cy.get('[data-cy="side-bar-total-amount"]')
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("totalAmountFromModal");
      });
    cy.get('[data-cy="pay-now"]').click();
    //assert payment modal success message
    cy.contains("Thanks for paying!").should("be.visible");
    cy.get("button:contains(Close)").click();

    //navigate to payments
    cy.get('[data-cy="payments-tab"]').click();
    cy.get("tbody").should("be.visible");
    //assert total payment
    cy.get('[data-cy="payment-amount"]')
      .first()
      .invoke("text")
      .then((totalAmount) => {
        cy.get("@totalAmountFromModal").then((totalAmountFromModal) => {
          cy.expect(totalAmount).to.eq(totalAmountFromModal);
        });
      });
  });
});
