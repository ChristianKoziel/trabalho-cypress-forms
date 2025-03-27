describe('Teste de Página de Comentários', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500'); 
  });

  it('Verifica elementos visíveis na página', () => {
    cy.get('h1').should('be.visible').and('contain', 'Deixe seu comentário');

    cy.get('#submit-button').should('be.visible');
   
    cy.get('#comment-section').should('be.empty');
  });

  it('Verifica textos na página', () => {
    cy.get('#submit-button').should('have.text', 'Enviar Comentário');
  });

  it('Verifica placeholders dos campos', () => {
    cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome');
    
    cy.get('#comentario').should('have.attr', 'placeholder', 'Escreva seu comentário aqui...');
  });

  it('Manipula estados assíncronos e verifica comportamento', () => {
    const nome = 'Usuário de Teste';
    const comentario = 'Este é um comentário de teste automatizado.';
    
    cy.get('#nome').type(nome);
    cy.get('#comentario').type(comentario);
    
    cy.get('#submit-button').click();
    
    cy.get('#loading')
      .should('be.visible')
      .and('contain', 'Enviando...');

    cy.get('#loading', { timeout: 3000 }).should('not.be.visible');
    cy.get('#comment-section p')
      .should('have.length', 1)
      .and('contain', `${nome}: ${comentario}`);
  });
});