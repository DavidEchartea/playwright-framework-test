import { test as base } from "@playwright/test";
import { Home } from "../../pages/automationexercise/Home";
import { Signup } from "../../pages/automationexercise/SignUp";
import { createUser } from "../../resources/faker-js";
import userData from '../../resources/testdata.json'
import { Products } from "../../pages/automationexercise/Products";

const test = base.extend<{
  homePage: Home
  signUpPage: Signup
  productsPage: Products

   credentials: {
    user: string
    password: string
  }

  user: ReturnType<typeof createUser>
  testData: typeof userData;

}>({
  homePage: async ({page}, use) =>{
    await use(new Home(page));
  },
  signUpPage: async ({page}, use) =>{
    await use(new Signup(page))
  },
  productsPage: async({page}, use) =>{
    await use(new Products(page))
  },

  credentials: async ({}, use) => {
    await use({
      user: process.env.TCS_USER!,
      password: process.env.TCS_PASSWORD!,
    })
  },

  user: async ({}, use) =>{
    const user = createUser()
    await use(user)
  },

  testData: async ({}, use) =>{
    await use(userData)
  }
});


export { test };