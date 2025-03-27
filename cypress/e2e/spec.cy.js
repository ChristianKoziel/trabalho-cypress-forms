describe('Teste da página de comentarios', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it("Verifica os elementos visiveis", () => {
    cy.contains('h1', 'Deixe seu comentário');
    cy.get('#submit-button').should('be.visible');
    cy.get('#comment-section').should('be.empty');
  });

  it("Verifica o texto nos botões", () => {
    cy.get("#submit-button").should("have.text", "Enviar Comentário");
  });

  it("Verifica atributos dos campos de entrada", () => {
    cy.get("#nome").should("have.attr", "placeholder", "Digite seu nome");
    cy.get("#comentario").should("have.attr", "placeholder", "Escreva seu comentário aqui...");
  });

  it("Manipula estados assincronos e add comentario", () => {
    cy.get("#nome").type("João");
    cy.get("#comentario").type("Ótima postagem!");

    cy.get("#submit-button").click();
    cy.get("#loading").should("be.visible");

    cy.wait(2000);

    cy.get("#loading").should("not.visible");
    cy.get("#comment-section").contains("João: Ótima postagem!");
  });
});