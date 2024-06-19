const express = require('express');
const Task = require('../models/task');
const authenticate = require('../middleware/authentication');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for managing tasks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - due_date
 *         - user_id
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         due_date:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           default: medium
 *           description: The priority of the task
 *         status:
 *           type: string
 *           enum: [pending, in progress, completed]
 *           default: pending
 *           description: The status of the task
 *         created_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the task was created
 *         user_id:
 *           type: string
 *           description: The ID of the user who owns this task
 *       example:
 *         title: Sample Task
 *         description: This is a sample task
 *         due_date: "2024-06-30"
 *         priority: medium
 *         status: pending
 *         user_id: 60f8d7b4c33a7700158459fd
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Error creating task
 */

router.post('/', authenticate, async (req, res) => {
    try {
        const task = new Task({ ...req.body, user_id: req.user._id });
        await task.save();
        res.status(201).send({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).send({ error: 'Error creating task' });
    }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks of the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Error fetching tasks
 */

router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching tasks' });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to get
 *     responses:
 *       '200':
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Error fetching task
 */

router.get('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send({ message: 'Task not found' });

        res.send(task);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching task' });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Error updating task
 */

router.patch('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).send({ message: 'Task not found' });

        res.send({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).send({ error: 'Error updating task' });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Error deleting task
 */

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send({ message: 'Task not found' });

        res.send({ message: 'Task deleted successfully', task });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting task' });
    }
});

module.exports = router;





// const express = require('express');
// const Task = require('../models/task');
// const authenticate = require('../middleware/authentication');

// const router = express.Router();

// router.post('/', authenticate, async (req, res) => {
//     try {
//         const task = new Task({ ...req.body, user_id: req.user._id });
//         await task.save();
//         res.status(201).send({ message: 'Task created successfully', task });
//     } catch (error) {
//         res.status(500).send({ error: 'Error creating task' });
//     }
// });

// router.get('/', authenticate, async (req, res) => {
//     try {
//         const tasks = await Task.find({ user_id: req.user._id });
//         res.send(tasks);
//     } catch (error) {
//         res.status(500).send({ error: 'Error fetching tasks' });
//     }
// });

// router.get('/:id', authenticate, async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).send({ message: 'Task not found' });

//         res.send(task);
//     } catch (error) {
//         res.status(500).send({ error: 'Error fetching task' });
//     }
// });

// router.patch('/:id', authenticate, async (req, res) => {
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!task) return res.status(404).send({ message: 'Task not found' });

//         res.send({ message: 'Task updated successfully', task });
//     } catch (error) {
//         res.status(500).send({ error: 'Error updating task' });
//     }
// });

// router.delete('/:id', authenticate, async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) return res.status(404).send({ message: 'Task not found' });

//         res.send({ message: 'Task deleted successfully', task });
//     } catch (error) {
//         res.status(500).send({ error: 'Error deleting task' });
//     }
// });

// module.exports = router;
