// backend/validators/taskValidator.js
const { z } = require('zod');
const alphanumericWithAlphabetRegex = /^(?=.*[a-zA-Z])([a-zA-Z0-9 ]+)$/;
const dateSchema = z.string().refine((dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison
  return date >= today;
}, {
  message: 'Due date must be today or in the future',
});

const taskSchema = z.object({
  name: z.string()
    .min(1, 'Task name is required')
    .max(100, 'Task name must be at most 100 characters')
    .regex(alphanumericWithAlphabetRegex, 'Task name must be alphanumeric'),

  description: z.string()
    .max(500, 'Description must be at most 500 characters'),

  dueDate: dateSchema.optional(),

  priority: z.enum(['low', 'medium', 'high']).optional(),
  
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),

  tags: z.array(z.string()).optional(),

  collaborators: z.array(z.string().email()).optional(),  // Added validation for collaborators
});

module.exports = { taskSchema };
