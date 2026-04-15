import { test as base } from "@playwright/test";
import { Home } from "../../pages/automationexercise/Home";
import { Signup } from "../../pages/automationexercise/SignUp";


const test = base.extend<{
  homePage: Home
  signUpPage: Signup

   credentials: {
    user: string;
    password: string;
  }

}>({
  homePage: async ({page}, use) =>{
    await use(new Home(page));
  },
  signUpPage: async ({page}, use) =>{
    await use(new Signup(page))
  },
  credentials: async ({}, use) => {
    await use({
      user: process.env.TCS_USER!,
      password: process.env.TCS_PASSWORD!,
    });
  }
});


export { test };