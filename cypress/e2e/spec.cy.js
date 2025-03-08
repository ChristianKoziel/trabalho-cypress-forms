describe('Formulário de Cadastro', () => {
  it('Deve preencher e enviar o formulário com sucesso', () => {
      cy.visit('http://localhost:5500');

      cy.get('#nome').type('João Silva');
      cy.get('#email').type('joao.silva@email.com');
      cy.get('#telefone').type('1199999999');
      cy.get('#senha').type('Teste@123');
      cy.get('#confirma_senha').type('Teste@123');

      cy.get('#nome').should('have.value', 'João Silva');
      cy.get('#email').should('have.value', 'joao.silva@email.com');
      cy.get('#telefone').should('have.value', '1199999999');
      cy.get('#senha').should('have.value', 'Teste@123');
      cy.get('#confirma_senha').should('have.value', 'Teste@123');

      cy.get('button[type="submit"]').click();

      cy.window().then((win) => {
          win.alert = cy.stub().as('alert'); 
      });

      cy.get('button[type="submit"]').click();
      cy.get('@alert').should('have.been.calledWith', 'Cadastro realizado com sucesso!');
  });
});
