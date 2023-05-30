# Trail - Increase your sales!

## About The Project
**Trail** is a project which will help increase sales, especially for bloggers who sell their own products. **I only created the frontend side of this project for now.** You can see the frontend but the backend of the project is still a work in progress.

**Trail** is a demo project with dummy data. 

**A quick preview of the Trail Landing Page:**

![landingPageGIF](https://github.com/BartoszDadok/TrailLandingPageFrontend/assets/101389945/1f4ffd48-7fa0-4107-81d1-538e64fc856c)


**A quick preview of the Dashboard Page:**

![dashboardGIF](https://github.com/BartoszDadok/TrailLandingPageFrontend/assets/101389945/ec1ad49e-3e26-4b08-a804-09d8fe59b26f)

## **Links to the Trail sites:**. 
- Trail Landing Page - https://trail-landing-page.vercel.app/
- Trail Dashboard - https://trail-dashboard.vercel.app/


## How I came up with the idea for Trail.
I worked in marketing and it was very hard to find a tool to track only converted users. 

Imagine that you run a blog and sell products such as books, online tutorials and so on. In order to increase sales you want to know everything about the people who already bought your products.

You would like to know which articles and pages on your blog convinced users to buy your products. You would like to have a full-paying user`s path from the first visit until they buy a product advertised on your blog.

![graphs](https://github.com/BartoszDadok/TrailLandingPageFrontend/assets/101389945/8d577aad-57a8-453e-88dc-cf0c43fa1eb3)

**With this information, you can see which pages you should promote more than others.**

## Problems and solutions:
- **First problem** -
Theoretically you can use Google Analytics or similar tools to do that, but in practice, there is no easy way to set up Google Analytics to track only paying users. You have to have the technical knowledge to set up a tool that works that way.

- **Second problem** - 
Using cookies and tracking people between different domains. Bloggers use their blogs most often only to create articles. The selling pages are usually placed on different domains and subdomains. Without specific knowledge about Cookies and CORS, it's almost impossible to track your customers. Tools like Google Analytics and Yandex Metrica do not make it easy to track this information between domains.

This tool potentially can show the full paths of converted users, working between domains and subdomains, with understandable configurations adjusted for ease of use.  

## Built With:
**Frontend Landing Page:**
- Next.js
- Styled Components
- TypeScript

**Frontend Dashboard:**
- React
- Redux Toolkit
- GraphQL
- Styled Components
- TypeScript

**Backend(created only for serving dummy data with GraphQL):**
- Node.js
- Express
- GraphQL
- MongoDB
- Mongoose

## Getting Started

There are two ways to run frontend on your local machine:

1. You can just click the links below:
- Trail Landing Page - https://trail-landing-page.vercel.app/
- Trail Dashboard - https://trail-dashboard.vercel.app/

2. You can run sites locally on your machine.

### Local installation - Landing Page
1. Clone the repo:
   ```sh
   git clone https://github.com/BartoszDadok/TrailLandingPageFrontend.git
   ```
   
2. Install NPM packages:
   ```sh
   npm install
   ```

3. Open the Visual Studio Code terminal and run this command:
   ```sh
   npm run dev
   ```
   After running this command you will see the **Trail** landing page.


### Local installation - Dashboard
1. Clone the repo:
   ```sh
   git clone https://github.com/BartoszDadok/TrailDashboardFrontend.git
   ```
   
2. Install NPM packages:
   ```sh
   npm install
   ```

3. Open the Visual Studio Code terminal and run this command:
   ```sh
   npm start
   ```
   After running this command you will see the **Trail** dashboard page.

## Links to all Trail`s Repositories:
- Landing Page- https://github.com/BartoszDadok/TrailLandingPageFrontend.git
- Dashboard- https://github.com/BartoszDadok/TrailDashboardFrontend.git
- Backend- https://github.com/BartoszDadok/TrailBackend.git

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

- Email - bartoszdadok@gmail.com
- My Youtube Channel - [Youtube](https://www.youtube.com/@wannabeIT)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/bartoszdadok/)
