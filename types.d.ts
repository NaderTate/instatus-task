import { ACTION_STATUS, ACTION_TYPE } from "@prisma/client";

interface LogBody {
  userId: string;
  action: {
    type: ACTION_TYPE;
    status: ACTION_STATUS;
    actorId: string;
    targetId?: string;
  };
  location: string;
}
