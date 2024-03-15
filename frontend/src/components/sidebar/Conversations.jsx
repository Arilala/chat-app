import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis.js";
export const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log({ loading, conversations });
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation,) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
