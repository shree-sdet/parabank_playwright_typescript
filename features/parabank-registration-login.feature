Feature: ParaBank Registration & Login
  As a ParaBank user
  I want to register and log in to my account
  So that I can securely access my banking information


  @smoke @TC001
  Scenario: Verify successful user registration with valid details
    Given the user launches the ParaBank application
    When the user enters valid registration details
    And the user clicks the Register button
    Then the registration should be successful
    And the welcome message should contain the registered username

  @smoke @TC002
  Scenario: Verify login and account overview page after login
    Given the user has registered a new account and logged in
    Then the user should be on the Account Overview page
    And the URL should contain overview.htm
    And the account summary table should be visible
    And at least one account balance should be listed
    And the account balance should be printed to the console

  @ui @TC003
  Scenario: Verify page title and branding on homepage
    Given the user navigates to the ParaBank homepage
    Then the page title should contain "ParaBank"
    And the ParaBank logo should be visible
    And the login panel should be displayed
    And the Register link should be visible

  @negative @TC004
  Scenario: Verify registration fails when all required fields are empty
    Given the user navigates to the Registration page
    When the user submits the form without filling any fields
    Then validation errors should appear for all required fields
    And the registration success heading should not appear

  @negative @TC005
  Scenario: Verify sign-in fails with incorrect username and password
    Given the user navigates to the ParaBank homepage
    When the user enters an invalid username and password
    Then an authentication error message should be displayed
    And the user should remain on the login page
    And the user should not be redirected to Account Overview

  @negative @TC006
  Scenario: Verify registration fails when passwords do not match
    Given the user navigates to the Registration page
    When the user enters valid details with a mismatched confirm password
    And the user clicks the Register button
    Then a password mismatch error should be displayed
    And the registration should not complete
    And the user should remain on the Registration page

  @negative @TC007
  Scenario: Verify registration fails when username already exists
    Given the user navigates to the Registration page
    When the user registers with an already existing username
    And the user clicks the Register button
    Then a duplicate username error should be displayed
    And the registration should not complete
    And the user should remain on the Registration page

  @security @TC008
  Scenario: Verify user cannot access Account Overview after logout via browser back button
    Given the user is already logged into the application
    When the user logs out of the application
    And the user presses the browser Back button
    Then the Account Overview page should not be accessible
    And the overview error should be displayed

  @visual @TC009
  Scenario: Verify Registration page matches approved visual baseline
    Given the user navigates to the Registration page
    Then the Registration page should match the baseline screenshot

  @negative @TC010
  Scenario: Verify login fails with empty username and password
    Given the user navigates to the ParaBank homepage
    When the user submits the login form with empty username and password
    Then an appropriate validation/error message should be displayed
    And the user should remain on the login page and should not be authenticated

  @security @TC011
  Scenario: Verify direct URL access to Account Overview page without login
    Given the user has not logged in and launches the browser
    When the user directly navigates to /parabank/overview.htm without logging in
    Then the user should be redirected to the Login page or receive an authorization/session message
    And account information must not be displayed

  @security @TC012
  Scenario: Verify application rejects SQL Injection during login
    Given the user navigates to the ParaBank homepage
    When the user enters a SQL injection payload in the Username field and any password
    Then login should fail and an authentication error should be displayed
    And the application should not expose database errors
