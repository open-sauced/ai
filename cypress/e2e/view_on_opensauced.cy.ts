// go to github.com and check if "View on Open Sauced" button is present
describe("View on Open Sauced", () => {
  it("should have a View on Open Sauced button", () => {
    cy.visit("https://github.com/diivi");
    cy.get(`a[href="https://insights.opensauced.pizza/user/diivi/contributions"]`).should("exist");
  });
})
