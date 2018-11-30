describe('page-tenant-status', () => {

  describe('user is logged as technical user', () => {
    beforeEach(() => {
      cy.setCookie('BOS_Locale', 'en');
      cy.server();
      cy.route('GET', 'buildStep2/API/system/session/unusedId', 'fixture:technicalUser').as('technicalUser');

      cy.visit('buildStep2/resources/index.html');
    });

    it('should display a button to pause tenant when tenant is running', () => {
      cy.route('GET', 'buildStep2/API/system/tenant/*', 'fixture:tenantRunning').as('tenantRunning');
      cy.wait(['@tenantRunning', '@technicalUser']);


      cy.get('.ng-binding').should('have.text','PAUSE');
      cy.get('.img-responsive').should('have.attr','src','assets/img/running.jpg');
    });

    it('should display a button to resume tenant when tenant is paused', () => {
      cy.route('GET', 'buildStep2/API/system/tenant/*', 'fixture:tenantPaused').as('tenantPaused');
      cy.wait(['@tenantPaused', '@technicalUser']);

      cy.get('.ng-binding').should('have.text','RESUME');
      cy.get('.img-responsive').should('have.attr','src','assets/img/paused.jpg');
    });

  });
});