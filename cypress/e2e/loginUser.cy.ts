// @ts-nocheck

import { constants } from "../constant";
describe("My First Test", () => {
  it("Does the login", () => {
    cy.visit(ServerUrl + ":3000");
    cy.contains("Login").click();
    cy.url().should("include", "/LoginPage");
    cy.get("input[placeholder='Email']").type(constants.username);
    cy.get("input[placeholder='Password']").type(constants.password);
    cy.contains("Login").click();
  });
});

// describe("Automating", () => {
//   it("Download", () => {
//     cy.visit("https://culturalanalytics.org/articles");
//     cy.wait(3000);
//     let alts = [];
//     cy.get("img")
//       .each(($img) => {
//         let alt = $img.attr("alt");
//         alts.push(alt);
//       })
//       .then(() => {
//         for (let alt of alts) {
//           cy.get(`img[alt="${alt}"]`).click();
//           cy.get(".banner-page-header").invoke("remove");
//           cy.get("#article-citation").invoke("remove");
//           cy.get(".journal").invoke("remove");
//           cy.contains("Save article").click();
//           cy.contains("XML").click();
//           cy.wait(8000);
//           cy.go("back");
//         }
//       });
//   });
// });
