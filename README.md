# Alma Test

![Preview-Screens](https://raw.githubusercontent.com/bernalvinicius/alma-test/refs/heads/main/public/image1.png)
![Preview-Screens](https://raw.githubusercontent.com/bernalvinicius/alma-test/refs/heads/main/public/image2.png)

## Why?

This project is part of the selection process for [Alma](https://www.tryalma.ai/). It involves developing a frontend application to support the creation, collection and updating of leads using Next.js. The application has the following features:

- HomePage
- Public Lead Form
- Thank you page
- Internal Leads Page

## Some Observations about this App

**1** - For this challenge, Material-UI was used, which brings all the features of Material Design to React projects. For specific styling, `styled-component` was used. The layout sought to be as faithful as possible to the mockup provided.

**2** - As a prerequisite for the application, authentication is being performed to access the leads page. The username and password are `admin`.

**3** - The application routes:

- Homepage: https://localhost:3000
- Assessment page: https://localhost:3000/assesment
- Thank you page: http://localhost:3000/assessment/thank-you
- Leads page: https://localhost:3000/leads

## Functionalities

- Home Page:
  - On this page, the user can choose to go to the assessment page to fill out the form or go to the leads page. If the user wishes to go to the leads page and is not authenticated, a modal will appear so that the user can fill in the username and password;
- Assessment Page:
  - On this page there is a form available for potential customers to fill out. The form data is being saved in localstorage.
- Thank you Page:
  - When the user finishes filling out the form, they are redirected to this page with feedback that the form was submitted successfully and they need to wait for the Alma team to respond. There is a button that allows the user to return to the homepage.
- Leads Page:
  - This authentication-protected page displays a list of leads with all the information filled in by the potential customer. In this list, it is possible to search by name, filter by PENDING or REACHED_OUT, and change the order status using the Change Status button. For this project, 30 mock data were generated, and pagination is used to navigate between the leads.

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React App, that can be found [here.](https://reactjs.org/docs/getting-started.html)

### Installing

**Cloning this repository**

```
$ https://github.com/bernalvinicius/alma-test.git
$ cd alma-test
```

**Installing Dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

**Running**

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ npm run dev
```

The application will only work if the Node version is higher than 18.

## Contributing

Email-me: bernalvinicius@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/vin%C3%ADcius-de-arruda-bernal/)

Thank you!
