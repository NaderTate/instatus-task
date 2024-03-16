import { ACTION_STATUS, ACTION_TYPE, Log } from "@prisma/client";

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

interface FullLog extends Log {
  user: {
    name: string;
  };
  action: {
    id: string;
    actor: { id: string; name: string; email: string };
    target?: { id: string; name: string; email: string };
    type: ACTION_TYPE;
    status: ACTION_STATUS;
  };
}
