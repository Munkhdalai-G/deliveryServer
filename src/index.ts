import { Prisma } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.User.findMany();

  res.json({ users });
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ user });
});

app.post("/users", async (req: Request, res: Response) => {
  const { email, password, age } = req.body;

  try {
    const user = await Prisma.user.create({
      data: {
        email,
        password,
        age,
      },
    });

    res.json({ user });
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
