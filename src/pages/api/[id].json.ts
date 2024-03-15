import type { APIRoute } from "astro";
import {eq} from "astro:db";
import { Users, db } from "astro:db";

export const DELETE: APIRoute = async ({ params }) => {
  const id = Number(params.id);

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.delete(Users).where(eq(Users.id, id));
    if (res) {
      return new Response(null, { status: 204 });
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { name, lastName, password, email } = await request.json();
  const id = Number(params.id);

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.update(Users).set({ 
        name,
        lastName,
        password,
        email,
     }).where(eq(Users.id, id));

    if (res) {
      return new Response(
        JSON.stringify({
          message: "success",
          success: true,
        })
      );
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};

export const GET: APIRoute = async ({ params }) => {
    const id = Number(params.id);
    console.log(id)
    if (!id) {
      return new Response(
        JSON.stringify({
          message: "Please provide all required fields.",
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  
    try {
      const res = await db.select().from(Users).where(eq(Users.id, id));
      console.log(res)
      if (res) {
        return  new Response( JSON.stringify(res), { 
            headers: { "content-type": "application/json" },
            });
      } else {
        throw new Error("prob, bob");
      }
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          message: e,
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  };
  