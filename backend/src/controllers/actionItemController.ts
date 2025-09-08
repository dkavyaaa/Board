import { type Request, type Response } from "express";
import prisma from "../prisma";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateActionItems = async (req: Request, res: Response) => {
  const { transcript } = req.body;
  if (!transcript) {
    return res.status(400).json({ error: "Transcript is required" });
  }

  try {
    const prompt = `Extract actionable tasks from the following meeting transcript. Return a JSON array of tasks with short descriptions:\n\n${transcript}\n\nFormat:\n[\n  {"task": "Task 1"},\n  {"task": "Task 2"}\n]`;

    const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",   // or "gpt-3.5-turbo" if you want cheaper
  messages: [
    { role: "system", content: "You are an assistant that extracts tasks from transcripts." },
    { role: "user", content: prompt },
  ],
  max_tokens: 300,
  temperature: 0.5,
});

  const text = completion.choices[0]?.message?.content || "";

    let tasks: { task: string }[] = [];
    try {
      tasks = JSON.parse(text.trim());
    } catch (e) {
      tasks = text
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => ({ task: line.replace(/^-?\\s*/, "").trim() }));;
    }

    // Save tasks to DB
    const createdItems = [];
    for (const t of tasks) {
      const item = await prisma.actionItem.create({
        data: {
          text: t.task,
          status: "pending",
        },
      });
      createdItems.push(item);
    }

    res.json({ actionItems: createdItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate action items" });
  }
};

export const getActionItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.actionItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ actionItems: items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch action items" });
  }
};

export const updateActionItemStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["pending", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  try {
    const updated = await prisma.actionItem.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json({ actionItem: updated });
  } catch (error) {
    res.status(404).json({ error: "Item not found" });
  }
};

export const deleteActionItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.actionItem.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ error: "Item not found" });
  }
};
