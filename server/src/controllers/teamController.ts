import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany({});

    //  asynchronous operations to fetch additional data for each team
    //  wait for all the asynchronous operations to complete. This ensures that the final result is an array of enriched team objects.
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        // Fetch Product Owner Username object but only username field
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        // Fetch Project Manager Username object but only username field:
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });
        
        // Construct a new object that includes all properties of the original team (...team) and adds two new properties: productOwnerUsername and projectManagerUsername
        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
