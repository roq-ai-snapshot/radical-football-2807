import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTrainingPlans();
    case 'POST':
      return createTrainingPlan();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingPlans() {
    const data = await prisma.training_plan
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'training_plan'));
    return res.status(200).json(data);
  }

  async function createTrainingPlan() {
    await trainingPlanValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.exercise?.length > 0) {
      const create_exercise = body.exercise;
      body.exercise = {
        create: create_exercise,
      };
    } else {
      delete body.exercise;
    }
    if (body?.player_training_plan?.length > 0) {
      const create_player_training_plan = body.player_training_plan;
      body.player_training_plan = {
        create: create_player_training_plan,
      };
    } else {
      delete body.player_training_plan;
    }
    const data = await prisma.training_plan.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}