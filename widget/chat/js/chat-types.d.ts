export interface ChatBadge {
    name: string;
    imageUrl: string;
    version?: number | string;
}

export interface ChatEmote {
    name: string;
    type: string;
    imageUrl: string;
    endIndex?: number;
    classes?: string[];
}

export interface ChatReply {
    messageId: string;
    threadMsgId: string;
    userName: string;
    displayName: string;
    messageText: string;
}

export interface ChatReward {
    id?: string;
    title?: string;
    cost?: number;
    prompt?: string;
}

export interface ChatMessage {
    platform: string;
    type: "Message" | "Reward" | string;
    messageId: string;
    msgId?: string;
    userId: string;
    userName: string;
    displayName: string;
    messageText: string;
    message?: string;
    reward?: ChatReward;
    title?: string;
    prompt?: string;
    color: string;
    backgroundColor?: string;
    classes: string[];
    badges: ChatBadge[];
    avatar: string;
    roles: Array<string | { name: string }>;
    role?: number;
    isSubscriber: boolean;
    subscriptionTier: string;
    emotes: ChatEmote[];
    timestamp: string;
    time?: string;
    isHighlighted: boolean;
    isReply: boolean;
    reply?: string;
    answer: ChatReply;
    additional?: Record<string, unknown>;
}
