import ThemedSwitch from '@components/input/ThemedSwitch'
import SectionTitle from '@components/text/SectionTitle'
import { AppSettings } from '@lib/constants/GlobalValues'
import React from 'react'
import { View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'

const ChatSettings = () => {
    const [firstMes, setFirstMes] = useMMKVBoolean(AppSettings.CreateFirstMes)
    const [chatOnStartup, setChatOnStartup] = useMMKVBoolean(AppSettings.ChatOnStartup)
    const [autoScroll, setAutoScroll] = useMMKVBoolean(AppSettings.AutoScroll)
    const [sendOnEnter, setSendOnEnter] = useMMKVBoolean(AppSettings.SendOnEnter)
    const [autoLoadUser, setAutoLoadUser] = useMMKVBoolean(AppSettings.AutoLoadUser)
    const [quickDelete, setQuickDelete] = useMMKVBoolean(AppSettings.QuickDelete)
    const [saveScroll, setSaveScroll] = useMMKVBoolean(AppSettings.SaveScrollPosition)
    const [autoTitle, setAutoTitle] = useMMKVBoolean(AppSettings.AutoGenerateTitle)
    const [alternate, setAlternate] = useMMKVBoolean(AppSettings.AlternatingChatMode)
    const [wide, setWide] = useMMKVBoolean(AppSettings.WideChatMode)

    const [showTokensPerSecond, setShowTokensPerSecond] = useMMKVBoolean(
        AppSettings.ShowTokenPerSecond
    )

    // SillyTavern-like features
    const [sillyTavernMode, setSillyTavernMode] = useMMKVBoolean(AppSettings.SillyTavernMode)
    const [showTimestamps, setShowTimestamps] = useMMKVBoolean(AppSettings.ShowMessageTimestamps)
    const [showCharAvatars, setShowCharAvatars] = useMMKVBoolean(AppSettings.ShowCharacterAvatars)
    const [showUserAvatars, setShowUserAvatars] = useMMKVBoolean(AppSettings.ShowUserAvatars)
    const [compactMode, setCompactMode] = useMMKVBoolean(AppSettings.CompactChatMode)
    const [showTypingIndicator, setShowTypingIndicator] = useMMKVBoolean(AppSettings.ShowTypingIndicator)
    const [enableReactions, setEnableReactions] = useMMKVBoolean(AppSettings.EnableMessageReactions)
    const [showContextTokens, setShowContextTokens] = useMMKVBoolean(AppSettings.ShowContextTokens)
    const [enableSearch, setEnableSearch] = useMMKVBoolean(AppSettings.EnableMessageSearch)
    const [showStats, setShowStats] = useMMKVBoolean(AppSettings.ShowChatStatistics)
    const [enableBookmarks, setEnableBookmarks] = useMMKVBoolean(AppSettings.EnableMessageBookmarks)
    const [showPersonality, setShowPersonality] = useMMKVBoolean(AppSettings.ShowCharacterPersonality)
    const [enableQuickResponses, setEnableQuickResponses] = useMMKVBoolean(AppSettings.EnableQuickResponses)
    const [showMemoryBank, setShowMemoryBank] = useMMKVBoolean(AppSettings.ShowMemoryBank)
    const [enableCharSwitching, setEnableCharSwitching] = useMMKVBoolean(AppSettings.EnableCharacterSwitching)
    const [showChatHistory, setShowChatHistory] = useMMKVBoolean(AppSettings.ShowChatHistory)
    const [enableGroupChats, setEnableGroupChats] = useMMKVBoolean(AppSettings.EnableGroupChats)
    const [showRelationships, setShowRelationships] = useMMKVBoolean(AppSettings.ShowCharacterRelationships)
    const [enableEmotionSystem, setEnableEmotionSystem] = useMMKVBoolean(AppSettings.EnableEmotionSystem)
    const [showCharStatus, setShowCharStatus] = useMMKVBoolean(AppSettings.ShowCharacterStatus)

    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>Chat</SectionTitle>

            <ThemedSwitch
                label="Auto Scroll"
                value={autoScroll}
                onChangeValue={setAutoScroll}
                description="Autoscrolls text during generations"
            />

            <ThemedSwitch
                label="Use First Message"
                value={firstMes}
                onChangeValue={setFirstMes}
                description="Disabling this will make new chats start blank, needed by specific models"
            />

            <ThemedSwitch
                label="Load Chat On Startup"
                value={chatOnStartup}
                onChangeValue={setChatOnStartup}
                description="Loads the most recent chat on startup"
            />

            <ThemedSwitch
                label="Auto Load User"
                value={autoLoadUser}
                onChangeValue={setAutoLoadUser}
                description="When opening a chat, automatically loads the User the chat was created with"
            />

            <ThemedSwitch
                label="Send on Enter"
                value={sendOnEnter}
                onChangeValue={setSendOnEnter}
                description="Submits messages when Enter is pressed"
            />

            <ThemedSwitch
                label="Show Tokens Per Second"
                value={showTokensPerSecond}
                onChangeValue={setShowTokensPerSecond}
                description="Show tokens per second when using local models"
            />

            <ThemedSwitch
                label="Quick Delete"
                value={quickDelete}
                onChangeValue={setQuickDelete}
                description="Toggle delete button in chat options bar"
            />

            <ThemedSwitch
                label="Save Scroll Position"
                value={saveScroll}
                onChangeValue={setSaveScroll}
                description="Automatically move to last scrolled position in chat"
            />

            <ThemedSwitch
                label="Automatically Generate Titles"
                value={autoTitle}
                onChangeValue={setAutoTitle}
                description="Automatically generates titles for chats (only in Remote mode)"
            />

            <ThemedSwitch
                label="Wide Chat"
                value={wide}
                onChangeValue={setWide}
                description="Removes whitespace for wider chat"
            />

            <ThemedSwitch
                label="Alternate User and Character Positions"
                value={alternate}
                onChangeValue={setAlternate}
                description="Left align character chats and right aligns user chats"
            />

            <SectionTitle>SillyTavern Mode</SectionTitle>

            <ThemedSwitch
                label="Enable SillyTavern Mode"
                value={sillyTavernMode}
                onChangeValue={setSillyTavernMode}
                description="Enables advanced SillyTavern-like features and UI enhancements"
            />

            <ThemedSwitch
                label="Show Message Timestamps"
                value={showTimestamps}
                onChangeValue={setShowTimestamps}
                description="Display timestamps for each message"
            />

            <ThemedSwitch
                label="Show Character Avatars"
                value={showCharAvatars}
                onChangeValue={setShowCharAvatars}
                description="Display character avatars in chat messages"
            />

            <ThemedSwitch
                label="Show User Avatars"
                value={showUserAvatars}
                onChangeValue={setShowUserAvatars}
                description="Display user avatars in chat messages"
            />

            <ThemedSwitch
                label="Compact Chat Mode"
                value={compactMode}
                onChangeValue={setCompactMode}
                description="Reduces spacing between messages for more compact view"
            />

            <ThemedSwitch
                label="Show Typing Indicator"
                value={showTypingIndicator}
                onChangeValue={setShowTypingIndicator}
                description="Display typing indicator when AI is generating response"
            />

            <ThemedSwitch
                label="Enable Message Reactions"
                value={enableReactions}
                onChangeValue={setEnableReactions}
                description="Allow reacting to messages with emojis"
            />

            <ThemedSwitch
                label="Show Context Tokens"
                value={showContextTokens}
                onChangeValue={setShowContextTokens}
                description="Display token count and context information"
            />

            <ThemedSwitch
                label="Enable Message Search"
                value={enableSearch}
                onChangeValue={setEnableSearch}
                description="Allow searching through chat messages"
            />

            <ThemedSwitch
                label="Show Chat Statistics"
                value={showStats}
                onChangeValue={setShowStats}
                description="Display chat statistics and analytics"
            />

            <ThemedSwitch
                label="Enable Message Bookmarks"
                value={enableBookmarks}
                onChangeValue={setEnableBookmarks}
                description="Allow bookmarking important messages"
            />

            <ThemedSwitch
                label="Show Character Personality"
                value={showPersonality}
                onChangeValue={setShowPersonality}
                description="Display character personality traits in chat"
            />

            <ThemedSwitch
                label="Enable Quick Responses"
                value={enableQuickResponses}
                onChangeValue={setEnableQuickResponses}
                description="Show quick response suggestions"
            />

            <ThemedSwitch
                label="Show Memory Bank"
                value={showMemoryBank}
                onChangeValue={setShowMemoryBank}
                description="Display character memory and knowledge"
            />

            <ThemedSwitch
                label="Enable Character Switching"
                value={enableCharSwitching}
                onChangeValue={setEnableCharSwitching}
                description="Allow switching between characters in the same chat"
            />

            <ThemedSwitch
                label="Show Chat History"
                value={showChatHistory}
                onChangeValue={setShowChatHistory}
                description="Display chat history and previous conversations"
            />

            <ThemedSwitch
                label="Enable Group Chats"
                value={enableGroupChats}
                onChangeValue={setEnableGroupChats}
                description="Allow multiple characters in the same chat"
            />

            <ThemedSwitch
                label="Show Character Relationships"
                value={showRelationships}
                onChangeValue={setShowRelationships}
                description="Display relationships between characters"
            />

            <ThemedSwitch
                label="Enable Emotion System"
                value={enableEmotionSystem}
                onChangeValue={setEnableEmotionSystem}
                description="Show character emotions and mood changes"
            />

            <ThemedSwitch
                label="Show Character Status"
                value={showCharStatus}
                onChangeValue={setShowCharStatus}
                description="Display character status and current state"
            />
        </View>
    )
}

export default ChatSettings
