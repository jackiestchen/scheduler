describe("Appointments", () => {
  it("should book an interview", () => {
    cy.visit("/");
    cy.get("li").contains("Monday");
  });
});
