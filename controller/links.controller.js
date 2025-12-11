import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const createLinks = async (req, res) => {
  const { url, slug } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL are required." });
  }

  const transformSlug = slug.replace(/[^a-zA-Z0-9]/g, "");

  try {
    await prisma.links.create({
      data: {
        slug: slug
          ? transformSlug
          : (
            Date.now().toString(5) +
            Math.random().toString(36).substring(2, 8)
          ).slice(-5),
        url,
        userId: req?.user.id,
      },
    });
    res.status(201).json({ message: "Create shortlink successfully" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    res.status(400).json({ message: "Internal server error" });
  }
};
export const readLinkBySlug = async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: "Slug are required." });
  }
  try {
    const link = await prisma.links.findFirstOrThrow({
      where: {
        slug,
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: "Success", status: 200, data: link });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error, status: 400 });
  }
};
export const readLinks = async (req, res) => {

  try {
    const links = await prisma.links.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: "Success", data: links });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};
export const editLink = async (req, res) => {
  const { id } = req.params;
  const { url, slug } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID are required." });
  }

  if (!url) {
    return res.status(400).json({ error: "URL are required." });
  }

  const transformSlug = slug.replace(/[^a-zA-Z0-9]/g, "");
  try {
    await prisma.links.update({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      data: {
        slug: transformSlug,
        url,
      },
    });

    res.status(200).json({ message: "Edit succesfully" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteLink = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "URL are required." });
  }
  try {
    await prisma.links.delete({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    res.status(200).json({ message: "Link has been deleted" });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};
