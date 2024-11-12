import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};
export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Get the project ID from the request parameters
  try {
    const projectId = parseInt(id, 10); // Convert ID to a number
    if (isNaN(projectId)) {
      res.status(400).json({ message: "Invalid project ID" }); // Handle invalid ID case
      return;
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId }, // Query the project by ID
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" }); // Handle not found case
      return;
    }

    res.status(200).json(project); // Return the project data
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: `Error retrieving project: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    // Reset the sequence for the id column before creating a new project
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Project"', 'id'), coalesce(max(id)+1, 1), false) FROM "Project";`;

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};
