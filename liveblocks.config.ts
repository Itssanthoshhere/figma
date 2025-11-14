import { LiveMap, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// ----------------------
// 1. FIX: Move resolveUsers + resolveMentionSuggestions HERE
// ----------------------
const client = createClient({
  throttle: 16,
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,

  async resolveUsers({ userIds }) {
    // Return minimal mock users to avoid errors
    return userIds.map((id) => ({
      id,
      info: {
        name: `User ${id}`,
        avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${id}`,
      },
    }));
  },

  async resolveMentionSuggestions({ text }) {
    return [];
  },
});

// ----------------------
// 2. Types
// ----------------------
type Presence = {};

type Storage = {
  canvasObjects: LiveMap<string, any>;
};

type UserMeta = {};

type RoomEvent = {};

export type ThreadMetadata = {
  resolved: boolean;
  zIndex: number;
  time?: number;
  x: number;
  y: number;
};

// ----------------------
// 3. FIX: createRoomContext MUST have ONLY `client`
// ----------------------
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);
