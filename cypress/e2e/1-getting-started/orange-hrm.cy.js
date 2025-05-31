// Optional: To ignore app-side JS errors like "nextSibling"
Cypress.on('uncaught:exception', () => false);

describe('OrangeHRM - Home Page Load Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  });

  it('should load the homepage and render the login form', () => {
    cy.get('.orangehrm-login-title').should('contain.text', 'Login');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Login');
  });
});

describe('OrangeHRM - Login Page UI Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  });

  it('should display the username, password fields and login button', () => {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');
  });
});

describe('OrangeHRM - Invalid Login Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  });

  it('should show an error message on invalid login attempt', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Correct selector for the alert message
    cy.get('.oxd-alert-content-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');

    cy.url().should('include', '/auth/login');
  });
});

describe('OrangeHRM - Successful Login Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  });

  it('should log in successfully and redirect to the dashboard', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.get('h6.oxd-topbar-header-breadcrumb-module', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Dashboard');
  });
});
